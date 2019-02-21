import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, createExpense, editExpense, removeExpense } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);

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
  const action = createExpense(expenses[2]);
  expect(action).toEqual({
    type: 'ADD_EXPENSE',
    expense: expenses[2]
  });
})

test('should add expense to database and store', (done) => {
  const store = createMockStore({});
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 109500
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    try {
      expect(actions[0]).toEqual({
        type: 'ADD_EXPENSE',
        expense: {
            id: expect.any(String),
            ...expenseData
        }
      });
    } catch (e) {
      done.fail(e);
    }
    return database.ref(`expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', () => {
  const store = createMockStore({});
  const expenseDefault = {
    description: '',
    note: '',
    amount: 0,
    createdAt: 0
  }
  store.dispatch(startAddExpense()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
          id: expect.any(String),
          ...expenseDefault
      }
    });

    return database.ref(`expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});
