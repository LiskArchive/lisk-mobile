import URL from 'url-parse';

export function parseDeepLink(deepLinkURL) {
  const { hostname, pathname, query } = new URL(deepLinkURL, true);
  const path = hostname === 'main' ? `main${pathname}` : hostname;
  return { path, query };
}

export default function deepLinkMapper(deepLinkURL) {
  if (!deepLinkURL) {
    return null;
  }

  const { path, query } = parseDeepLink(deepLinkURL);

  switch (path) {
    case 'wallet':
    case 'main/transactions/send':
      return {
        name: 'Send',
        params: {
          query: {
            address: query.recipient,
            amount: query.amount,
            reference: query.reference,
          },
        },
      };

    case 'request':
      return {
        name: 'Request',
        params: {},
      };

    case 'transactions':
      return {
        name: 'TxDetail',
        params: {
          txId: query.id,
        },
      };

    default:
      return null;
  }
}
