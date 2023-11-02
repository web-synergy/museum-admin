import SvgSpriteIcon from '@/components/Common/SvgSprite'
import { Box, IconButton, Stack, TextField, Typography } from '@mui/material'
import { ChangeEvent, ChangeEventHandler, FC, FormEvent, useRef, useState } from 'react'
import { CustomDialog, DialogStack, DialogTextField, ModalText } from '../styles'

interface ModalWindProps {
  closeModal: () => void
  open: boolean
}

const ModalWind: FC<ModalWindProps> = ({ closeModal, open }) => {
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
        <Box sx={{ width: '100%', height: '24px' }}>
          <IconButton
            onClick={closeModal}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
            }}
          >
            <SvgSpriteIcon iconId="close" />
          </IconButton>
        </Box>
        <Box>
          <Typography variant="h3">Введіть код підтвердження</Typography>
          <Typography variant="body1" sx={{ marginTop: '16px' }}>
            На вказану Вами адресу було надіслано 6-ти значний код для підтвердження зміни логіну
          </Typography>
        </Box>
        <Stack sx={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
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
              // error={true}
            />
          ))}
        </Stack>
      </DialogStack>
    </CustomDialog>
  )
}

export default ModalWind
