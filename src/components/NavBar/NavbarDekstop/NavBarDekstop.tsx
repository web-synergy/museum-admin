import { FC, useState } from 'react';
import { Box, styled, useMediaQuery, useTheme } from '@mui/material';
import useAuth from '@/hooks/useAuth';

import { CloseButton, ExitButton, ExitWrapper, Wrapper } from './style';
import Navigation from '../parts/Navigation';

import { Link, useLocation } from 'react-router-dom';
import { makeConstantsVie } from './helper';

const NavBarDekstop: FC = () => {
  const { signOut } = useAuth();
  const theme = useTheme();

  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const location = useLocation();

  const [isShort, setIsShort] = useState(isLaptop);

  const { rotate, title, navItems, insertLogo, width } = makeConstantsVie(
    isShort,
    isLaptop
  );
  const Offset = styled('div')({
    height: '100vh',
    width,
  });
  return (
    <Box>
      <Wrapper sx={{ position: 'fixed', zIndex: 1 }}>
        <Box
          component="img"
          sx={{ marginBottom: '32px', maxWidth: '240px', alignSelf: 'end' }}
          src={insertLogo}
          alt="logo"
          mb={2}
        />
        <Navigation isShort={isShort} navigation={navItems} />
        <CloseButton
          sx={{
            transition: 'all 1s',
            transform: rotate,
            '& span': {
              margin: 0,
            },
          }}
          svgSpriteId={'close-nav'}
          title=""
          variant="link"
          iconPlace="startIcon"
          component={Link}
          to={location.pathname}
          onClick={() => setIsShort((prev) => !prev)}
        />
        <ExitWrapper>
          <ExitButton
            sx={{
              '& span': {
                margin: 0,
              },
            }}
            svgSpriteId="log-out"
            title={title}
            variant="text"
            iconPlace="startIcon"
            onClick={() => signOut()}
          />
        </ExitWrapper>
      </Wrapper>
      <Offset />
    </Box>
  );
};

export default NavBarDekstop;
