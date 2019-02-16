import React from 'react';
import { Link } from 'react-router-dom';

export const ExpenseListItem = ({ expense }) => (
  <div>
    <Link to={`/edit/${expense.id}`}>
      <h3>{expense.description}</h3>
    </Link>
    <p>{expense.amount} - {expense.createdAt}</p>
  </div>
);

export default ExpenseListItem;
