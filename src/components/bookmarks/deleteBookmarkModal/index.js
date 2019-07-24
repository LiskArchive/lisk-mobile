import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { A, Small } from '../../shared/toolBox/typography';
import { Button } from '../../shared/toolBox/button';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';

class DeleteBookmarkModal extends React.Component {
  onConfirm = () => {
    this.props.modalCallback();
    this.props.close();
  }

  render() {
    const { styles, t, close } = this.props;

    return (
      <View style={styles.container}>
        <Small style={[styles.text, styles.theme.text]}>
        {t('Are you sure about deleting this bookmark?')}
        </Small>

        <Small style={[styles.text, styles.theme.text]}>
          {t('You will be able to add it again anytime.')}
        </Small>

        <Button
          style={[styles.actionButton, styles.theme.actionButton]}
          textStyle={[styles.buttonText, styles.theme.buttonText]}
          onClick={this.onConfirm}
          title={t('Delete this bookmark')}
        />

        <A
          onPress={close}
          style={styles.theme.cancelButton}
        >
          {t('Cancel')}
        </A>
      </View>
    );
  }
}

export default withTheme(translate()(DeleteBookmarkModal), getStyles());
