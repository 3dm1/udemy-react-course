import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseSummary } from '../../components/ExpenseSummary';

test('should render correctly with no visible expenses', () => {
  const wrapper = shallow(
    <ExpenseSummary
      expenseCount={0}
      expenseTotal={0}
    />);
    expect(wrapper).toMatchSnapshot();
});

test('should render correctly with a single expense', () => {
  const wrapper = shallow(
    <ExpenseSummary
      expenseCount={1}
      expenseTotal={1295}
    />);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with multiple expenses', () => {
  const wrapper = shallow(
    <ExpenseSummary
      expenseCount={7}
      expenseTotal={9425}
    />);
  expect(wrapper).toMatchSnapshot();
});
