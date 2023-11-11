import { Button, FormControl, InputAdornment, Stack, TextField, Typography } from '@mui/material'
import {
  ChangeEvent,
  Dispatch,
  FC,
  FormEventHandler,
  MouseEventHandler,
  SetStateAction,
  useState,
} from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { AuthData } from '../Login'
import { ButtonBox, CustomAlert, FormBox, RecoveryPassTitle } from '../styles'
import PassIcon from './PassIcon'

interface LoginFormProps {
  authData: AuthData
  setAuthData: Dispatch<SetStateAction<AuthData>>
  onSubmit: FormEventHandler
  loginError: boolean
  setLoginError: Dispatch<React.SetStateAction<boolean>>
}

const LoginForm: FC<LoginFormProps> = ({
  authData,
  setAuthData,
  onSubmit,
  loginError,
  setLoginError,
}) => {
  const [showPass, setShowPass] = useState(false)

  const managePassInput: MouseEventHandler = e => {
    e.preventDefault()
    setShowPass(!showPass)
  }

  const handleChange = (name: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setAuthData({ ...authData, [name]: e.target.value.trim() })
  }

  return (
    <FormBox>
      <form onSubmit={onSubmit}>
        <Stack spacing={3}>
          <FormControl fullWidth>
            <Typography variant="body1" fontWeight={600} marginBottom={1}>
              Логін
            </Typography>
            <TextField
              placeholder="olenapetrova@gmail.com"
              autoComplete="off"
              error={loginError}
              value={authData.login}
              onChange={handleChange('login')}
              onClick={() => setLoginError(false)}
              sx={{ '.MuiOutlinedInput-root': { height: '52px' } }}
            />
          </FormControl>

          <FormControl fullWidth>
            <Typography variant="body1" fontWeight={600} marginBottom={1}>
              Пароль
            </Typography>
            <TextField
              type={`${showPass ? 'text' : 'password'}`}
              autoComplete="off"
              placeholder="Введіть Ваш пароль"
              fullWidth
              error={loginError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <PassIcon onClick={managePassInput} showPassword={showPass} />
                  </InputAdornment>
                ),
              }}
              value={authData.password}
              onChange={handleChange('password')}
              onClick={() => setLoginError(false)}
              sx={{ '.MuiOutlinedInput-root': { height: '52px' } }}
            />
          </FormControl>

          <RecoveryPassTitle component={RouterLink} to={'reset'}>
            Забули пароль?
          </RecoveryPassTitle>
        </Stack>

        <ButtonBox>
          <Button variant="adminPrimaryBtn" type="submit" fullWidth>
            Увійти
          </Button>
        </ButtonBox>
      </form>

      {loginError && (
        <CustomAlert variant="outlined" severity="error" icon={false}>
          Невірно введені дані. Для входу в обліковий запис повторіть спробу.
        </CustomAlert>
      )}
    </FormBox>
  )
}

export default LoginForm
