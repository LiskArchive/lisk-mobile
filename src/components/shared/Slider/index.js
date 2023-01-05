import React, { useState } from 'react';
import { View, Image, Linking } from 'react-native';
import { useDispatch } from 'react-redux';
import Swiper from 'react-native-swiper';
import Switch from 'react-native-switch-pro';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { headerHeight } from 'utilities/device';
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { H2, P, A } from 'components/shared/toolBox/typography';
import URLs from 'constants/URLs';
import { colors } from 'constants/styleGuide';

import getSliderStyles from './styles';

export default function Slider({ skip, slides, hasHeader, style, testID }) {
  const [isConfirmed, setIsConfirmed] = useState(false);

  const dispatch = useDispatch();

  const { styles } = useTheme({ styles: getSliderStyles() });

  const handleTermsAndConditionsClick = () => Linking.openURL(URLs.liskTermsAndConditions);

  const handleSubmit = (slideContent) => {
    if (slideContent.acceptTermsSwitch) {
      dispatch(settingsUpdatedAction({ showedIntro: true }));
    }

    skip();
  };

  const buttonStyle = hasHeader ? { marginBottom: headerHeight() } : {};

  return (
    <View style={styles.container}>
      <Swiper
        loop={false}
        dotColor={colors.light.white}
        dotStyle={styles.dot}
        activeDotColor={colors.light.ultramarineBlue}
        paginationStyle={styles.pagination}
      >
        {slides.map((slide) => (
          <View key={slide.step} style={styles.step} testID={`${testID}-${slide.step}`}>
            <View style={styles.descriptionContainer}>
              <H2 style={[styles.centralized, styles.descriptionH]}>{i18next.t(slide.title)}</H2>
              <P style={[styles.centralized, styles.descriptionP]}>
                {i18next.t(slide.description)}
              </P>
            </View>

            <View style={styles.flex}>
              <Image
                resizeMethod="scale"
                source={slide.imageSrc}
                resizeMode="center"
                style={[styles.imageSrc, style?.image]}
              />
            </View>
            {slide.step === slides.length && (
              <View style={[styles.footer, buttonStyle]}>
                {slide.acceptTermsSwitch && (
                  <View style={styles.switchContainer}>
                    <Switch
                      height={26}
                      width={43}
                      onSyncPress={(status) => setIsConfirmed(status)}
                      backgroundActive={colors.light.ultramarineBlue}
                      backgroundInactive={colors.light.platinum}
                      testID="sliderButton"
                    />
                    <P style={styles.confirmationText}>
                      {i18next.t('I have read and agreed with the')}

                      <A onPress={handleTermsAndConditionsClick} style={styles.link}>
                        &nbsp;{i18next.t('terms and conditions.')}
                      </A>
                    </P>
                  </View>
                )}

                <PrimaryButton
                  disabled={slide.acceptTermsSwitch && !isConfirmed}
                  style={styles.button}
                  onClick={() => handleSubmit(slide)}
                  testID="continueButton"
                >
                  {i18next.t('commons.buttons.continue')}
                </PrimaryButton>
              </View>
            )}
          </View>
        ))}
      </Swiper>
    </View>
  );
}
