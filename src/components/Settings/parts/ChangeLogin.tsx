import { Box, Button } from '@mui/material'
import { ChangeEvent, Dispatch, FC, FormEventHandler, useState } from 'react'

import { verificationNewEmail } from '@/api'
import { ErrorText, InputsBox } from '../styles'
import { validationSchema } from '../validationSchema/email'
import InputWithLabel from './InputWithLabel'
import LoginModalWind from './LoginModalWind'

interface ChangeLoginProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>
}

const ChangeLogin: FC<ChangeLoginProps> = ({ setOpen }) => {
  const [openCodeWindow, setOpenCodeWindow] = useState(false)
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState({
    isError: false,
    errorMsg: '',
  })
  const [data, setData] = useState({
    newLogin: '',
    repeatLogin: '',
  })
  const { newLogin, repeatLogin } = data

  const openModal = () => setOpenCodeWindow(true)
  const closeModal = () => {
    setOpenCodeWindow(false)
    setOpen(true)
  }

  const handleChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value.trim().toLowerCase()
    setData({ ...data, [key]: newVal })
    if (key === 'repeatLogin' && newLogin) {
      setError({
        ...error,
        isError: !isLoginsSame(newVal, data.newLogin),
        errorMsg: 'Логіни не співпадають. Спробуйте ще раз.',
      })
      if (newVal.length === data.newLogin.length)
        setIsDisabled(!isLoginsSame(newVal, data.newLogin))
      else setIsDisabled(true)
    }
  }

  const isLoginsSame = (repeatLogin: string, newLogin: string) => {
    const partNewLogin = newLogin.slice(0, repeatLogin.length)
    return partNewLogin === repeatLogin
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    setIsDisabled(true)
    const isValid = await validationSchema.isValid(data)
    if (!isValid) {
      const msg = 'Логін може бути тільки електронною адресою!'
      return setError({ ...error, errorMsg: msg, isError: !isValid })
    } else {
      const sendCodeToUserEmail = async (userEmail: string) => {
        try {
          const res = await verificationNewEmail(userEmail)
          if (!res) throw new Error()
          openModal()
          setData({ ...data, newLogin: '', repeatLogin: '' })
        } catch (e) {
          setError({ ...error, isError: true, errorMsg: 'Something went wrong' })
        }
      }
      sendCodeToUserEmail(newLogin)
    }
  }
  return (
    <>
      <Box component={'form'} onSubmit={onSubmit} position={'relative'}>
        <InputsBox>
          <InputWithLabel
            label="Новий логін"
            type="text"
            placeholder="olenapetrova@gmail.com"
            value={newLogin}
            onChange={handleChange('newLogin')}
            error={error.isError}
            onClick={() => setError({ ...error, isError: false })}
          />
          <InputWithLabel
            label="Повторіть новий логін"
            type="text"
            placeholder="olenapetrova@gmail.com"
            value={repeatLogin}
            onChange={handleChange('repeatLogin')}
            error={error.isError}
            onClick={() => setError({ ...error, isError: false })}
          />
          <Button type="submit" variant="adminPrimaryBtn" disabled={isDisabled}>
            Зберегти зміни
          </Button>
          {error.isError && <ErrorText>{error.errorMsg}</ErrorText>}
        </InputsBox>
      </Box>

      <LoginModalWind {...{ closeModal, open: openCodeWindow, setOpen }} />
    </>
  )
}

export default ChangeLogin
