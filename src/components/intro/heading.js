import React from 'react';
import { Animated, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { translate } from 'react-i18next';
import Icon from '../toolBox/icon';
import { H2, P } from '../toolBox/typography';
import { LabelButton, PrimaryButton } from '../toolBox/button';
import styles from './styles';
import { colors } from '../../constants/styleGuide';
import frame from '../../assets/images/frame3x.png';
import activityScreen from '../../assets/images/activityScreen3x.png';
import transferScreen from '../../assets/images/transferScreen3x.png';
import faceIdIllustration from '../../assets/images/faceIdIllustration3x.png';
import touchIdIllustration from '../../assets/images/touchIdIllustration3x.png';

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

  componentDidMount() {
    const {
      bgOpacity, logoOpacity,
    } = this.state;

    Animated.timing(bgOpacity, {
      toValue: 1,
      duration: 300,
      delay: 950,
    }).start();
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 400,
      delay: 950,
    }).start();
  }

  render() {
    const {
      bgOpacity, logoOpacity, index, frameOpacity,
      activityOpacity, transactionsOpacity, bioAuthOpacity,
    } = this.state;
    const { t, skip } = this.props;

    return (<Animated.View style={[styles.headingContainer, { opacity: bgOpacity }]}>
      <Animated.View style={[styles.headingTopBar, { opacity: logoOpacity }]}>
        <Icon name='back' size={30}
          color='transparent' style={styles.headingSkipButton}/>
        <Icon name='lisk' size={30}
          color={colors.light.actionBlue} style={styles.headingLogo} />
        {
          index !== 2 ?
          <LabelButton
            testID='skipIntroButton'
            style={[styles.headingSkipButton, { color: colors.light.gray1 }]}
            onClick={skip}>Skip
          </LabelButton> :
            <Icon name='back' size={30} color='transparent' style={styles.headingSkipButton}/>
        }
      </Animated.View>
      <View style={styles.descriptionsWrapper}>
        <Swiper
          style={styles.headingDescription}
          containerStyle={styles.headingDescriptionCntr}
          loop={false}
          onIndexChanged={this.onIndexChanged}
          dotColor={colors.light.gray5}
          activeDotColor={colors.light.actionBlue}
          paginationStyle={styles.headingPagination}>
          <View style={styles.headingDescriptionItem}>
            <View style={styles.itemWrapper}>
              <H2 style={styles.centralized}>Activity history</H2>
              <P style={[styles.centralized, styles.descriptionP]}>
                {t('Get a full overview of your current balance, transaction history and much more.')}
              </P>
            </View>
          </View>
          <View style={styles.headingDescriptionItem}>
            <View style={styles.itemWrapper}>
              <H2 style={styles.centralized}>Token transfer</H2>
              <P style={[styles.centralized, styles.descriptionP]}>
                {t('Transfer your LSK tokens easily to other accounts by simply scanning their QR code.')}
              </P>
            </View>
          </View>
          <View style={styles.headingDescriptionItem}>
            <View style={styles.itemWrapper}>
              <H2 style={styles.centralized}>Secure authentication</H2>
              <P style={[styles.centralized, styles.descriptionP]}>
                {t('Access all functions of the app quickly and securely via advanced biometric authentication.')}
              </P>
            </View>
          </View>
        </Swiper>
      </View>

      <View style={styles.illustrations}>
        <Animated.View style={[styles.frame, { opacity: frameOpacity }]}>
          <Image source={frame} style={styles.deviceFrame} />
        </Animated.View>
        <Animated.View style={[styles.screens, { opacity: activityOpacity }]}>
          <Image source={activityScreen} style={styles.activityIllustration} />
        </Animated.View>
        <Animated.View style={[styles.screens, { opacity: transactionsOpacity }]}>
          <Image source={transferScreen} style={styles.transferIllustration} />
        </Animated.View>
        <Animated.View style={[styles.screens, styles.bioAuth, { opacity: bioAuthOpacity }]}>
          <Image source={faceIdIllustration} style={styles.faceIdIllustration} />
          <Image source={touchIdIllustration} style={styles.touchIdIllustration} />
        </Animated.View>
      </View>
      <Animated.View style={[styles.navigateButton, { opacity: bioAuthOpacity }]}>
        <PrimaryButton
          style={styles.startButton}
          onClick={skip}
          title='Start' />
      </Animated.View>
    </Animated.View>);
  }
}

export default translate()(Heading);
