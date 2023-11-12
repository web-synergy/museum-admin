import { FC, PropsWithChildren } from 'react'
import { CustomAlert } from '../../styles'

interface ResetAlertProps {
  errorMessage: string
}

const ResetAlert: FC<PropsWithChildren<ResetAlertProps>> = ({ errorMessage }) => {
  return (
    <CustomAlert
      variant="outlined"
      severity="error"
      icon={false}
      sx={{
        '.MuiAlert-message': {
          maxWidth: {
            xs: '194px',
            md: '270px',
            lg: '100%',
          },
        },
        margin: 0,
      }}
    >
      {errorMessage}
    </CustomAlert>
  )
}

export default ResetAlert
