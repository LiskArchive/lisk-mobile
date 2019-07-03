import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-navigation';
import styles from './styles';
import { P } from '../../toolBox/typography';
import { PrimaryButton } from '../../toolBox/button';
import image from '../../../assets/images/registrationProcess/success3x.png';

class Success extends React.Component {
  componentDidMount() {
    const { t, hideNav, navigation: { setParams } } = this.props;

    hideNav();

    setParams({
      action: false,
      showButtonLeft: true,
      backButtonTitle: t('Sign in'),
      title: t('Perfect! You’re all set'),
    });
  }

  render() {
    const { t, navigation: { pop } } = this.props;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View testID="registerSuccess" style={styles.container}>
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
            <PrimaryButton
              style={styles.button}
              onClick={pop}
              title={t('Sign in now')}
              testID='registerSuccess'
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default translate()(Success);
