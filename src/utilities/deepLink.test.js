import deepLinkMapper from './deepLink';

describe('Deep Link Handler', () => {
  it('returns null if given url is falsy', () => {
    expect(deepLinkMapper('')).toBeNull();
  });

  it('returns null if given url path is not mapped', () => {
    expect(deepLinkMapper('lisk://test')).toBeNull();
  });

  it('handles urls with /transactions/send path', () => {
    const url = 'lisk://main/transactions/send?recipient=1L&amount=1';
    const expectedResult = {
      name: 'Send',
      params: {
        query: {
          address: '1L',
          amount: '1',
        },
      },
    };

    expect(deepLinkMapper(url)).toMatchObject(expectedResult);
  });

  it('handles urls starting with wallet', () => {
    const url = 'lisk://wallet?recipient=1L&amount=1';
    const expectedResult = {
      name: 'Send',
      params: {
        query: {
          address: '1L',
          amount: '1',
        },
      },
    };

    expect(deepLinkMapper(url)).toMatchObject(expectedResult);
  });
});
