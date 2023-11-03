import SvgSpriteIcon from '@/components/Common/SvgSprite'
import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, ChangeEventHandler, FC, FormEvent, useRef, useState } from 'react'
import {
  CustomDialog,
  DialogErrorText,
  DialogHintText,
  DialogStack,
  DialogTextField,
  ModalText,
} from '../styles'

interface ModalWindProps {
  closeModal: () => void
  open: boolean
}

const ModalWind: FC<ModalWindProps> = ({ closeModal, open }) => {
  const [error, setError] = useState(true)
  const [inputsValues, setInputsValues] = useState(Array(6).fill(''))
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(''))

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newValues = [...inputsValues]
    const currVal = /[0-9]/gi.test(e.target.value) ? e.target.value : ''

    newValues[index] = currVal
    setInputsValues(newValues)

    if (index < inputRefs.current.length - 1 && currVal.length === 1) {
      inputRefs.current[index + 1]?.focus()
    }
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

        <Box>
          <Stack
            sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
          >
            {inputsValues.map((inputVal, index) => (
              <DialogTextField
                type="text"
                variant="outlined"
                key={index}
                value={inputVal}
                onChange={e => handleInputChange(e, index)}
                inputRef={ref => (inputRefs.current[index] = ref)}
                inputProps={{ maxLength: 1 }}
                required
                error={true}
              />
            ))}
          </Stack>
          {error && <DialogErrorText>Не вірний код!</DialogErrorText>}
        </Box>
        <Button type="button" variant="adminPrimaryBtn">
          Змінити логін
        </Button>
        <DialogHintText variant="body1">
          Якщо Ви не отримали код підтвердження — перевірте вірність вказаної електронної адреси
        </DialogHintText>
      </DialogStack>
    </CustomDialog>
  )
}

export default ModalWind
