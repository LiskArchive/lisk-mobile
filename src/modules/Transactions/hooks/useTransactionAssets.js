/* eslint-disable complexity */
import { themes } from 'constants/styleGuide';
import { useTheme } from 'hooks/useTheme';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';

import setSecondPassphraseLight from 'assets/images/txDetail/second-passphrase-light.png';
import setSecondPassphraseDark from 'assets/images/txDetail/second-passphrase-dark.png';
import registerDelegateLight from 'assets/images/txDetail/delegate-registration-light.png';
import registerDelegateDark from 'assets/images/txDetail/delegate-registration-dark.png';
import voteLight from 'assets/images/txDetail/vote-light.png';
import voteDark from 'assets/images/txDetail/vote-dark.png';
import transferDark from 'assets/images/txDetail/transfer-dark.png';
import transferLight from 'assets/images/txDetail/transfer-light.png';
import txUnlockLight from 'assets/images/txDetail/tx-unlock.png';
import txUnlockDark from 'assets/images/txDetail/tx-unlock-dark.png';
import txUnknownLight from 'assets/images/txDetail/tx-unknown-light.png';
import txUnknownDark from 'assets/images/txDetail/tx-unknown-dark.png';
import { MODULE_COMMAND_NAMES } from '../constants';
import getTransactionRowStyles from '../components/TransactionRow/styles';

export function useTransactionAssets(transaction) {
  const [currentAccount] = useCurrentAccount();

  const { styles, theme } = useTheme({
    styles: getTransactionRowStyles(),
  });

  let assets = {};

  if (transaction.moduleCommand === MODULE_COMMAND_NAMES.tokenTransfer) {
    if (currentAccount.metadata.address !== transaction.sender.address) {
      assets = {
        ...assets,
        amount: {
          style: [styles.incomingAmount, styles.theme.incomingAmount],
          sign: '',
        },
      };
    } else {
      assets = {
        ...assets,
        amount: {
          style: [styles.outgoingAmount, styles.theme.outgoingAmount],
          sign: '-',
        },
      };
    }
  }

  switch (transaction.moduleCommand) {
    case MODULE_COMMAND_NAMES.tokenTransfer:
      assets = {
        ...assets,
        type: 'tokenTransfer',
        title: 'Token Transfer',
        image: theme === themes.light ? transferLight : transferDark,
      };
      break;

    case MODULE_COMMAND_NAMES.tokenCrossChaintransfer:
      assets = {
        ...assets,
        type: 'tokenCrossChaintransfer',
        title: 'Cross-chain Transfer',
        image: theme === themes.light ? transferLight : transferDark,
      };
      break;

    case MODULE_COMMAND_NAMES.registerMultisignatureGroup:
      assets = {
        ...assets,
        type: 'registerMultisignatureGroup',
        title: 'Register multisignature group',
        image: theme === themes.light ? setSecondPassphraseLight : setSecondPassphraseDark,
      };
      break;

    case MODULE_COMMAND_NAMES.registerDelegate:
      assets = {
        ...assets,
        type: 'registerDelegate',
        title: 'Delegate registration',
        image: theme === themes.light ? registerDelegateLight : registerDelegateDark,
      };
      break;

    case MODULE_COMMAND_NAMES.reportDelegateMisbehavior:
      assets = {
        ...assets,
        type: 'reportDelegateMisbehavior',
        title: 'Report Delegate Misbehavior',
        // TODO: Add custom image.
        image: theme === themes.light ? txUnknownLight : txUnknownDark,
      };
      break;

    case MODULE_COMMAND_NAMES.unlockToken:
      assets = {
        ...assets,
        type: 'unlockToken',
        title: 'Unlock',
        image: theme === themes.light ? txUnlockLight : txUnlockDark,
      };
      break;

    case MODULE_COMMAND_NAMES.updateGeneratorKey:
      assets = {
        ...assets,
        type: 'updateGeneratorKey',
        title: 'Update Generator Key',
        // TODO: Add custom image.
        image: theme === themes.light ? txUnknownLight : txUnknownDark,
      };
      break;

    case MODULE_COMMAND_NAMES.voteDelegate:
      assets = {
        ...assets,
        type: 'voteDelegate',
        title: 'Vote',
        image: theme === themes.light ? voteLight : voteDark,
      };
      break;

    case MODULE_COMMAND_NAMES.reclaimLSK:
      assets = {
        ...assets,
        type: 'reclaimLSK',
        title: 'Reclaim LSK',
        // TODO: Add custom image.
        image: theme === themes.light ? txUnknownLight : txUnknownDark,
      };
      break;

    case MODULE_COMMAND_NAMES.registerkeys:
      assets = {
        ...assets,
        type: 'registerkeys',
        title: 'Register keys',
        // TODO: Add custom image.
        image: theme === themes.light ? registerDelegateLight : registerDelegateDark,
      };
      break;

    default:
      break;
  }

  return assets;
}
