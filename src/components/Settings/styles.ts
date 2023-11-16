import {
  Box,
  BoxProps,
  Dialog,
  DialogProps,
  Divider,
  Stack,
  StackProps,
  TextField,
  TextFieldProps,
  Typography,
  TypographyProps,
  styled,
} from '@mui/material'

export const CustomDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.gray.light,
}))

export const SettingsHeaderContainer = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    padding: '24px 16px',
  },
  [theme.breakpoints.up('md')]: {
    padding: '56px 0px 16px 24px ',
  },
  [theme.breakpoints.up('lg')]: {
    padding: '68px 0px 16px 24px ',
  },
}))

export const MainContainer = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    paddingTop: '24px',
    paddingLeft: '16px',
  },
  [theme.breakpoints.up('md')]: {
    paddingTop: '32px',
    paddingLeft: '24px',
  },
}))

export const ContentBox = styled(Box)<BoxProps>(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    width: '288px',
    margin: '32px 0 0 16px',
  },
  [theme.breakpoints.up('md')]: {
    width: '440px',
    margin: '40px 0 0 24px',
  },
  [theme.breakpoints.up('lg')]: {
    width: '460px',
  },
}))

export const InputsBox = styled(Stack)<StackProps>(({ theme }) => ({
  [theme.breakpoints.up('xs')]: {
    rowGap: '24px',
  },
  [theme.breakpoints.up('md')]: {
    rowGap: '32px',
  },
  [theme.breakpoints.up('lg')]: {},
}))

export const ErrorText = styled(Typography)<TypographyProps>(({ theme }) => ({
  textAlign: 'center',
  backgroundColor: theme.palette.error.light,
  border: `1px solid ${theme.palette.error.main}`,
  borderRadius: '8px',
  padding: '8px 0',
  [theme.breakpoints.up('xs')]: {
    fontSize: '0.875rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '1rem',
  },
  [theme.breakpoints.down('md')]: {
    paddingRight: '35px',
    paddingLeft: '35px',
  },
  '&.MuiTypography-root': {
    lineHeight: 1.42,
  },
}))

export const CustomDialog = styled(Dialog)<DialogProps>(({ theme }) => ({
  '.MuiDialog-paper': {
    borderRadius: '8px',
    maxWidth: 'none',

    [theme.breakpoints.up('xs')]: {
      padding: '24px 16px 32px',
      maxWidth: '280px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '32px 36px 56px',
      maxWidth: '438px',

      marginLeft: '164px',
    },
    [theme.breakpoints.up('lg')]: {
      padding: '32px 40px 56px',
      maxWidth: '502px',
    },
  },
}))

export const DialogStack = styled(Stack)<StackProps>(({ theme }) => ({
  textAlign: 'center',

  [theme.breakpoints.up('xs')]: {
    rowGap: '24px',
  },
  [theme.breakpoints.up('md')]: {
    rowGap: '32px',
  },
}))

export const DialogTextField = styled(TextField)<TextFieldProps>(({ theme, error }) => ({
  caretColor: theme.palette.primary.dark,

  '&.MuiTextField-root': {
    [theme.breakpoints.up('xs')]: {
      width: '32px',
    },
    [theme.breakpoints.up('md')]: {
      width: '48px',
    },
  },
  '.MuiInputBase-input': {
    color: error ? theme.palette.error.main : '',
    textAlign: 'center',
    fontWeight: 500,
    [theme.breakpoints.up('xs')]: {
      fontSize: '1.125rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1.25rem',
    },
    [theme.breakpoints.up('lg')]: {
      fontSize: '1.5rem',
    },
  },
  '.MuiOutlinedInput-notchedOutline': {},
  '.MuiOutlinedInput-root': {
    [theme.breakpoints.up('xs')]: {
      padding: '0px',
      height: '32px',
    },
    [theme.breakpoints.up('md')]: {
      padding: '8px 16px',
      height: '48px',
    },
  },
}))

export const DialogErrorText = styled(Typography)<TypographyProps>(({ theme }) => ({
  '&.MuiTypography-root': {
    marginTop: '4px',
    lineHeight: 1.5,
    color: theme.palette.error.main,
    textAlign: 'left',
    [theme.breakpoints.up('xs')]: {
      fontSize: '0.875rem',
    },
    [theme.breakpoints.up('md')]: {
      fontSize: '1rem',
    },
  },
}))

export const DialogHintText = styled(Typography)<TypographyProps>(({ theme }) => ({
  padding: '2px',
  color: theme.palette.gray.dark,
  lineHeight: 1.5,
  [theme.breakpoints.up('xs')]: {
    '&.MuiTypography-root': {
      lineHeight: 1.4,
    },
  },
  [theme.breakpoints.up('md')]: {
    '&.MuiTypography-root': {
      lineHeight: 1.5,
    },
  },
}))

export const LoaderBox = styled(Box)(() => ({
  position: 'absolute',
  width: '100%',
  height: '100vh',
  zIndex: 10,
  backgroundColor: '#0006',
}))
