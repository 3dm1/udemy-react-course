import React from 'react';
import { connect } from 'react-redux';
import ExpenseForm from './ExpenseForm';
import { createExpense } from '../actions/expenses';

export class AddExpensePage extends React.Component {
  createExpense = (expense) => {
    this.props.createExpense(expense)
    this.props.history.push('/');
  }

  render() {
    return (
      <div>
        This is from the expense component
        <ExpenseForm onSubmit= {this.createExpense} />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  createExpense: (expense) => dispatch(createExpense(expense))
});

export default connect(undefined, mapDispatchToProps)(AddExpensePage);
