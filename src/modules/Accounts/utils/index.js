import moment from 'moment';

export const getPendingTime = (unvoteHeight, unlockHeight) => {
  const awaitingBlocks = unlockHeight - unvoteHeight;
  const secondsToUnlockAllBalance = awaitingBlocks * 10;
  const momentSeconds = moment().second(secondsToUnlockAllBalance);
  return moment().to(momentSeconds, true);
};
