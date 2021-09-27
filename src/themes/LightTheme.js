import { createMuiTheme } from '@material-ui/core/styles';

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
      main: '#00b16a',
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
        fontSize: '0.875rem',
        height: 32,
        width: 32,
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: '#fff',
        borderBottom: '2px solid #7B61FF',
      },
      indicator: {
        backgroundColor: '#7B61FF',
        height: '100%',
        zIndex: 1,
      },
      flexContainer: {
        alignItems: 'center',
      },
    },
    MuiTab: {
      root: {
        zIndex: 2,
        color: 'inherit',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&$selected': {
          color: '#fff',
        },
      },
    },
    MuiPaper: {
      root: {
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      },
    },
    MuiAvatar: {
      colorDefault: {
        color: 'inherit',
        backgroundColor: '#f2f2f2',
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
    MuiPaper: {
      variant: 'outlined',
    },
  },
});

export default theme;
