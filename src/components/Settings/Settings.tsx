import { Divider, Stack, Tab, Tabs, Typography } from '@mui/material'
import { FC, SyntheticEvent, useState } from 'react'

import ChangeLogin from './parts/ChangeLogin'
import ChangePassword from './parts/ChangePassword'
import ModalWind from './parts/ModalWind'
import TabPanel from './parts/TabPanel'

import { ContentBox, CustomDivider, MainContainer, SettingsHeaderContainer } from './styles'

const Settings: FC = () => {
  const [value, setValue] = useState(0)
  const [open, setOpen] = useState(true)

  const openModal = () => setOpen(true)
  const closeModal = () => setOpen(false)

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
            <ChangePassword openModal={openModal} />
          </TabPanel>
          <TabPanel index={1} value={value}>
            <ChangeLogin openModal={openModal} />
          </TabPanel>

          <ModalWind {...{ closeModal, open }} />
        </ContentBox>
      </MainContainer>
    </Stack>
  )
}

export default Settings
