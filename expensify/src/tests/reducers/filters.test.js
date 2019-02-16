import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
  const state = filtersReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'date'
  })
});

test('should set sortBy to amount', () => {
  const state = filtersReducer(undefined, {type: 'SORT_BY_AMOUNT'});
  expect(state.sortBy).toBe('amount');
});

test('should set sortBy to date', () => {
  const initialState = {
    text: '',
    startDate: moment().startOf('month'),
    endDate: moment().endOf('month'),
    sortBy: 'amount'
  };
  const state = filtersReducer(initialState , {type: 'SORT_BY_DATE'});
  expect(state.sortBy).toBe('date');
});

test('should set text', () => {
  const state = filtersReducer(undefined , {type: 'SET_TEXT', text: 'query'});
  expect(state.text).toBe('query');
});

test('should set startDate', () => {
  const state = filtersReducer(undefined , {type: 'SET_START_DATE', startDate: moment().add(40, 'days').startOf('month')});
  expect(state.startDate).toEqual(moment().add(40, 'days').startOf('month'));
});

test('should set endDate', () => {
  const state = filtersReducer(undefined , {type: 'SET_END_DATE', endDate: moment().add(40, 'days').startOf('month')});
  expect(state.endDate).toEqual(moment().add(40, 'days').startOf('month'));
});
