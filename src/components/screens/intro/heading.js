import React from 'react';
import { View, Image, Linking } from 'react-native';
import connect from 'redux-connect-decorator';
import Swiper from 'react-native-swiper';
import Switch from 'react-native-switch-pro';
import { translate } from 'react-i18next';
import { colors } from 'constants/styleGuide';
import { headerHeight } from 'utilities/device';
import URLs from 'constants/URLs';
import { H2, P, A } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { settingsUpdated as settingsUpdatedAction } from 'actions/settings';
import styles from './styles';

@connect(
  () => ({}),
  {
    settingsUpdated: settingsUpdatedAction,
  }
)
class Heading extends React.Component {
  state = {
    confirmed: false,
  };

  confirm = status => {
    this.setState({
      confirmed: status,
    });
  };

  openTermsAndConditions = () => {
    Linking.openURL(URLs.liskTermsAndConditions);
  };

  onPress = slideContent => {
    if (slideContent.acceptTermsSwitch) {
      this.props.settingsUpdated({ showedIntro: true });
    }
    this.props.skip();
  };

  render() {
    const {
      t, descriptionContent, hasHeader, testID
    } = this.props;
    const buttonStyle = hasHeader ? { marginBottom: headerHeight() } : {};
    return (
      <View style={styles.headingContainer}>
        <Swiper
          loop={false}
          onIndexChanged={this.onIndexChanged}
          dotColor={colors.light.white}
          dotStyle={styles.dot}
          activeDotColor={colors.light.ultramarineBlue}
          paginationStyle={styles.headingPagination}
        >
          {descriptionContent.map(item => (
            <View
              key={item.step}
              style={styles.step}
              testID={`${testID}-${item.step}`}
            >
              <View style={styles.descriptionWrapper}>
                <H2 style={[styles.centralized, styles.descriptionH]}>
                  {t(item.title)}
                </H2>
                <P style={[styles.centralized, styles.descriptionP]}>
                  {t(item.description)}
                </P>
              </View>
              <View style={styles.flex} >
                <Image
                  resizeMethod="scale"
                  source={item.imageSrc}
                  resizeMode="center"
                  style={styles.imageSrc}
                />
              </View>
              {item.step === descriptionContent.length && (
                <View style={[styles.buttonContainer, buttonStyle]}>
                  {item.acceptTermsSwitch && (
                    <View style={styles.switchContainer}>
                      <Switch
                        height={26}
                        width={43}
                        onSyncPress={this.confirm}
                        backgroundActive={colors.light.ultramarineBlue}
                        backgroundInactive={colors.light.platinum}
                        testID="sliderButton"
                      />
                      <P style={styles.confirmationText}>
                        {t('I have read and agreed with the')}
                        <A
                          onPress={this.openTermsAndConditions}
                          style={styles.link}
                        >
                          &nbsp;{t('terms and conditions.')}
                        </A>
                      </P>
                    </View>
                  )}
                  <PrimaryButton
                    disabled={item.acceptTermsSwitch && !this.state.confirmed}
                    style={styles.button}
                    onClick={() => this.onPress(item)}
                    title={t('Continue')}
                    testID="continueButton"
                  />
                </View>
              )}
            </View>
          ))}
        </Swiper>
      </View>
    );
  }
}

export default translate()(Heading);
