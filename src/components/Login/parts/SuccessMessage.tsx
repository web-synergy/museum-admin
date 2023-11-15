import Section from '@/components/Common/Section'
import { Button, Typography } from '@mui/material'
import { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonBox, Description, MainContainer, SuccessMessageBox } from '../styles'

const SuccessMessage: FC = () => {
  const navigate = useNavigate()
  return (
    <Section variant="light">
      <MainContainer>
        <SuccessMessageBox>
          <Typography variant="h3" textAlign={'center'}>
            Дякуємо!
          </Typography>
          <Description sx={{ marginTop: '16px' }}>
            На вашу пошту було відправлено лист з інструкцією для відновлення паролю.
          </Description>
          <ButtonBox>
            <Button fullWidth variant="adminPrimaryBtn" onClick={() => navigate('/login')}>
              Повернутись до входу
            </Button>
          </ButtonBox>
        </SuccessMessageBox>
      </MainContainer>
    </Section>
  )
}

export default SuccessMessage
