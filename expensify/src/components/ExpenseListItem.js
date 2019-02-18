import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

export const ExpenseListItem = ({ expense }) => (
  <div>
    <Link to={`/edit/${expense.id}`}>
      <h3>{expense.description}</h3>
    </Link>
    <p>
      {numeral(expense.amount / 100).format('$0,0.00')}
      -
      {moment(expense.createdAt).format('MMMM Do, YYYY')}
    </p>
  </div>
);

export default ExpenseListItem;
