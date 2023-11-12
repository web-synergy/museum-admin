import { Stack, useMediaQuery, useTheme } from '@mui/material';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import NavBarMobile from '../NavBar/NavbarMobile/NavBarMobile';
import NavBarDekstop from '../NavBar/NavbarDekstop/NavBarDekstop';
import AxiosInterceptor from '../Common/AxiosInterceptor';

const SharedLayout = () => {
  //ToDo: when Login form will be done, uncomment code below (8-14 line)
  const { isAuth } = useAuth();
  const location = useLocation();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  if (!isAuth) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
  const direction = isDesktop ? 'row' : 'column';
  return (
    <Stack direction={direction}>
      {isDesktop ? <NavBarDekstop /> : <NavBarMobile />}
      <Outlet />
      <AxiosInterceptor />
    </Stack>
  );
};

export default SharedLayout;
