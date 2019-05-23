import React from 'react';
import { Animated, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { translate } from 'react-i18next';
import { H2, P } from '../toolBox/typography';
import styles from './styles';
import { colors } from '../../constants/styleGuide';
import activityHistoryImg from '../../assets/images/intro/activityHistory3x.png';
import tokensTransferImg from '../../assets/images/intro/tokensTransfer3x.png';
import secureAuthenticationImg from '../../assets/images/intro/secureAuthentication3x.png';
import easyAccessImg from '../../assets/images/intro/easyAccess3x.png';

class Heading extends React.Component {
  state = {
    bgOpacity: new Animated.Value(0),
    logoOpacity: new Animated.Value(0),
    frameOpacity: new Animated.Value(1),
    activityOpacity: new Animated.Value(1),
    transactionsOpacity: new Animated.Value(0),
    bioAuthOpacity: new Animated.Value(0),
    index: 0,
  }

  onIndexChanged = (index) => {
    this.setState({ index });
    this.animate(index);
  }

  animate = (index) => {
    const {
      frameOpacity, activityOpacity, transactionsOpacity, bioAuthOpacity,
    } = this.state;
    const values = [
      [1, 1, 0, 0],
      [1, 0, 1, 0],
      [0, 0, 0, 1],
    ];
    Animated.timing(frameOpacity, {
      toValue: values[index][0],
      duration: 400,
    }).start();
    Animated.timing(activityOpacity, {
      toValue: values[index][1],
      duration: 400,
    }).start();
    Animated.timing(transactionsOpacity, {
      toValue: values[index][2],
      duration: 400,
    }).start();
    Animated.timing(bioAuthOpacity, {
      toValue: values[index][3],
      duration: 400,
    }).start();
  };

  render() {
    const { t } = this.props;

    const descriptionContent = [
      {
        title: 'Activity history',
        description:
          'Get a full overview of your current balance, transaction history and much more.',
        imageSrc: activityHistoryImg,
        imageStyle: styles.activityHistoryImg,
      },
      {
        title: 'Token transfer',
        description: 'Transfer your tokens easily to other accounts, by simply scanning QR Codes.',
        imageSrc: tokensTransferImg,
        imageStyle: styles.tokensTransferImg,
      },
      {
        title: 'Secure authentication',
        description: 'Access all functions via advanced biometric authentication.',
        imageSrc: secureAuthenticationImg,
        imageStyle: styles.secureAuthenticationImg,
      },
      {
        title: 'Easy access',
        description:
          'Create an account with one passphrase to access your LSK and BTC cryptocurrencies',
        imageSrc: easyAccessImg,
        imageStyle: styles.easyAccessImg,
      },
    ];

    return (
      <Animated.View style={styles.headingContainer}>
          <Swiper
            loop={false}
            onIndexChanged={this.onIndexChanged}
            dotColor={colors.light.white}
            dotStyle={styles.dot}
            activeDotColor={colors.light.ultramarineBlue}
          paginationStyle={styles.headingPagination}
        >
          {descriptionContent.map((item, index) => (
            <View key={index}>
              <View style={styles.descriptionWrapper}>
                <H2 style={[styles.centralized, styles.descriptionH]}>{t(item.title)}</H2>
                <P style={[styles.centralized, styles.descriptionP]}>{t(item.description)}</P>
            </View>
              <View style={styles.illustrationWrapper}>
                <Image resizeMethod={'scale'} source={item.imageSrc} style={styles.illustration} />
              </View>
            </View>
          ))}
          </Swiper>
        </Animated.View>
    );
  }
}

export default translate()(Heading);
