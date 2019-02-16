import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setText, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
  setText = jest.fn();
  sortByDate = jest.fn();
  sortByAmount = jest.fn();
  setStartDate = jest.fn();
  setEndDate = jest.fn();
  wrapper = shallow(
    <ExpenseListFilters
      filters={filters}
      setText={setText}
      sortByDate={sortByDate}
      sortByAmount={sortByAmount}
      setStartDate={setStartDate}
      setEndDate={setEndDate}
    />
  );
});

test('should render ExpenseListFilters correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ExpenseListFilters with alt data correctly', () => {
  wrapper.setProps({ filters : altFilters});
  expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
  const text = 'text';
  wrapper.find('input').simulate('change', {
    target: { value : text }
  });
  expect(setText).toHaveBeenLastCalledWith(text);
})

test('should handle dates change', () => {
  const startDate = moment(0).subtract(1, 'days');
  const endDate = moment(0).add(10, 'days');
  wrapper.find('withStyles(DateRangePicker)').prop('onDatesChange')({startDate, endDate});
  expect(setStartDate).toHaveBeenLastCalledWith(startDate);
  expect(setEndDate).toHaveBeenLastCalledWith(endDate);
});

test('should handle sort by date', () => {
  wrapper.find('select').simulate('change', {
    target: { value : 'date'}
  });
  expect(sortByDate).toHaveBeenCalled();
});

test('should handle sort by amount', () => {
  wrapper.find('select').simulate('change', {
    target: { value : 'amount'}
  });
  expect(sortByAmount).toHaveBeenCalled();
});

test('should handle focus change', () => {
  const focused = 'startDate';
  wrapper.find('withStyles(DateRangePicker)').prop('onFocusChange')(focused);
  expect(wrapper.state('calendarFocused')).toEqual(focused);
});
