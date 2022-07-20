import React, { useRef } from 'react';
import {
  View, Animated, Image, TouchableOpacity
} from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import { P } from 'components/shared/toolBox/typography';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import { useNavigation } from '@react-navigation/native';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';
import getStyles from './styles';

const ApplicationSwitcher = () => {
  const { styles, theme } = useTheme({ styles: getStyles });
  const translateY = useRef(new Animated.Value(0));
  const navigation = useNavigation();
  const [currentApplication] = useCurrentBlockchainApplication();

  const navigateToSwitchApplication = () => {
    navigation.navigate('SwitchApplication');
  };

  const switchApplication = () => {
    // TODO: Implement switching application here
  };

  const onFlingDirectionChange = (direction) => {
    Animated.sequence([
      Animated.timing(translateY.current, {
        toValue: direction === 'up' ? -10 : 10,
        duration: 500,
      }),
      Animated.timing(translateY.current, {
        toValue: 0,
        duration: 500,
      }),
    ]).start();
  };

  return (
    <TouchableOpacity onPress={navigateToSwitchApplication}>
      <FlingGestureHandler
        onHandlerStateChange={() => onFlingDirectionChange('down')}
        direction={Directions.DOWN}
        onEnded={switchApplication}
      >
        <FlingGestureHandler
          onHandlerStateChange={() => onFlingDirectionChange('up')}
          direction={Directions.UP}
          onEnded={switchApplication}
        >
          <View style={[styles.container, styles.theme.container]}>
            <Animated.View
              style={[
                styles.switch,
                { transform: [{ translateY: translateY.current }] },
              ]}
            >
              <Image
                source={currentApplication.imageURL}
                style={[styles.avatar]}
              />
              <P style={[styles.appName, styles.theme.appName]}>
                {currentApplication.name}
              </P>
              <SwitchSvg theme={theme} />
            </Animated.View>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </TouchableOpacity>
  );
};

export default ApplicationSwitcher;
