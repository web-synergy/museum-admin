import ButtonWithIcon from '@/components/Common/ButtonWithIcon';
import { Box, styled } from '@mui/material';

export const Wrapper = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  color: theme.palette.common.white,
  padding: '32px 11px 40px 80px',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
}));
export const CloseButton = styled(ButtonWithIcon)({
  background: 'white',
  color: 'black',
  marginTop: '8px',
  width: '60px',
});

export const ExitWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  justifyContent: 'start',
  alignItems: 'end',
});
export const ExitButton = styled(ButtonWithIcon)(({ theme }) => ({
  borderRadius: '8px',
  border: `1px solid ${theme.palette.common.white}`,
  color: theme.palette.common.white,
  width: '100%',
  height: '48px',
  maxWidth: '238px',
  padding: '16px',
  '&:hover': {
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));
