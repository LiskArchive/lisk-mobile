import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import Switch from 'react-native-switch-pro';
import { translate } from 'react-i18next';
import { H2, P } from '../../shared/toolBox/typography';
import styles from './styles';
import { colors } from '../../../constants/styleGuide';
import { PrimaryButton } from '../../shared/toolBox/button';
import { headerHeight } from '../../../utilities/device';

class Heading extends React.Component {
  state = {
    confirmed: false,
  };

  confirm = (status) => {
    this.setState({
      confirmed: status,
    });
  };

  render() {
    const {
      t, skip, descriptionContent, hasHeader, testID,
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
            <View key={item.step} style={styles.step} testID={`${testID}-${item.step}`}>
              <View style={styles.descriptionWrapper}>
                <H2 style={[styles.centralized, styles.descriptionH]}>{t(item.title)}</H2>
                <P style={[styles.centralized, styles.descriptionP]}>{t(item.description)}</P>
              </View>
              <Image resizeMethod={'scale'} source={item.imageSrc} style={item.imageStyle} />
              {item.step === descriptionContent.length && (
                <View style={[styles.buttonContainer, buttonStyle]}>
                  <View style={styles.switchContainer}>
                    <Switch
                      height={26}
                      width={43}
                      onSyncPress={this.confirm}
                      backgroundActive={colors.light.ultramarineBlue}
                      backgroundInactive={colors.light.platinum}
                      testID="onboardingSliderButton"
                    />
                    <P style={styles.confirmationText}>
                      {t('I have read and agreed with the terms and conditions')}
                    </P>
                  </View>
                  <PrimaryButton
                    disabled={!this.state.confirmed}
                    style={styles.button}
                    onClick={skip}
                    title="Continue"
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
