import URL from 'url-parse';

export default function handleDeepLink(deepLink, navigation) {
  if (!deepLink) {
    return;
  }

  const { hostname: path, query } = new URL(deepLink, true);

  switch (path) {
    case 'wallet':
      navigation.navigate('Send', { query: { address: query.recipient, amount: query.amount } });
      break;

    default:
      break;
  }
}
