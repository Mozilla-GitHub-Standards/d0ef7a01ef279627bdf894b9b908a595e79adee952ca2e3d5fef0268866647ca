import React from 'react';
import { Provider } from 'react-redux';

import App from 'lib/components/app';
import dataStore from 'lib/data-store';

React.render((
  <Provider store={dataStore}>
    {() =>  <App/>}
  </Provider>
), document.getElementById('app'));
