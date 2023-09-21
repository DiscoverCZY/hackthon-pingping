import PropTypes from 'prop-types';

// material-ui
import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as palette from '@mui/material/colors';

import Typography from './typography';
import CustomShadows from './shadows';
import componentsOverride from './overrides';

// ==============================|| DEFAULT THEME - MAIN  ||============================== //

const theme = {
  breakpoints: {
    values: {
      xs: 0,
      sm: 768,
      md: 1024,
      lg: 1266,
      xl: 1536
    }
  },
  direction: 'ltr',
  mixins: {
    toolbar: {
      minHeight: 60,
      paddingTop: 8,
      paddingBottom: 8
    }
  },
  palette: {
    mode: 'light',
    primary: palette.blue,
    secondary: palette.blueGrey,
    common: {
      black: '#000',
      white: '#fff'
    },
    ...palette,
    text: {
      primary: palette.grey[700],
      secondary: palette.grey[500],
      disabled: palette.grey[400]
    },
    action: {
      disabled: palette.grey[300]
    },
    divider: palette.grey[200],
    background: {
      paper: palette.grey[0],
      default: palette.grey[100]
    }
  },
  customShadows: CustomShadows(palette),
  typography: Typography(`'Public Sans', sans-serif`),
};

export default function ThemeCustomization({ children }) {
  const themes = createTheme(theme);
  themes.components = componentsOverride(themes);

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

ThemeCustomization.propTypes = {
  children: PropTypes.node
};
