import React from 'react';
import { Image, View } from 'react-native';
import stripesLight from '../../../assets/images/stripesLight.png';
import stripesDark from '../../../assets/images/stripesDark.png';
import withTheme from '../../withTheme';
import getStyles from './styles';
import themes from '../../../constants/styleGuide/themes';

const HeaderBackgroundImage = ({ styles, theme }) => (
  <View>
    {
      theme === themes.light ? (
        <Image
          style={styles.main}
          source={stripesLight}
        />
      ) : (
        <Image
          style={styles.main}
          source={stripesDark}
        />
      )
    }
  </View>
);

export default withTheme(HeaderBackgroundImage, getStyles());
