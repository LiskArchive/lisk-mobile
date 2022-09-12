import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import { themes } from 'constants/styleGuide';
import noBookmarkLightImg from 'assets/images/send/noBookmarks3xLight.png';
import noBookmarkDarkImg from 'assets/images/send/noBookmarks3xDark.png';
import { P } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const EmptyState = ({ theme, styles, t, style }) => (
  <View style={[styles.emptyState, style]}>
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
