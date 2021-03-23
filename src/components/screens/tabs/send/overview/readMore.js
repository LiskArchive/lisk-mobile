import React from 'react';

import { deviceHeight, SCREEN_HEIGHTS } from '../../../../../utilities/device';
import {
  P, A
} from '../../../../shared/toolBox/typography';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

const ReadMore = ({
  actionType, styles, messages, t
}) => {
  if (!isSmallScreen && actionType !== 'send') {
    return (
      <P style={styles.theme.subtitle}>
          {messages[actionType].subtitle}
        <A
          style={[styles.link, styles.theme.link]}
          onPress={this.openAcademy}
          >
          {t('Read more')}
          </A>
      </P>
    );
  }

  return null;
};

export default ReadMore;
