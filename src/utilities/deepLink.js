import URL from 'url-parse';

export default function handleDeepLink(deepLink, navigation) {
  if (!deepLink) {
    return;
  }

  const url = new URL(deepLink, true);
  const path = url.hostname;

  switch (path) {
    case 'wallet':
      navigation.navigate('Send', { address: url.query.recipient, amount: url.query.amount });
      break;

    default:
      break;
  }
}
