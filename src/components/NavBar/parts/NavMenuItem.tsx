import useActiveLink from '@/hooks/useActiveLink';
import { ListItem, useMediaQuery } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import ButtonWithIcon from '@/components/Common/ButtonWithIcon';
import { Link } from 'react-router-dom';
import { theme } from '@/theme';

interface NavMenuItemProp {
  href: string;
  title: string;
  icon: string;
  click?: () => void;
}

const NavMenuItem: FC<NavMenuItemProp> = ({ href, title, icon, click }) => {
  const isActiveLink = useActiveLink(href);
  const isMob = useMediaQuery(theme.breakpoints.down('md'));

  const [slowTitle, setSlowTitle] = useState('');
  useEffect(() => {
    let timerId: ReturnType<typeof setTimeout>;

    const time = () => {
      timerId = setTimeout(() => {
        setSlowTitle(title);
      }, 400);
    };

    if (title && !isMob) {
      time();
    } else {
      setSlowTitle(title);
    }

    return () => clearTimeout(timerId);
  }, [title, isMob]);
  return (
    <ListItem sx={{ mb: 1 }} disablePadding onClick={click}>
      <ButtonWithIcon
        sx={{
          '.MuiButton-startIcon': {
            m: '1px',
          },
          backgroundColor: theme =>
            isActiveLink
              ? theme.palette.primary.main
              : theme.palette.text.primary,
          color: theme =>
            isActiveLink
              ? theme.palette.common.black
              : theme.palette.common.white,
        }}
        title={slowTitle}
        svgSpriteId={icon}
        variant='link'
        iconPlace='startIcon'
        component={Link}
        to={href}></ButtonWithIcon>
    </ListItem>
  );
};

export default NavMenuItem;
