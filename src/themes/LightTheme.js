import { createMuiTheme } from '@material-ui/core/styles';
import indigo from '@material-ui/core/colors/indigo';

import 'typeface-roboto';
import '@vidispine/vdt-materialui/dist/index.css';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    type: 'light',
    primary: {
      // light: '#222',
      main: '#7B61FF',
      // dark: '#000',
    },
    secondary: {
      // light: '#DDD',
      main: '#CCC',
      // dark: '#BBB',
    },
    text: {
      primary: 'rgba(0,0,0,0.75)',
    },
    background: {
      login: 'linear-gradient(-45deg,#b0c800,#0068a9 0,#0068a9 33%,#002749 100%,#b0c800 0)',
      default: '#f2f2f2',
      paper: '#fff',
    },
  },
  overrides: {
    VdtUserAvatarButton: {
      avatar: {
        backgroundColor: indigo[500],
        fontSize: '0.875rem',
        height: 32,
        width: 32,
      },
    },
    MuiTabs: {
      root: {
        marginBottom: 16,
      },
      indicator: {
        backgroundColor: '#7B61FF',
        height: '100%',
        borderRadius: 4,
        zIndex: -1,
      },
      flexContainer: {
        alignItems: 'center',
      },
    },
    MuiTab: {
      root: {
        color: 'inherit',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&$selected': {
          color: '#fff',
        },
      },
    },
  },
  mixins: {
    toolbar: {
      minHeight: 56,
    },
  },
  props: {
    VdtUserAvatarButton: {
      locale: { options: undefined },
      userName: '',
    },
  },
});

export default theme;
