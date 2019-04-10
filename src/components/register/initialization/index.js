import React from 'react';
import { View, Image } from 'react-native';
import { translate } from 'react-i18next';
import styles from './styles';
import { B, P } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import image from '../../../assets/images/registrationProcess/initialize3x.png';

class Initialization extends React.Component {
  componentDidMount() {
    const { t, navigation: { setParams } } = this.props;

    setParams({
      showButtonLeft: false,
      action: false,
      title: t('Security reminder!'),
    });
  }

  render() {
    const { t, nextStep, sharedData: { passphrase } } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <B style={styles.subHeader}>
              {t('It’s extremely important!')}
            </B>
            <P style={styles.subTitle}>
              {t('Initialize your account immediately after you received tokens for the first time.')}
            </P>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={image}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <SecondaryButton
            style={styles.button}
            onClick={() => {
              nextStep({ passphrase });
            }}
            title={t('Continue')}
          />
        </View>
      </View>
    );
  }
}

export default translate()(Initialization);
