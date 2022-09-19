import moment from 'moment';
import ModalHolder from 'utilities/modal';
import { tokenMap } from 'constants/tokens';
import { fromRawLsk } from 'utilities/conversions';
import { InitializationModal, IntroModal } from '../components';

export const showIntroModal = ({ btcIntroShown, settingsUpdated }) => {
  if (!btcIntroShown) {
    ModalHolder.open({
      title: 'We’ve got good news!',
      component: IntroModal,
    });
    settingsUpdated({ btcIntroShown: true });
  }
};

export const loadMore = ({ address, transactionsLoaded, transactions }) => {
  if (address) {
    transactionsLoaded({
      address,
      offset: transactions.confirmed.length,
    });
  }
};

export const showInitializationModal = ({ account, activeToken, transactions, navigation }) => {
  const balance = parseFloat(fromRawLsk(account[tokenMap.LSK.key].balance));

  if (
    activeToken === tokenMap.LSK.key &&
    !account[activeToken].initialized &&
    (!transactions || transactions.pending?.length < 1) &&
    balance >= 0.2
  ) {
    ModalHolder.open({
      title: 'Initialize your account',
      component: InitializationModal,
      callback: () => navigation.navigate({ name: 'Send', params: { initialize: true } }),
    });
  }
};

export const resetTxAndFetch = ({ transactionsReset, transactionsLoaded, address }) => {
  transactionsReset();
  // giving some time for the transition animations to settle
  transactionsLoaded({
    address,
    offset: 0,
  });
};

export const getPendingTime = (unvoteHeight, unlockHeight) => {
  const awaitingBlocks = unlockHeight - unvoteHeight;
  const secondsToUnlockAllBalance = awaitingBlocks * 10;
  const momentSeconds = moment().second(secondsToUnlockAllBalance);
  return moment().to(momentSeconds, true);
};
