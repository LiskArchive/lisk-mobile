import React from 'react';
import {
  View, Animated, Image, TouchableOpacity
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import ChangeSvg from 'assets/svgs/ChangeSvg';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';
import getStyles from './styles';

const ApplicationSwitcher = () => {
  const { styles } = useTheme({ styles: getStyles });
  const navigation = useNavigation();
  const [currentApplication] = useCurrentBlockchainApplication();

  const navigateToSwitchApplication = () => {
    navigation.navigate('SwitchApplication');
  };

  return (
    <View style={styles.switcherContainer}>
      <TouchableOpacity onPress={navigateToSwitchApplication} >
        <View style={[styles.container, styles.theme.container]}>
          <Animated.View
            style={[
              styles.switch,
            ]}
          >
            <Image
              source={{ uri: currentApplication.images?.logo.png }}
              style={[styles.avatar]}
            />
            <P style={[styles.appName, styles.theme.appName]}>
              {currentApplication.name}
            </P>
            <View style={styles.iconContainer}>
              <ChangeSvg />
            </View>
          </Animated.View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default ApplicationSwitcher;
