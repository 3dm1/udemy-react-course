import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import expenseReducer from '../reducers/expenses';
import filterReducer from '../reducers/filters';

export default () => {
  const store = createStore(
    combineReducers({
        expenses: expenseReducer,
        filters: filterReducer
    }),
    applyMiddleware(thunk)
  );
  return store;
}
