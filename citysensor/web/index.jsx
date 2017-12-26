import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';
import {
  MuiThemeProvider,
  createMuiTheme,
} from 'material-ui/styles';
import themeStyles from './styles/muiTheme';

import Main from './routes/Main';

const App = () => (
  <MuiThemeProvider theme={createMuiTheme(themeStyles)}>
    <BrowserRouter>
      <Main />
    </BrowserRouter>
  </MuiThemeProvider>
);

ReactDOM.render(<App />, document.getElementById('app'));
