import { isRegistration, isTransfer, isVote } from 'modules/SendToken/constants';
import { stringShortener } from 'utilities/helpers';

export const goToWallet = (address, { navigation, account }) => {
  if (
    address !== account.address
    && address !== 'Unparsed Address'
  ) {
    navigation.navigate({ key: address, name: 'Wallet', params: { address } });
  }
};

export const getAccountLabel = (
  address,
  {
    t, followedAccounts, activeToken, truncate
  }
) => {
  if (address === 'Unparsed Address') {
    return t('Unparsed Address');
  }

  const followedAccount = followedAccounts[activeToken]?.find(
    a => a.address === address
  );
  if (followedAccount) {
    return followedAccount.label;
  }
  if (truncate) {
    return stringShortener(address, 6, 5);
  }

  return address;
};

export const getAccountTitle = tx => {
  if (isVote(tx)) return 'Voter';
  if (isRegistration(tx)) return 'Registrant';
  if (!isTransfer(tx) || tx.recipientAddress === tx.senderAddress) { return 'Account address'; }
  return 'Sender';
};
