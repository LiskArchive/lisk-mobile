import URL from 'url-parse';
import { tokenMap } from 'constants/tokens';

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
        name: 'TransactionDetails',
        params: {
          transactionId: query.id,
        },
      };

    case 'home':
      return {
        name: 'Home',
        params: {
          discreet: query.discreet,
        },
      };

    default:
      return null;
  }
}
