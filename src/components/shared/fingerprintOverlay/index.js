import React from 'react';
import { View } from 'react-native';
import BlurOverlay from 'react-native-blur-overlay';
import { translate } from 'react-i18next';
import Icon from '../toolBox/icon';
import { H4, P } from '../toolBox/typography';
import { colors } from '../../../constants/styleGuide';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';

class FingerprintOverlay extends React.Component {
  componentDidUpdate() {
    if (this.props.show) {
      this.ref.openOverlay();
    } else {
      this.ref.closeOverlay();
    }
  }

  closeModal = () => {
    this.ref.closeOverlay();
    if (typeof this.props.onModalClosed === 'function') {
      this.props.onModalClosed();
    }
  }

  render() {
    const { styles, error, t } = this.props;
    const iconColor = error ? colors.light.burntSieanna : colors.light.blue;
    const message = error ? t('Unauthorized! Please try again.') :
      t('Place your finger over the touch sensor to authenticate.');
    return (<BlurOverlay
      ref={(ref) => { this.ref = ref; }}
      radius={24}
      brightness={-50}
      onPress={this.closeModal}
      customStyles={styles.blurContainer}
      blurStyle='light'
      show={this.props.show}
    >
      <View style={styles.container}>
        <H4 style={styles.title}>Fingerprint Verification</H4>
        <View style={styles.innerContainer}>
          <View style={styles.iconWrapper}>
            <Icon name='touch-id-full' size={60} color={iconColor} style={styles.icon} />
          </View>
          <P style={styles.description}>{message}</P>
        </View>
      </View>
    </BlurOverlay>);
  }
}
export default withTheme(translate()(FingerprintOverlay), getStyles());
