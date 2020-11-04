import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
// import KronaOne from '../src/Assets/KronaOne-Regular.ttf';
import OpenSans from '../src/Assets/OpenSans-Regular.ttf';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#08436F',
    },
    secondary: {
      main: '#031D31',
    },
  },
  status: {
    danger: '#F64848',
  },
  hover:{
    primary: {
      main: '#39688b',
    },
    secondary: {
      main: '#031D31',
    }
  },
  headerFont:{
    fontFamily: 
    "'Krona One', sans-serif",
  },
  typography: {
    fontFamily:
    "'Open Sans', sans-serif",
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        '@font-face': [OpenSans],
      },
    },
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
    <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
