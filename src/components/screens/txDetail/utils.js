import { Linking } from 'react-native';
import { isRegistration, isTransfer, isVote } from '../../../constants/transactions';
import { getTransactionExplorerURL } from '../../../utilities/api/btc/transactions';

export const goToWallet = (address, { navigation, account, activeToken }) => {
  if (
    address !== account[activeToken].address
    && address !== 'Unparsed Address'
  ) {
    navigation.navigate({ name: 'Wallet', params: { address } });
  }
};

export const getAccountLabel = (address, { t, followedAccounts, activeToken }) => {
  if (address === 'Unparsed Address') {
    return t('Unparsed Address');
  }

  const followedAccount = followedAccounts[activeToken].find(
    a => a.address === address
  );
  if (followedAccount) {
    return followedAccount.label;
  }

  return address;
};

export const openExplorer = (id) => {
  Linking.openURL(getTransactionExplorerURL(id))
    // eslint-disable-next-line no-console
    .catch(err => console.error('An error occurred', err));
};

export const getAccountTitle = tx => {
  if (isVote(tx)) return 'Voter';
  if (isRegistration(tx)) return 'Registrant';
  if (!isTransfer(tx) || tx.recipientAddress === tx.senderAddress) { return 'Account address'; }
  return 'Sender';
};
