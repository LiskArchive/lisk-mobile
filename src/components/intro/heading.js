import React from 'react';
import { View, Image } from 'react-native';
import Swiper from 'react-native-swiper';
import { translate } from 'react-i18next';
import { H2, P } from '../toolBox/typography';
import styles from './styles';
import { colors } from '../../constants/styleGuide';
import { PrimaryButton } from '../toolBox/button';
import { headerHeight } from '../../utilities/device';

class Heading extends React.Component {
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
                  <PrimaryButton
                    style={styles.button}
                    onClick={skip}
                    title='Continue'
                    testID='sliderButton'
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
