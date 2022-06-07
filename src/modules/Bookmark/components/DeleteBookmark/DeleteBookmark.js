import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { A, Small } from 'components/shared/toolBox/typography';
import { Button } from 'components/shared/toolBox/button';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

const DeleteBookmark = ({
  styles, t, close, modalCallback
}) => {
  const onConfirm = () => {
    modalCallback();
    close();
  };

  return <View style={styles.container}>
    <Small style={[styles.text, styles.theme.text]}>
      {t('Are you sure about deleting this bookmark?')}
    </Small>

    <Small style={[styles.text, styles.theme.text]}>
      {t('You will be able to add it again anytime.')}
    </Small>

    <Button
      style={[styles.actionButton, styles.theme.actionButton]}
      textStyle={[styles.buttonText, styles.theme.buttonText]}
      onClick={onConfirm}
      title={t('Delete this bookmark')}
    />

    <A onPress={close} style={styles.theme.cancelButton}>
      {t('Cancel')}
    </A>
  </View>;
};

export const DeleteBookmarkModal = withTheme(translate()(DeleteBookmark), getStyles());
