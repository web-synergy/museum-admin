import Section from '@/components/Common/Section'
import { FC } from 'react'
import { FooterBox, FooterText, MainContainer } from '../styles'

const LoginFooter: FC = () => {
  return (
    <Section variant="dark">
      <FooterBox>
        <MainContainer>
          <FooterText>Розробка Baza Trainee Ukraine 2023 © Всі права захищені</FooterText>
        </MainContainer>
      </FooterBox>
    </Section>
  )
}

export default LoginFooter
