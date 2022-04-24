import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { Small, A } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import withTheme from 'components/shared/withTheme';
import getStyles from './styles';

class IntroModal extends React.Component {
  initializeAccount = () => {
    this.props.close();
    this.props.modalCallback();
  };

  render() {
    const { t, close, styles } = this.props;
    return (
      <View style={styles.container}>
        <Small style={[styles.text, styles.theme.text]}>
          {t(
            'Make sure to initialize your account with an outgoing transaction, to improve even further the security of your account'
          )}
        </Small>
        <PrimaryButton
          style={styles.actionButton}
          onClick={this.initializeAccount}
          title={t('Initialize your account')}
        />
        <A onPress={close} style={styles.secondaryButton}>
          {t('Remind me later')}
        </A>
      </View>
    );
  }
}

export const InitializationModal = withTheme(translate()(IntroModal), getStyles());
