import { updatePass } from '@/api'
import { Box, Button } from '@mui/material'
import { ChangeEvent, Dispatch, FC, FormEventHandler, useState } from 'react'
import { ErrorText, InputsBox } from '../styles'
import InputWithLabel from './InputWithLabel'

interface ChangePasswordProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword: FC<ChangePasswordProps> = ({ setOpen }) => {
  const [isDisabled, setIsDisabled] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState({
    newPass: '',
    repeatPass: '',
  })
  const { newPass, repeatPass } = data

  const handleChange = (key: string) => (event: ChangeEvent<HTMLInputElement>) => {
    const newVal = event.target.value.trim()
    setData({ ...data, [key]: newVal })
    if (key === 'repeatPass') {
      setError(!isPasswordsSame(newVal, data.newPass))
      if (newVal.length === data.newPass.length)
        setIsDisabled(!isPasswordsSame(newVal, data.newPass))
      else setIsDisabled(true)
    }
  }

  const isPasswordsSame = (repeatPas: string, newPass: string) => {
    const part = newPass.slice(0, repeatPas.length)
    return part === repeatPas
  }

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    const sendNewPass = async (pass: string) => {
      const resp = await updatePass(pass)
      if (resp === 204) setOpen(true)
    }
    sendNewPass(newPass)
  }

  return (
    <Box component={'form'} onSubmit={onSubmit}>
      <InputsBox>
        <InputWithLabel
          label="Новий пароль"
          type="password"
          placeholder="Введіть Ваш пароль"
          value={newPass}
          onChange={handleChange('newPass')}
          error={error}
          onClick={() => setError(false)}
        />
        <InputWithLabel
          label="Повторіть новий пароль"
          type="password"
          placeholder="Введіть Ваш пароль"
          value={repeatPass}
          onChange={handleChange('repeatPass')}
          error={error}
          onClick={() => setError(false)}
        />
        <Button type="submit" variant="adminPrimaryBtn" disabled={isDisabled}>
          Зберегти зміни
        </Button>
        {error && <ErrorText>Паролі не співпадають. Спробуйте ще раз.</ErrorText>}
      </InputsBox>
    </Box>
  )
}

export default ChangePassword
