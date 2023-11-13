import { Components, Theme } from '@mui/material/styles';

export const MuiToolbar: Components<Theme>['MuiToolbar'] = {
  styleOverrides: {
    root: ({ theme }) => ({
      minHeight: 56,
      [`${theme.breakpoints.up('xs')}`]: {
        minHeight: 56,
      },
    }),
  },
};
