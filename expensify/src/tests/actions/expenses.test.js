import { createExpense, editExpense, removeExpense } from '../../actions/expenses';

test('should setup remove expense action object', () => {
  const action = removeExpense({ id:'123abc' });
  expect(action).toHaveProperty('type', 'REMOVE_EXPENSE');
  expect(action).toHaveProperty('id', '123abc');
})

test('should setup edit expense action object', () => {
  const action = editExpense('id1234', {note: 'stuff'});
  expect(action).toEqual({
    type: 'EDIT_EXPENSE',
    id: 'id1234',
    update: {
      note: 'stuff'
    }
  });
})

test('should setup create expense action object with provided values', () => {
  const expenseData = {
    description: 'Rent',
    amount: 109500,
    createdAt: 1000,
    note: 'This was last months rent'
  };
  const action = createExpense(expenseData);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      ...expenseData,
      id: expect.any(String)
    }
  })
})

test('should setup create expense action object with default values', () => {
  const action = createExpense();
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: {
      description : '',
      note : '',
      amount : 0,
      createdAt : 0,
      id: expect.any(String)
    }
  })
})
