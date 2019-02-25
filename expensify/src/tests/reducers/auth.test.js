import authReducer from '../../reducers/auth';

test('should set default state', () => {
  const state = authReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual({});
});

test('should set uid when logging in', () => {
  const state = authReducer({}, { type: 'LOGIN', uid: 'uid' });
  expect(state).toEqual({
    uid: 'uid'
  });
});

test('should clear state when logging out', () => {
  const state = authReducer({ uid: 'any_uid' }, { type: 'LOGOUT'});
  expect(state).toEqual({});
});
