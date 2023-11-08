import logo from '@/assets/images/fullLogo.svg';
import logoShort from '@/assets/images/smallLogo.svg';
import { navigation } from '../parts/data';
export const makeConstantsVie = (isShort: boolean, isLaptop: boolean) => {
  let rotate = '';
  let title = 'Вийти';
  let navItems = [...navigation];
  let insertLogo = logo;
  let width = isLaptop ? '151px' : '342px';
  let widthCollapse = '342px';
  if (isShort) {
    navItems = navigation.map(item => ({ ...item, title: '' }));
    insertLogo = logoShort;
    title = '';
    widthCollapse = '151px';
    rotate = 'rotate(180deg)';
    width = '151px';
  }
  return { rotate, title, navItems, insertLogo, width, widthCollapse };
};
