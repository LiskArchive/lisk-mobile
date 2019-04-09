import URL from 'url-parse';
import { tokenMap } from '../constants/tokens';

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
          activeToken: tokenMap.LSK.key,
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
      };

    case 'transactions':
      return {
        name: 'TxDetail',
        params: {
          activeToken: tokenMap.LSK.key,
          txId: query.id,
        },
      };

    default:
      return null;
  }
}
