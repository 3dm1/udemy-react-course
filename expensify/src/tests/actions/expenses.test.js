import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startAddExpense, createExpense, editExpense, startEditExpense, removeExpense, startRemoveExpense, setExpenses, startSetExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import database from '../../firebase/firebase';

const uid = 'myMockTestUid';
const defaultAuthState = { auth : { uid } };
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
  const expensesData = {};
  expenses.forEach(({ id, description, note, amount, createdAt }) => {
    expensesData[id] = { description, note, amount, createdAt};
  })
  database.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

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
});

test('should edit expense in database and dispatch action', (done) => {
  const store = createMockStore(defaultAuthState);
  const note = 'This is a note for the 2nd expense';
  const expenseUpdate = {
    ...expenses[1],
    note
  }
  store.dispatch(startEditExpense(expenses[1].id, expenseUpdate)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'EDIT_EXPENSE',
      update: expenseUpdate,
      id: expenses[1].id
    });
    return database.ref(`users/${uid}/expenses/${expenses[1].id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseUpdate);
    done();
  });
});

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
  const store = createMockStore(defaultAuthState);
  const expenseData = {
    description: 'Mouse',
    amount: 3000,
    note: 'This one is better',
    createdAt: 109500
  }
  store.dispatch(startAddExpense(expenseData)).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'ADD_EXPENSE',
      expense: {
          id: expect.any(String),
          ...expenseData
      }
    });
    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseData);
    done();
  });
});

test('should add expense with defaults to database and store', (done) => {
  const store = createMockStore(defaultAuthState);
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

    return database.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value')
  }).then((snapshot) => {
    expect(snapshot.val()).toEqual(expenseDefault);
    done();
  });
});

test('should setup set expense action object with data', () => {
  const action = setExpenses(expenses);
  expect(action).toEqual({
    type: 'SET_EXPENSES',
    expenses
  });
});

test('should fetch the expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startSetExpenses()).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'SET_EXPENSES',
      expenses
    });
    done();
  })
});

test('should remove expenses from firebase', (done) => {
  const store = createMockStore(defaultAuthState);
  store.dispatch(startRemoveExpense({id: '1'})).then(() => {
    const actions = store.getActions();
    expect(actions[0]).toEqual({
      type: 'REMOVE_EXPENSE',
      id: '1'
    });
    return database.ref(`users/${uid}/expenses/1`).once('value');
  }).then((snapshot) => {
    expect(snapshot.val()).toBeNull();
    done();
  })
});
