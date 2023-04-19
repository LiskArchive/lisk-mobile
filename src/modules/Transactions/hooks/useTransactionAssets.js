/* eslint-disable complexity */
import React from 'react';

import { useTheme } from 'contexts/ThemeContext';
import TransactionSvg from 'assets/svgs/TransactionSvg';
import { MODULE_COMMANDS_NAMES } from '../constants';
import getTransactionRowStyles from '../components/TransactionRow/TransactionRow.styles';

/**
 * Allows to get all the necessary UI assets of a transaction (based on it's type) to
 * render it (images, styles, among others).
 * @param {Object} transaction - The transaction object to get the assets from.
 * @returns {Object} - The assets of the transaction.
 */
export function useTransactionAssets({ transaction, style, address }) {
  const { styles } = useTheme({
    styles: getTransactionRowStyles(),
  });

  let assets = {
    type: transaction.moduleCommand,
    title: MODULE_COMMANDS_NAMES[transaction.moduleCommand],
    icon: <TransactionSvg moduleCommand={transaction.moduleCommand} style={style?.icon} />,
  };

  if (
    transaction.moduleCommand === 'token:transfer' ||
    transaction.moduleCommand === 'token:transferCrossChain'
  ) {
    if (address !== transaction.sender.address) {
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

  return assets;
}
