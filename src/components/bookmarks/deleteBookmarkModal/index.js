import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { A, Small } from '../../toolBox/typography';
import { Button } from '../../toolBox/button';
import withTheme from '../../withTheme';
import getStyles from './styles';

class DeleteBookmarkModal extends React.Component {
  onConfirm = () => {
    this.props.navigation.getParam('onConfirm')();
    this.props.close();
  }

  onCancel = () => {
    this.props.navigation.getParam('onCancel')();
    this.props.close();
  }

  render() {
    const { styles, t } = this.props;

    return (
      <View style={styles.container}>
        <Small style={[styles.text, styles.theme.text]}>
          Are you sure about deleting this bookmark?
        </Small>

        <Small style={[styles.text, styles.theme.text]}>
          You will be able to add it again anytime.
        </Small>

        <Button
          style={[styles.actionButton, styles.theme.actionButton]}
          onClick={this.onConfirm}
          title="Delete this bookmark"
        />

        <A
          onPress={this.onCancel}
          style={styles.theme.cancelButton}
        >
          {t('Cancel')}
        </A>
      </View>
    );
  }
}

export default withTheme(translate()(DeleteBookmarkModal), getStyles());
