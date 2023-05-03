import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';

import { H3, P } from 'components/shared/toolBox/typography';
import { Button, LabelButton } from 'components/shared/toolBox/button';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const DeleteBookmark = ({ styles, t, close, onDelete }) => {
  return (
    <View style={styles.container}>
      <H3 style={[styles.title, styles.theme.title]}>{t('bookmarks.deleteBookmark.title')}</H3>

      <P style={[styles.description, styles.theme.description]}>
        {t('bookmarks.deleteBookmark.description')}
      </P>

      <Button
        style={[styles.button, styles.theme.submitButton]}
        textStyle={[styles.theme.buttonText]}
        onPress={onDelete}
        testID="delete-bookmark-button"
      >
        {t('bookmarks.deleteBookmark.submitButton')}
      </Button>

      <LabelButton style={[styles.button]} onPress={close}>
        {t('bookmarks.deleteBookmark.cancelButton')}
      </LabelButton>
    </View>
  );
};

export const DeleteBookmarkModal = withTheme(translate()(DeleteBookmark), getStyles());
