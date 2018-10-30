import React from 'react';
import { Animated, View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Icon from '../toolBox/icon';
import { H2, P } from '../toolBox/typography';
import { LabelButton, SecondaryButton } from '../toolBox/button';
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
    index: 0,
  }

  onIndexChanged = (index) => {
    this.setState({ index });
  }

  componentDidMount() {
    const {
      bgOpacity, logoOpacity,
    } = this.state;

    Animated.timing(bgOpacity, {
      toValue: 1,
      duration: 300,
      delay: 1350,
    }).start();
    Animated.timing(logoOpacity, {
      toValue: 1,
      duration: 400,
      delay: 1350,
    }).start();
  }

  render() {
    const {
      bgOpacity, logoOpacity, index,
    } = this.state;

    return (<Animated.View style={[styles.headingContainer, { opacity: bgOpacity }]}>
      <Animated.View style={[styles.headingTopBar, { opacity: logoOpacity }]}>
        <Icon name='back' size={30} color='transparent' style={styles.headingSkipButton}/>
        <Icon name='lisk' size={30} color={colors.primary9} style={styles.headingLogo} />
        {
          index !== 2 ?
          <LabelButton
            style={[styles.headingSkipButton, { color: colors.grayScale1 }]}
            onClick={this.props.skip}>Skip</LabelButton> :
            <Icon name='back' size={30} color='transparent' style={styles.headingSkipButton}/>
        }
      </Animated.View>
      <View style={styles.descriptionsWrapper}>
        <Swiper
          style={styles.headingDescription}
          containerStyle={styles.headingDescriptionCntr}
          loop={false}
          onIndexChanged={this.onIndexChanged}
          dotColor={colors.grayScale5}
          activeDotColor={colors.primary9}
          paginationStyle={styles.headingPagination}>
          <View style={styles.headingDescriptionItem}>
            <View style={styles.itemWrapper}>
              <H2 style={styles.centralized}>Activity history</H2>
              <P style={[styles.centralized, { color: colors.grayScale2 }]}>Get a full overview of your current{'\n'}balance, transaction history{'\n'}and much more.</P>
            </View>
          </View>
          <View style={styles.headingDescriptionItem}>
            <View style={styles.itemWrapper}>
              <H2 style={styles.centralized}>Token transfer</H2>
              <P style={[styles.centralized, { color: colors.grayScale2 }]}>Transfer your LSK tokens easily to{'\n'}other accounts by simply scanning{'\n'}their QR code.</P>
            </View>
          </View>
          <View style={styles.headingDescriptionItem}>
            <View style={styles.itemWrapper}>
              <H2 style={styles.centralized}>Secure authentication</H2>
              <P style={[styles.centralized, { color: colors.grayScale2 }]}>Access all functions of the app{'\n'}quickly and securely via advanced{'\n'}biometric authentication.</P>
            </View>
          </View>
        </Swiper>
      </View>

      <View style={styles.illustrations}>
        <Animated.View style={[styles.frame, { opacity: index === 2 ? 0 : 1 }]}>
          <Image source={frame} style={styles.deviceFrame} />
        </Animated.View>
        <Animated.View style={[styles.screens, { opacity: index === 0 ? 1 : 0 }]}>
          <Image source={activityScreen} style={styles.activityIllustration} />
        </Animated.View>
        <Animated.View style={[styles.screens, { opacity: index === 1 ? 1 : 0 }]}>
          <Image source={transferScreen} style={styles.transferIllustration} />
        </Animated.View>
        <Animated.View style={[styles.screens, styles.bioAuth, { opacity: index === 2 ? 1 : 0 }]}>
          <Image source={faceIdIllustration} style={styles.faceIdIllustration} />
          <Image source={touchIdIllustration} style={styles.touchIdIllustration} />
          <SecondaryButton
            style={styles.startButton}
            onClick={this.props.skip}
            title='Start' />
        </Animated.View>
      </View>
    </Animated.View>);
  }
}

export default Heading;
