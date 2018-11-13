import handleDeepLink from './deepLink';

describe('Deep Link Handler', () => {
  const navigation = {
    navigate: jest.fn(),
  };

  it('does not call navigate function if given url is falsy', () => {
    const url = '';
    handleDeepLink(url, navigation);
    expect(navigation.navigate).toHaveBeenCalledTimes(0);
  });

  it('does not call navigate function if given url path is not handled', () => {
    const url = 'lisk://test';
    handleDeepLink(url, navigation);
    expect(navigation.navigate).toHaveBeenCalledTimes(0);
  });

  it('handles request LSK urls', () => {
    const url = 'lisk://wallet?recipient=16441330428379804182L&amount=10';
    const expectedNavigateArguments = ['Send', {
      query: {
        address: '16441330428379804182L',
        amount: '10',
      },
    }];

    handleDeepLink(url, navigation);
    expect(navigation.navigate).toBeCalledWith(...expectedNavigateArguments);
  });
});
