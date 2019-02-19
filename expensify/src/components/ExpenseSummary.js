import React from 'react';
import { connect } from 'react-redux';
import numeral from 'numeral';
import getVisibleExpenses from '../selectors/expenses';
import selectExpensesTotal from '../selectors/expenses-total';

export class ExpenseSummary extends React.Component {

  render() {
    const formattedTotal = numeral(this.props.expenseTotal / 100).format('$0,0.00');
    let message;
    switch (this.props.expenseCount) {
      case 0:
        message = 'No expenses found';
        break;
      case 1:
        message = `Viewing ${this.props.expenseCount} expense totalling ${formattedTotal}`;
        break;
      default:
        message = `Viewing ${this.props.expenseCount} expenses totalling ${formattedTotal}`;
    }

    return (
      <div>
        <h1>{message}</h1>
      </div>
    )
  }
};

const mapStateToProps = ({ expenses, filters }) => {
  const visibleExpenses = getVisibleExpenses(expenses, filters);
  return {
    expenseCount : visibleExpenses.length,
    expenseTotal : selectExpensesTotal(visibleExpenses)
  }
}


export default connect(mapStateToProps)(ExpenseSummary)
