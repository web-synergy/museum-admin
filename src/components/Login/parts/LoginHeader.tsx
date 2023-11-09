import logo from '@/assets/images/fullLogo.svg'
import { Box } from '@mui/material'
import { FC } from 'react'
import { HeaderBox, HeaderLogoBox, MainContainer } from '../styles'

const LoginHeader: FC = () => {
  return (
    <HeaderBox>
      <MainContainer>
        <HeaderLogoBox>
          <Box component={'img'} src={logo} alt="logo image" />
        </HeaderLogoBox>
      </MainContainer>
    </HeaderBox>
  )
}

export default LoginHeader
