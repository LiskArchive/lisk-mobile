/* eslint-disable complexity */
import React from 'react';

import { useTheme } from 'contexts/ThemeContext';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import TransactionSvg from 'assets/svgs/TransactionSvg';
import { MODULE_COMMAND_NAMES } from '../constants';
import getTransactionRowStyles from '../components/TransactionRow/styles';

/**
 * Allows to get all the necessary UI assets of a transaction (based on it's type) to
 * render it (images, styles, among others).
 * @param {Object} transaction - The transaction object to get the assets from.
 * @returns {Object} - The assets of the transaction.
 */
export function useTransactionAssets({ transaction, style }) {
  const [currentAccount] = useCurrentAccount();

  const { styles } = useTheme({
    styles: getTransactionRowStyles(),
  });

  let assets = {
    icon: <TransactionSvg moduleCommand={transaction.moduleCommand} style={style?.icon} />,
  };

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
      };
      break;

    case MODULE_COMMAND_NAMES.tokenCrossChaintransfer:
      assets = {
        ...assets,
        type: 'tokenCrossChaintransfer',
        title: 'Cross-chain Transfer',
      };
      break;

    case MODULE_COMMAND_NAMES.registerMultisignatureGroup:
      assets = {
        ...assets,
        type: 'registerMultisignatureGroup',
        title: 'Register multisignature group',
      };
      break;

    case MODULE_COMMAND_NAMES.registerDelegate:
      assets = {
        ...assets,
        type: 'registerDelegate',
        title: 'Delegate registration',
      };
      break;

    case MODULE_COMMAND_NAMES.reportDelegateMisbehavior:
      assets = {
        ...assets,
        type: 'reportDelegateMisbehavior',
        title: 'Report Delegate Misbehavior',
      };
      break;

    case MODULE_COMMAND_NAMES.unlockToken:
      assets = {
        ...assets,
        type: 'unlockToken',
        title: 'Unlock',
      };
      break;

    case MODULE_COMMAND_NAMES.updateGeneratorKey:
      assets = {
        ...assets,
        type: 'updateGeneratorKey',
        title: 'Update Generator Key',
      };
      break;

    case MODULE_COMMAND_NAMES.voteDelegate:
      assets = {
        ...assets,
        type: 'voteDelegate',
        title: 'Vote',
      };
      break;

    case MODULE_COMMAND_NAMES.reclaimLSK:
      assets = {
        ...assets,
        type: 'reclaimLSK',
        title: 'Reclaim LSK',
      };
      break;

    case MODULE_COMMAND_NAMES.registerkeys:
      assets = {
        ...assets,
        type: 'registerkeys',
        title: 'Register keys',
      };
      break;

    default:
      break;
  }

  return assets;
}
