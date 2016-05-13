import ReactDOM from 'react-dom';
import React from 'react';

import 'bootstrap-loader';
import 'styles/core.scss';

import makeRoutes from './routes';
import history from './routes/history';
import Root from './containers/Root';

const routes = makeRoutes();

// Now that redux and react-router have been configured, we can render the
// React application to the DOM!
ReactDOM.render(
  <Root history={history} routes={routes} />,
  document.getElementById('root')
);
