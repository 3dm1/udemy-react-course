import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export const ExpenseSummary = ({ expenseCount, expenseTotal }) => {
  const expenseWord = expenseCount > 1 ? 'expenses' : 'expense';
  const formattedTotal = numeral(expenseTotal / 100).format('$0,0.00');

  return (
    <div className="page-header">
      <div className="content-container">
        <h1 className="page-header__title">
          {
            expenseCount == 0 ?
            <div>No expenses found</div> :
            <div>Viewing <span>{expenseCount}</span> {expenseWord} totalling <span>{formattedTotal}</span></div>
          }
        </h1>
        <div className="page-header__actions">
          <Link className="button" to="/create">Add Expense</Link>
        </div>
      </div>
    </div>
  )
};

const mapStateToProps = ({ expenses, filters }) => {
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  return {
    expenseCount : visibleExpenses.length,
    expenseTotal : selectExpensesTotal(visibleExpenses)
  }
}


export default connect(mapStateToProps)(ExpenseSummary)
