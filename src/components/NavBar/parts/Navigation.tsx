import { List } from '@mui/material';
import { FC } from 'react';
import NavMenuItem from './NavMenuItem';
type NavigationProps = {
  navigation: { title: string; href: string; icon: string }[];
  handleClose?: () => void;
  isShort?: boolean;
};

const Navigation: FC<NavigationProps> = ({ navigation, handleClose, isShort }) => {
  return (
    <>
      <nav style={{ minHeight: '400px', marginBottom: '56px' }}>
        <List
          className={`menu ${!isShort ? 'open' : ''}`}
          sx={{
            transition: 'width 0.5s linear',
            '&.menu': {
              width: '64px',

              '&.open': {
                width: '258px',

              },
            },

            p: 0,
            display: 'grid',
            gap: '8px',
          }}>
          {navigation.map(({ title, href, icon }) => (
            <NavMenuItem key={href} href={href} title={title} icon={icon} click={handleClose} />
          ))}
        </List>
      </nav>
    </>
  );
};
export default Navigation;
