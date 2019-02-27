import React from 'react';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Login, Trainee, TextFieldDemo, InputDemo, ChildrenDemo, NoMatch } from './pages';
import theme from './theme';
import { AuthRoutes, PrivateRoutes } from './routes';

const App = () => (
  <MuiThemeProvider theme={theme}>
    <Router>
      <Switch>
        <AuthRoutes exact path="/login" component={Login} />
        <PrivateRoutes exact path="/" component={Trainee} />
        <PrivateRoutes path="/text-field-demo" component={TextFieldDemo} />
        <PrivateRoutes exact path="/input-demo" component={InputDemo} />
        <PrivateRoutes exact path="/children-demo" component={ChildrenDemo} />
        <PrivateRoutes component={NoMatch} />
      </Switch>
    </Router>
  </MuiThemeProvider>
);


export default App;
