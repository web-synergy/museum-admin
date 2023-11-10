import { FC, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import useAuth from '@/hooks/useAuth';

import { CloseButton, ExitButton, ExitWrapper, Wrapper } from './style';
import Navigation from '../parts/Navigation';
import { makeConstantsVie } from './helper';

const NavBarDekstop: FC = () => {
  const { signOut } = useAuth();
  const theme = useTheme();

  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  const [isShort, setIsShort] = useState(isLaptop);

  const { rotate, title, navItems, insertLogo, width, widthCollapse } =
    makeConstantsVie(isShort, isLaptop);
  return (
    <Box>
      <Box
        onClick={() => setIsShort(true)}
        sx={{
          position: 'fixed',
          zIndex: 1,
          width: !isShort ? '100vw' : widthCollapse,
          transition: 'width 0.4s ease-in-out',
        }}>
        <Wrapper
          onClick={e => e.stopPropagation()}
          sx={{
            position: !isLaptop ? 'fixed' : 'relative',
            zIndex: 2,
            p: isShort ? '32px 11px 40px 80px' : '32px 8px 40px 80px',
            width: widthCollapse,
            transition: 'width 0.4s ease-in-out',
          }}>
          <Box
            component='img'
            sx={{
              alignSelf: 'end',
            }}
            src={insertLogo}
            alt='logo'
            mb={3}
          />
          <Navigation
            handleClose={() => {
              isLaptop && setIsShort(true);
            }}
            navigation={navItems}
          />
          <CloseButton
            sx={{
              '.MuiSvgIcon-root': {
                transform: rotate,
                transition: 'transform 0.4s',
              },
            }}
            svgSpriteId={'close-nav'}
            title=''
            variant='link'
            iconPlace='startIcon'
            onClick={() => setIsShort(prev => !prev)}
          />
          <ExitWrapper>
            <ExitButton
              svgSpriteId='log-out'
              title={title}
              variant='text'
              iconPlace='startIcon'
              onClick={() => signOut()}
            />
          </ExitWrapper>
        </Wrapper>
      </Box>
      <Box
        sx={{
          height: '100vh',
          width,
          transition: 'width 0.4s ease-in-out',
        }}
      />
    </Box>
  );
};

export default NavBarDekstop;
