import { Components, Theme } from '@mui/material/styles';

export const MuiTooltip: Components<Theme>['MuiTooltip'] = {
  defaultProps: {
    placement: 'bottom',
  },
  styleOverrides: {
    tooltip: ({ theme }) => ({
      maxWidth: 184,
      color: theme.palette.common.black,
      backgroundColor: theme.palette.gray.light,
      padding: 16,
      borderRadius: '4px',
      fontSize: '14px',
      lineHeight: 1.429,

      '.MuiTooltip-popper[data-popper-placement*="top"] &': {
        marginBottom: 0,
      },

      [theme.breakpoints.up('md')]: {
        maxWidth: 204,
        fontSize: '16px',
        lineHeight: 1.5,
      },
    }),
  },
};
