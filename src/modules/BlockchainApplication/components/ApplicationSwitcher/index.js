import React, { useRef } from 'react';
import {
  View, Animated, Image, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks/useTheme';
import { FlingGestureHandler, Directions } from 'react-native-gesture-handler';
import { P } from 'components/shared/toolBox/typography';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import { roundAccessor } from '../../utils';
import getStyles from './styles';

const ApplicationSwitcher = () => {
  const { styles } = useTheme({ styles: getStyles });
  const translateY = useRef(new Animated.Value(0));
  const navigation = useNavigation();
  const [currentApplication, setCurrentApplication] = useCurrentBlockchainApplication();
  const { applications } = useBlockchainApplicationManagement();

  const navigateToSwitchApplication = () => {
    navigation.navigate('SwitchApplication');
  };

  const switchApplication = (direction) => {
    const chainIndex = applications.data
      .findIndex(app => app.chainID === currentApplication.chainID);
    setCurrentApplication(roundAccessor(applications.data, chainIndex, direction));
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
        onEnded={() => switchApplication('prev')}
      >
        <FlingGestureHandler
          onHandlerStateChange={() => onFlingDirectionChange('up')}
          direction={Directions.UP}
          onEnded={() => switchApplication('next')}
        >
          <View style={[styles.container, styles.theme.container]}>
            <Animated.View
              style={[
                styles.switch,
                { transform: [{ translateY: translateY.current }] },
              ]}
            >
              <Image
                source={{ uri: currentApplication.images?.logo.png }}
                style={[styles.avatar]}
              />
              <P style={[styles.appName, styles.theme.appName]}>
                {currentApplication.name}
              </P>
              <SwitchSvg />
            </Animated.View>
          </View>
        </FlingGestureHandler>
      </FlingGestureHandler>
    </TouchableOpacity>
  );
};

export default ApplicationSwitcher;
