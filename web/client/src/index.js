import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import AppFrame from './components/AppFrame';
import TestBlock from './components/TestBlock';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from './reducers';

import 'babel-core/register';
import 'babel-polyfill';

const middleware = [thunk];

if (typeof devToolsExtension === 'object') {
  middleware.push(devToolsExtension)
}

const store = compose(
  applyMiddleware(...middleware),
  devToolsExtension ? devToolsExtension() : f => f
)(createStore)(rootReducer)

ReactDOM.render(
  <Provider store={ store }>
    <AppContainer>
      <AppFrame>
        <div></div>
        <TestBlock />
      </AppFrame>
    </AppContainer>
  </Provider>,
  document.getElementById('root')
);
