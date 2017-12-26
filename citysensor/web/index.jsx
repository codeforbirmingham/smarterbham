import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom';

import Main from './routes/Main';

const App = () => (
  <BrowserRouter>
    <Main />
  </BrowserRouter>
);

ReactDOM.render(<App />, document.getElementById('app'));
