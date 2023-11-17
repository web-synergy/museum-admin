import { updatePass } from '@/api'
import { Box, Button } from '@mui/material'
import { ChangeEvent, Dispatch, FC, FormEventHandler, useEffect, useState } from 'react'
import { isValuesSame } from '../helpers'
import { ErrorText, InputsBox } from '../styles'
import InputWithLabel from './InputWithLabel'

interface ChangePasswordProps {
  setOpen: Dispatch<React.SetStateAction<boolean>>
  setLoading: Dispatch<React.SetStateAction<boolean>>
}

const ChangePassword: FC<ChangePasswordProps> = ({ setOpen, setLoading }) => {
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
    setError(false)
  }

  useEffect(() => {
    if (newPass && repeatPass) {
      setError(!isValuesSame(newPass, repeatPass))
    }

    if (newPass.length === repeatPass.length) {
      setIsDisabled(!isValuesSame(newPass, repeatPass))
    } else setIsDisabled(true)
  }, [newPass, repeatPass])

  const onSubmit: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault()
    setLoading(true)
    const sendNewPass = async (pass: string) => {
      const resp = await updatePass(pass)
      setLoading(false)

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
        />
        <InputWithLabel
          label="Повторіть новий пароль"
          type="password"
          placeholder="Введіть Ваш пароль"
          value={repeatPass}
          onChange={handleChange('repeatPass')}
          error={error}
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
