import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import styles from './styles';
import { P } from '../../../shared/toolBox/typography';
import { PrimaryButton } from '../../../shared/toolBox/button';
import HeaderPlaceholderButton from '../../router/headerPlaceholderButton';
import image from '../../../../assets/images/registrationProcess/success3x.png';

class Success extends React.Component {
  componentDidMount() {
    const {
      t,
      hideNav,
      navigation: { setOptions },
    } = this.props;

    hideNav();

    setOptions({
      headerLeft: () => <HeaderPlaceholderButton />,
      title: t('Perfect! You’re all set'),
    });
  }

  render() {
    const {
      t,
      navigation: { pop },
    } = this.props;

    return (
      <SafeAreaView style={styles.wrapper}>
        <View style={styles.container}>
          <View>
            <View style={styles.titleContainer}>
              <P style={styles.subTitle}>
                {t(
                  'Great! now you can use your passphrase to sign in to your account.'
                )}
              </P>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={image} />
            </View>
          </View>
          <View>
            <PrimaryButton
              testID="registerSuccess"
              style={styles.button}
              onClick={pop}
              title={t('Sign in now')}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default translate()(Success);
