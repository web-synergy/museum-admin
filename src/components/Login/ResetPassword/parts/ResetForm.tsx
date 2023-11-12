import { Button, FormControl, Stack, TextField, Typography } from '@mui/material'

import {
  ChangeEventHandler,
  Dispatch,
  FC,
  FormEventHandler,
  MouseEventHandler,
  SetStateAction,
} from 'react'
import { ContentStack } from '../../styles'

interface ResetError {
  isError: boolean
  errorMessage: string
}

interface ResetFormProps {
  onSubmit: FormEventHandler<HTMLFormElement>
  goToLoginPage: MouseEventHandler<HTMLButtonElement> | undefined
  userEmail: string
  setUserEmail: Dispatch<SetStateAction<string>>
  error: ResetError
  setError: Dispatch<SetStateAction<ResetError>>
}

const ResetForm: FC<ResetFormProps> = ({
  onSubmit,
  goToLoginPage,
  userEmail,
  setUserEmail,
  error,
  setError,
}) => {
  const handleChange:
    | ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
    | undefined = e => {
    setUserEmail(e.target.value)
    setError({ ...error, isError: false })
  }
  return (
    <form onSubmit={onSubmit}>
      <ContentStack>
        <FormControl fullWidth>
          <Typography variant="body1" fontWeight={600} marginBottom={1}>
            Електронна адреса
          </Typography>
          <TextField
            placeholder="olenapetrova@gmail.com"
            type="mail"
            autoComplete="off"
            value={userEmail}
            onChange={handleChange}
            sx={{ '.MuiOutlinedInput-root': { height: '52px' } }}
            error={error.isError}
          />
        </FormControl>
        <Stack spacing={2}>
          <Button variant="adminPrimaryBtn" fullWidth type="submit">
            Відновити пароль
          </Button>
          <Button variant="adminSecondaryBtn" fullWidth onClick={goToLoginPage}>
            Скасувати
          </Button>
        </Stack>
      </ContentStack>
    </form>
  )
}

export default ResetForm
