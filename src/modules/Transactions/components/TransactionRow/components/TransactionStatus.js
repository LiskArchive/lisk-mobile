import React from 'react';

import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import CheckSvg from 'assets/svgs/CheckSvg';
import SandClockSvg from 'assets/svgs/SandClockSvg';

export function TransactionStatus({ transaction }) {
  let children = null;

  const props = { height: 14, width: 14 };

  switch (transaction.executionStatus) {
    case 'success':
      children = <CheckSvg {...props} />;
      break;

    case 'pending':
      children = <SandClockSvg {...props} />;
      break;

    case 'fail':
      children = <CircleCrossedSvg {...props} />;
      break;

    default:
      break;
  }

  return children;
}
