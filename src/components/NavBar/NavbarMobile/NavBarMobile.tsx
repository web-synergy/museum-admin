import useAuth from '@/hooks/useAuth';
import { Box, Slide, Toolbar, styled } from '@mui/material';
import { FC, useState } from 'react';
import Navigation from '../parts/Navigation';
import { navigation } from '../parts/data';
import { BurgerIcon, CloseIcon, Logout, MobileHeader, Wrapper } from './style';

import { Link } from 'react-router-dom';
import React from 'react';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='right' ref={ref} {...props} />;
});

const NavBarMobile: FC = () => {
  const { signOut } = useAuth();
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const Offset = styled('div')(({ theme }) => theme.mixins.toolbar);

  return (
    <>
      <Wrapper
        TransitionComponent={Transition}
        fullScreen
        open={open}
        onClose={handleClose}>
        <CloseIcon
          svgSpriteId='close'
          title=''
          variant='text'
          onClick={handleClose}
        />
        <Navigation handleClose={handleClose} navigation={navigation} />
        <Box
          sx={{
            display: 'block',
            textAlign: 'center',
          }}>
          <Logout
            svgSpriteId='log-out'
            title='Вийти'
            variant='text'
            iconPlace='startIcon'
            component={Link}
            onClick={() => signOut()}
          />
        </Box>
      </Wrapper>

      <MobileHeader position='fixed'>
        <Toolbar>
          <BurgerIcon
            svgSpriteId='burger-menu'
            title=''
            variant='text'
            iconPlace='startIcon'
            onClick={handleClickOpen}
          />
        </Toolbar>
      </MobileHeader>
      <Offset />
    </>
  );
};

export default NavBarMobile;
