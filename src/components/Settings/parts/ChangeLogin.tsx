import { Box, Button } from '@mui/material'
import { ChangeEvent, FC, FormEventHandler, useState } from 'react'

import { verificationNewEmail } from '@/api'
import { ErrorText, InputsBox } from '../styles'
import { validationSchema } from '../validationSchema/email'
import InputWithLabel from './InputWithLabel'

interface ChangeLoginProps {
  openModal: () => void
}

const ChangeLogin: FC<ChangeLoginProps> = ({ openModal }) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [data, setData] = useState({
    newLogin: '',
    repeatLogin: '',
  })
  const { newLogin, repeatLogin } = data

  const handleChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value.trim().toLowerCase()
    setData({ ...data, [key]: newVal })
    if (key === 'repeatLogin' && newLogin) {
      setError(!isLoginsSame(newVal, data.newLogin))
      setErrorMsg('Логіни не співпадають. Спробуйте ще раз.')
      if (newVal.length === data.newLogin.length)
        setIsDisabled(!isLoginsSame(newVal, data.newLogin))
      else setIsDisabled(true)
    }
  }

  const isLoginsSame = (repeatLogin: string, newLogin: string) => {
    const part = newLogin.slice(0, repeatLogin.length)
    return part === repeatLogin
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = async e => {
    e.preventDefault()
    setIsDisabled(true)
    const isValid = await validationSchema.isValid(data)
    if (!isValid) {
      setErrorMsg('Логін може бути тільки електронною адресою!')
      return setError(!isValid)
    } else {
      const sendCodeToUserEmail = async (userEmail: string) => {
        try {
          const res = await verificationNewEmail(userEmail)
          if (!res) throw new Error()
          openModal()
          setData({ ...data, newLogin: '', repeatLogin: '' })
        } catch (error) {
          console.log(error)
          setErrorMsg('Something went wrong')
          setError(true)
        }
      }
      sendCodeToUserEmail(newLogin)
    }
  }
  return (
    <Box component={'form'} onSubmit={onSubmit} position={'relative'}>
      <InputsBox>
        <InputWithLabel
          label="Новий логін"
          type="text"
          placeholder="Введіть Ваш логін"
          value={newLogin}
          onChange={handleChange('newLogin')}
          error={error}
          onClick={() => setError(false)}
        />
        <InputWithLabel
          label="Повторіть новий логін"
          type="text"
          placeholder="Введіть Ваш логін"
          value={repeatLogin}
          onChange={handleChange('repeatLogin')}
          error={error}
          onClick={() => setError(false)}
        />
        <Button type="submit" variant="adminPrimaryBtn" disabled={isDisabled}>
          Зберегти зміни
        </Button>

        {error && <ErrorText>{errorMsg}</ErrorText>}
      </InputsBox>
    </Box>
  )
}

export default ChangeLogin
