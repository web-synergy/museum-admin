import { Box, Divider, Stack, Tab, Tabs, Typography } from '@mui/material'
import { FC, SyntheticEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import ChangeLogin from './parts/ChangeLogin'
import ChangePassword from './parts/ChangePassword'
import TabPanel from './parts/TabPanel'

import InfoModal from '../EventForm/parts/InfoModal'
import {
  ContentBox,
  CustomDivider,
  LoaderBox,
  MainContainer,
  SettingsHeaderContainer,
} from './styles'

import useAuth from '@/hooks/useAuth'
import Loader from '../Common/Loader'

const Settings: FC = () => {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

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
    <Stack sx={{ width: '100%' }} position={'relative'}>
      {loading && (
        <LoaderBox>
          <Box sx={{ position: 'absolute', left: '45%' }}>
            <Loader visible={loading} />
          </Box>
        </LoaderBox>
      )}
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

      <ContentBox>
        <TabPanel index={0} value={value}>
          <ChangePassword {...{ setOpen, setLoading }} />
        </TabPanel>
        <TabPanel index={1} value={value}>
          <ChangeLogin {...{ setOpen, setLoading }} />
        </TabPanel>
      </ContentBox>

      <InfoModal {...{ text: 'Зміни збережено.', open, onClose }} />
    </Stack>
  )
}

export default Settings
