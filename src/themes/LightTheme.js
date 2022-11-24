import { createTheme } from '@material-ui/core/styles';

import 'typeface-roboto';
import '@fontsource/open-sans';
import '@fontsource/open-sans/500.css';
import '@fontsource/open-sans/600.css';
import '@fontsource/open-sans/700.css';
import '@fontsource/open-sans/800.css';

const vsPurple = '#7c74bd';
const vsBlue = '#0068a9';
const vsTeal = '#44a8aa';
const vsTealLight = '#6DC3C5';
const red = '#df5f5f';

const theme = createTheme({
  typography: {
    useNextVariants: true,
    fontFamily: '"Open Sans", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    type: 'light',
    primary: {
      main: vsBlue,
    },
    secondary: {
      main: vsPurple,
    },
    success: {
      light: vsTealLight,
      main: vsTeal,
    },
    error: {
      main: red,
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
    MuiButton: {
      root: {
        fontWeight: 600,
      },
    },
    MuiTabs: {
      root: {
        backgroundColor: '#fff',
      },
      indicator: {
        backgroundColor: vsBlue,
      },
      flexContainer: {
        alignItems: 'center',
      },
    },
    MuiTab: {
      root: {
        fontWeight: '600',
        zIndex: 2,
        color: 'inherit',
        transition: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
        '&$selected': {
          color: vsBlue,
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
