import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import { P } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import image from '../../../assets/images/registrationProcess/success3x.png';

class Success extends React.Component {
  componentDidMount() {
    const { t, hideNav, navigation: { setParams } } = this.props;

    hideNav();

    setParams({
      action: false,
      showButtonLeft: true,
      backButtonTitle: t('Sign In'),
      title: t('Perfect! You’re all set'),
    });
  }

  render() {
    const { t, navigation: { pop } } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <P style={styles.subTitle}>
              {t('Great! now you can use your passphrase to sign in to your account.')}
            </P>
          </View>
          <View style={styles.imageContainer} >
            <Image
              style={styles.image}
              source={image}
            />
          </View>
        </View>
        <View>
          <SecondaryButton
            style={styles.button}
            onClick={pop}
            title={t('Sign in now')}
          />
        </View>
      </View>
    );
  }
}

export default translate()(Success);
