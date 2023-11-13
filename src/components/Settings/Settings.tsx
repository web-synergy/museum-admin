import { Divider, Stack, Tab, Tabs, Typography } from '@mui/material'
import { FC, SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ChangeLogin from './parts/ChangeLogin'
import ChangePassword from './parts/ChangePassword'
import TabPanel from './parts/TabPanel'

import InfoModal from '../EventForm/parts/InfoModal'
import { ContentBox, CustomDivider, MainContainer, SettingsHeaderContainer } from './styles'

import useAuth from '@/hooks/useAuth'

const Settings: FC = () => {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)

  const { signOut } = useAuth()
  const navigate = useNavigate()

  const onClose = () => {
    setOpen(false)
    signOut()
    navigate('/login', { replace: true })
  }

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    event.stopPropagation()
    setValue(newValue)
  }

  return (
    <Stack sx={{ width: '100%' }}>
      <SettingsHeaderContainer>
        <Typography variant="h3" component="h1">
          Налаштування
        </Typography>
      </SettingsHeaderContainer>

      <Divider flexItem />

      <MainContainer>
        <Tabs value={value} onChange={handleChange}>
          <Tab disableRipple label="Змінити пароль" />
          <Tab disableRipple label="Змінити логін" />
        </Tabs>
      </MainContainer>

      <CustomDivider />

      <MainContainer>
        <ContentBox>
          <TabPanel index={0} value={value}>
            <ChangePassword {...{ setOpen }} />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <ChangeLogin />
          </TabPanel>
        </ContentBox>
      </MainContainer>

      <InfoModal {...{ text: 'Зміни збережено.', open, onClose }} />
    </Stack>
  )
}

export default Settings
