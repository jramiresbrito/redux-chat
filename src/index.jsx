// External modules
import React from 'react';
import ReactDOM from 'react-dom';
import {
  createStore, combineReducers, applyMiddleware, compose
} from 'redux';
import { Provider } from 'react-redux';
import { logger } from 'redux-logger';
import reduxPromise from 'redux-promise';
import {
  Router, Route, Redirect, Switch
} from 'react-router-dom';
import { createBrowserHistory } from 'history';

// Internal modules
import App from './components/app';
import '../assets/stylesheets/application.scss';

// State and reducers
import messagesReducer from './reducers/messages_reducer';

const history = createBrowserHistory();

const identityReducer = (state = null) => state;

const initialState = {
  messages: [],
  channels: ['general', 'react', 'belo horizonte'],
  currentUser: `anonymous${Math.floor(10 + (Math.random() * 90))}`
};

const reducers = combineReducers({
  messages: messagesReducer,
  channels: identityReducer,
  currentUser: identityReducer
});

// Redux Chrome extension to help debug
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const devMiddlewares = composeEnhancers(applyMiddleware(logger, reduxPromise));
const prodMiddlewares = applyMiddleware(reduxPromise);
const devStore = createStore(reducers, initialState, devMiddlewares);
const prodStore = createStore(reducers, initialState, prodMiddlewares);

if (process.env.NODE_ENV === 'development') {
  ReactDOM.render(
    <Provider store={devStore}>
      <Router history={history}>
        <Switch>
          <Route path="/:channel" component={App} />
          <Redirect from="/" to="/general" />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
} else {
  ReactDOM.render(
    <Provider store={prodStore}>
      <Router history={history}>
        <Switch>
          <Route path="/:channel" component={App} />
          <Redirect from="/" to="/general" />
        </Switch>
      </Router>
    </Provider>,
    document.getElementById('root')
  );
}
