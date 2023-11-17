import { useState } from 'react';
import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import NavBarMobile from '../NavBar/NavbarMobile/NavBarMobile';
import NavBarDesktop from '../NavBar/NavbarDesctop/NavBarDesktop';
import AxiosInterceptor from '../Common/AxiosInterceptor';
import ChangeLoginModal from './parts/ChangeLoginModal';

const SharedLayout = () => {
  //ToDo: when Login form will be done, uncomment code below (8-14 line)
  const { isAuth, getModalState } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isModalOpen, setModalOpen] = useState(() => getModalState());

  if (!isAuth) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  const direction = isDesktop ? 'row' : 'column';
  return (
    <Stack direction={direction}>
      {isDesktop ? <NavBarDesktop /> : <NavBarMobile />}
      <Outlet />
      <AxiosInterceptor />
      <ChangeLoginModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
      />
    </Stack>
  );
};

export default SharedLayout;
