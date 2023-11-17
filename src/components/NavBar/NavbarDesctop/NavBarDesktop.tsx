import { FC, useState } from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { CloseButton, ExitButton, ExitWrapper, Wrapper } from './style';
import Navigation from '../parts/Navigation';
import { makeConstantsVie } from './helper';
import ConfirmExitModal from '../parts/ConfirmExitModal';

const NavBarDesktop: FC = () => {
  const theme = useTheme();

  const isLaptop = useMediaQuery(theme.breakpoints.down('lg'));

  const [isShort, setIsShort] = useState(isLaptop);
  const [openModal, setOpenModal] = useState(false);

  const { rotate, title, navItems, insertLogo, width, widthCollapse } =
    makeConstantsVie(isShort, isLaptop);

  const transition = '0.4s ease-in-out';

  return (
    <Box>
      <Box
        onClick={() => setIsShort(true)}
        sx={{
          position: 'fixed',
          zIndex: 1,
          width: !isShort ? '100vw' : widthCollapse,
          transition: `width ${transition}`,
        }}
      >
        <Wrapper
          onClick={(e) => e.stopPropagation()}
          sx={{
            position: !isLaptop ? 'fixed' : 'relative',
            zIndex: 2,
            p: isShort ? '32px 11px 40px 80px' : '32px 8px 40px 80px',
            width: widthCollapse,
            transition: `width ${transition}`,
          }}
        >
          <Box
            component="img"
            sx={{
              alignSelf: 'end',
            }}
            src={insertLogo}
            alt="logo"
            mb={3}
          />
          <Navigation
            handleClose={() => {
              isLaptop && setIsShort(true);
            }}
            navigation={navItems}
          />
          <CloseButton
            aria-label={isShort ? 'Відкрити' : 'Закрити'}
            sx={{
              '.MuiSvgIcon-root': {
                transform: rotate,
                transition: `transform ${transition}`,
              },
            }}
            svgSpriteId={'close-nav'}
            title=""
            variant="link"
            iconPlace="startIcon"
            onClick={() => setIsShort((prev) => !prev)}
          />
          <ExitWrapper>
            <ExitButton
              svgSpriteId="log-out"
              title={title}
              variant="text"
              iconPlace="startIcon"
              onClick={() => setOpenModal(true)}
              aria-label={title}
              sx={{
                '& .MuiButton-startIcon': {
                  transition: `margin ${transition}`,
                  marginLeft: isShort ? '70px' : '0px',
                },
              }}
            />
          </ExitWrapper>
        </Wrapper>
      </Box>
      <Box
        sx={{
          height: '100vh',
          width,
          transition: `width ${transition}`,
        }}
      />
      <ConfirmExitModal
        open={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </Box>
  );
};

export default NavBarDesktop;
