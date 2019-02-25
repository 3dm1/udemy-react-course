import { login, logout } from '../../actions/auth';

test('should generate login action', () => {
  const action = login('my_uid');
  expect(action).toEqual({
    type: 'LOGIN',
    uid: 'my_uid'
  });
});

test('should generate logout action', () => {
  const action = logout();
  expect(action).toEqual({
    type: 'LOGOUT'
  });
});
