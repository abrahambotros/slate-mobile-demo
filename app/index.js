import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import promiseMiddleware from 'redux-promise';
import thunkMiddleware from 'redux-thunk';
import Reducers from './reducer';
import Route from './route';

const createStoreWithMiddleware = applyMiddleware(
    promiseMiddleware,
    thunkMiddleware,
)(createStore);
const store = createStoreWithMiddleware(Reducers);

export default class App extends Component {

  render() {
    return (
      <Provider store={store}>
        <Route />
      </Provider>
    );
  }
}
