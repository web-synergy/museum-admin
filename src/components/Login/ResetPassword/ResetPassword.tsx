import { recoveryPass } from '@/api'
import { FC, FormEventHandler, MouseEventHandler, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ContentBox, ContentStack, MainContainer } from '../styles'

import Section from '@/components/Common/Section'
import ResetAlert from './parts/ResetAlert'
import ResetForm from './parts/ResetForm'
import ResetHeadlines from './parts/ResetHeadlines'

const ResetPassword: FC = () => {
  const navigate = useNavigate()
  const [userEmail, setUserEmail] = useState('')
  const [error, setError] = useState({
    isError: false,
    errorMessage: 'Така електронна адреса не зареєстрована в системі. Повторіть спробу.',
  })

  const headlines = {
    title: 'Забули пароль?',
    subtitle: 'Будь ласка, вкажіть Вашу електронну адресу для відновлення паролю ',
  }

  const goToLoginPage: MouseEventHandler = e => {
    e.preventDefault()
    navigate('/login')
  }

  const onSubmit: FormEventHandler<HTMLFormElement> | undefined = e => {
    e.preventDefault()
    const sendPass = async (email: string) => {
      const resp = await recoveryPass(email)
      if (resp === 204) return navigate('/login/success-message')
      else {
        setError({ ...error, isError: true })
      }
    }
    sendPass(userEmail)
  }

  return (
    <Section variant="light">
      <MainContainer>
        <ContentBox>
          <ContentStack>
            <ResetHeadlines {...headlines} />
            <ResetForm {...{ onSubmit, goToLoginPage, userEmail, setUserEmail, error, setError }} />
            {error.isError && <ResetAlert errorMessage={error.errorMessage} />}
          </ContentStack>
        </ContentBox>
      </MainContainer>
    </Section>
  )
}

export default ResetPassword
