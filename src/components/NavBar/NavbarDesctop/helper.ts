import logo from '@/assets/images/fullLogo.svg';
import logoShort from '@/assets/images/smallLogo.svg';
import { navigation } from '../parts/data';
export const makeConstantsVie = (isShort: boolean, isLaptop: boolean) => {
  let rotate = '';
  const title = 'Вийти';
  const navItems = [...navigation];
  let insertLogo = logo;
  let width = isLaptop ? '151px' : '346px';
  let widthCollapse = '346px';
  if (isShort) {
    insertLogo = logoShort;
    widthCollapse = '151px';
    rotate = 'rotateY(180deg)';
    width = '151px';
  }
  return { rotate, title, navItems, insertLogo, width, widthCollapse };
};
