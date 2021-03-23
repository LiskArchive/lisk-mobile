import React from 'react';
import { Linking } from 'react-native';

import URLs from '../../../../../constants/URLs';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../../../utilities/device';
import {
  P, A
} from '../../../../shared/toolBox/typography';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

const ReadMore = ({
  actionType, styles, messages, t
}) => {
  const openAcademy = () => {
    Linking.openURL(URLs.liskGettingStarted)
      // eslint-disable-next-line no-console
      .catch(err => console.error('An error occurred', err));
  };

  if (!isSmallScreen && actionType !== 'send') {
    return (
      <P style={styles.theme.subtitle}>
          {messages[actionType].subtitle}
        <A
          style={[styles.link, styles.theme.link]}
          onPress={openAcademy}
          >
          {t('Read more')}
          </A>
      </P>
    );
  }

  return null;
};

export default ReadMore;
