import URL from 'url-parse';

export default function deepLinkMapper(deepLinkURL) {
  if (!deepLinkURL) {
    return null;
  }

  const { hostname, pathname, query } = new URL(deepLinkURL, true);
  const path = hostname === 'main' ? `main${pathname}` : hostname;

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
