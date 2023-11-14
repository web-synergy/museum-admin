import { List } from '@mui/material';
import { FC } from 'react';
import NavMenuItem from './NavMenuItem';
type NavigationProps = {
  navigation: { title: string; href: string; icon: string }[];
  handleClose?: () => void;
};

const Navigation: FC<NavigationProps> = ({ navigation, handleClose }) => {
  return (
    <nav>
      <List>
        {navigation.map(({ title, href, icon }) => (
          <NavMenuItem
            key={href}
            href={href}
            title={title}
            icon={icon}
            click={handleClose}
          />
        ))}
      </List>
    </nav>
  );
};
export default Navigation;
