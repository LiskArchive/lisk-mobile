import React from 'react';
import moment from 'moment';

import FormattedDate from 'components/shared/formattedDate';
import { P } from 'components/shared/toolBox/typography';

export default function TransactionTimestamp({
  timestamp,
  styles,
  format = 'MMM D, YYYY LTS',
  transformer = moment.unix,
}) {
  return (
    <FormattedDate
      transformer={transformer}
      format={format}
      type={P}
      style={[styles.date, styles.theme.date]}
    >
      {timestamp}
    </FormattedDate>
  );
}
