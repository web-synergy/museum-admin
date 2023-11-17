import ButtonWithIcon from '@/components/Common/ButtonWithIcon';
import { AppBar, Dialog, styled } from '@mui/material';

export const Wrapper = styled(Dialog)(({ theme }) => ({
  '& .MuiPaper-root': {
    backgroundColor: theme.palette.common.black,
    boxShadow: 'none',
  },
  '& .MuiBackdrop-root': {
    backgroundColor: theme.palette.common.black,
  },

  color: theme.palette.common.white,
  minWidth: 240,
  padding: '40px 16px',
  textAlign: 'right',
  display: 'flex',
  flexDirection: 'column',
}));
export const MobileHeader = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.common.black,
  display: 'flex',
  justifyContent: 'flex-start',
}));
export const BurgerIcon = styled(ButtonWithIcon)({
  color: 'white',
  justifyContent: 'flex-start',
  padding: 0,
  '& span': {
    margin: 0,
  },
});
export const CloseIcon = styled(ButtonWithIcon)({
  color: 'white',
  padding: 0,
  marginBottom: '24px',
  justifyContent: 'flex-end',
});
export const Logout = styled(ButtonWithIcon)(({ theme }) => ({
  borderRadius: '8px',
  border: `1px solid ${theme.palette.common.white}`,
  color: theme.palette.common.white,
  minWidth: '238px',
  padding: '9px 16px',
  marginTop: '185px',
  fontSize: 18,
  lineHeight: 1.555,
  '&:hover': {
    border: `1px solid ${theme.palette.primary.dark}`,
  },
}));
