import socketMiddleware from './socket';

describe('Middleware: Accounts', () => {
  const next = jest.fn();

  it('should pass the action', () => {
    const action = { type: 'ANY_ACTION' };
    socketMiddleware()(next)(action);
    expect(next).toBeCalledWith(action);
  });
});
