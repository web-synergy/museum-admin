import { confirmEmail } from '@/api'
import SvgSpriteIcon from '@/components/Common/SvgSprite'
import { Box, Button, IconButton, Stack, Typography } from '@mui/material'
import { Dispatch, FC, useRef } from 'react'
import { getUserCode, handleKeyDown } from '../helpers'
import {
  CustomDialog,
  DialogErrorText,
  DialogHintText,
  DialogStack,
  DialogTextField,
} from '../styles'

interface CurrError {
  isError: boolean
  errorMsg: string
}

interface ModalWindProps {
  closeModal: () => void
  open: boolean
  setOpen: Dispatch<React.SetStateAction<boolean>>
  error: CurrError
  setError: (value: React.SetStateAction<CurrError>) => void
}

const LoginModalWind: FC<ModalWindProps> = ({ closeModal, open, setOpen, error, setError }) => {
  const inputs = Array(6).fill('')

  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null))

  const changeFocus = (currInputVal: string, index: number) => {
    if (index < inputRefs.current.length - 1 && currInputVal) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  const checkUserCode = () => {
    const checkCode = async (code: string) => {
      const resp = await confirmEmail(code)
      if (resp === 204) return setOpen(true)
      else setError({ ...error, isError: true })
    }
    const userCode = getUserCode(inputRefs.current)
    checkCode(userCode)
  }

  return (
    <CustomDialog onClose={closeModal} open={open}>
      <DialogStack>
        <Box sx={{ position: 'relative', width: '100%', height: '27px' }}>
          <IconButton
            onClick={closeModal}
            sx={{
              position: 'absolute',
              right: 0,
              top: 0,
            }}
          >
            <SvgSpriteIcon iconId="close" sx={{ padding: 0 }} />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h3">Введіть код підтвердження</Typography>
          <Typography variant="body1" sx={{ marginTop: '16px' }}>
            На вказану Вами адресу було надіслано 6-ти значний код для підтвердження зміни логіну
          </Typography>
        </Box>

        <Box sx={{ height: '76px' }}>
          <Stack
            sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {inputs.map((_, index) => (
              <DialogTextField
                type="text"
                variant="outlined"
                key={index}
                onChange={e => changeFocus(e.target.value, index)}
                inputRef={ref => (inputRefs.current[index] = ref)}
                onKeyDown={handleKeyDown}
                inputProps={{ maxLength: 1 }}
                error={error.isError}
                autoComplete="off"
              />
            ))}
          </Stack>
          {error.isError && <DialogErrorText>Не вірний код!</DialogErrorText>}
        </Box>
        <Button type="button" variant="adminPrimaryBtn" onClick={checkUserCode}>
          Змінити логін
        </Button>
        <DialogHintText variant="body1">
          Якщо Ви не отримали код підтвердження — перевірте вірність вказаної електронної адреси
        </DialogHintText>
      </DialogStack>
    </CustomDialog>
  )
}

export default LoginModalWind
