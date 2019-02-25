import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';
import authReducer from '../reducers/auth';

export default () => {
  const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filterReducer,
        auth: authReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
}
