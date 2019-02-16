import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import AppRouter from './routers/AppRouter';
import configureStore from './store/configureStore';
import 'normalize.css/normalize.css';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import './styles/styles.scss';

import { createExpense } from './actions/expenses';
import { setText } from './actions/filters';

const store = configureStore();
store.dispatch(createExpense({
  description: 'stuff',
  amount: 10500,
  createdAt: -10
}));
store.dispatch(createExpense({
  description: 'new stuff',
  amount: 937,
  createdAt: 100
}));
store.dispatch(createExpense({
  description: 'other stuff',
  amount: 100000,
  createdAt: 1000
}));
// store.dispatch(setText('query'));
console.log(store.getState());

const jsx = (
  <Provider store={store}>
    <AppRouter />
  </Provider>
);

ReactDOM.render(jsx, document.getElementById('app'));
