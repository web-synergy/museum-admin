import useAuth from '@/hooks/useAuth'
import { Typography } from '@mui/material'
import { FC, FormEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Section from '../Common/Section'
import LoginForm from './parts/LoginForm'
import { ContentBox, MainContainer } from './styles'

export interface AuthData {
  login: string
  password: string
}

const Login: FC = () => {
  const { signIn } = useAuth()
  const navigate = useNavigate()

  const [authData, setAuthData] = useState<AuthData>({
    login: '',
    password: '',
  })
  const [loginError, setLoginError] = useState(false)

  const onSubmit: FormEventHandler = async e => {
    e.preventDefault()

    if (!authData.login || !authData.password) return setLoginError(true)

    const login = await signIn(authData.login, authData.password)

    if (login) navigate('/', { replace: true })
    else setLoginError(true)
  }

  return (
    <Section variant="light">
      <MainContainer>
        <ContentBox>
          <Typography variant="h3" textAlign={'center'}>
            Вхід
          </Typography>
          <LoginForm {...{ authData, setAuthData, onSubmit, loginError, setLoginError }} />
        </ContentBox>
      </MainContainer>
    </Section>
  )
}

export default Login
