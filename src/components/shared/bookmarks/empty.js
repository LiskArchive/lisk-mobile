import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import noBookmarkLightImg from '../../../assets/images/send/noBookmarks3xLight.png';
import noBookmarkDarkImg from '../../../assets/images/send/noBookmarks3xDark.png';
import { P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import { themes } from '../../../constants/styleGuide';

const EmptyState = ({ theme, styles, t }) => (
  <View style={styles.emptyState}>
    <View style={styles.imageContainer}>
      <Image
        style={styles.noBookmarkImage}
        source={theme === themes.light ? noBookmarkLightImg : noBookmarkDarkImg}
      />
    </View>
    <P style={styles.emptyTitle}>{t('You don’t have any bookmarks.')}</P>
  </View>
);

export default withTheme(translate()(EmptyState), getStyles());
