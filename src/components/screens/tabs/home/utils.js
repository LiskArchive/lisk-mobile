import ModalHolder from '../../../../utilities/modal';
import IntroModal from './introModal';
import { tokenMap } from '../../../../constants/tokens';
import { fromRawLsk } from '../../../../utilities/conversions';
import InitializationModal from './initializationModal';

export const showIntroModal = ({ btcIntroShown, settingsUpdated }) => {
  if (!btcIntroShown) {
    ModalHolder.open({
      title: 'We’ve got good news!',
      component: IntroModal,
    });
    settingsUpdated({ btcIntroShown: true });
  }
};

export const loadMore = ({
  activeToken,
  account,
  transactionsLoaded,
  transactions,
}) => {
  if (account[activeToken]) {
    transactionsLoaded({
      address: account[activeToken].address,
      offset: transactions.confirmed.length,
    });
  }
};

export const showInitializationModal = ({
  account, activeToken, transactions, navigation
}) => {
  const balance = parseFloat(fromRawLsk(account[tokenMap.LSK.key].balance));

  if (
    activeToken === tokenMap.LSK.key
    && !account[activeToken].initialized
    && (!transactions || transactions.pending.length < 1)
    && balance >= 0.2
  ) {
    ModalHolder.open({
      title: 'Initialize your account',
      component: InitializationModal,
      callback: () =>
        navigation.navigate({ name: 'Send', params: { initialize: true } }),
    });
  }
};

export const resetTxAndFetch = ({
  transactionsReset,
  transactionsLoaded,
  account,
  activeToken,
}) => {
  transactionsReset();
  // giving some time for the transition animations to settle
  transactionsLoaded({
    address: account[activeToken].address,
    offset: 0,
  });
};
