import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
// import { Trainee } from './pages';
import Login from './pages/Login/Login';
import theme from './theme';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Login />
    {/* <Trainee /> */}
  </MuiThemeProvider>
);

export default App;
