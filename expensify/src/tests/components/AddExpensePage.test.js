import React from 'react';
import { shallow } from 'enzyme';
import { AddExpensePage } from '../../components/AddExpensePage';
import expenses from '../fixtures/expenses';

let createExpense, history, wrapper;

beforeEach(() => {
  createExpense = jest.fn();
  history = { push: jest.fn() };
  wrapper = shallow(<AddExpensePage createExpense={ createExpense } history={ history } />)
});

test('should render AddExpensePage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle createExpense', () => {
  wrapper.find('ExpenseForm').prop('onSubmit')(expenses[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
  expect(createExpense).toHaveBeenLastCalledWith(expenses[1]);
});
