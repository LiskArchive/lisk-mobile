import React from 'react';
import { View, Animated, Image, TouchableOpacity } from 'react-native';

import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';
import ChangeSvg from 'assets/svgs/ChangeSvg';

import getStyles from './styles';

const ApplicationSwitcher = ({ onPress }) => {
  const [currentApplication] = useCurrentApplication();

  const { styles } = useTheme({ styles: getStyles });

  return (
    <View style={styles.switcherContainer} testID="switch-application-container">
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, styles.theme.container]}>
          <Animated.View style={[styles.switch]}>
            <Image source={{ uri: currentApplication?.logo.png }} style={[styles.avatar]} />
            <P style={[styles.appName, styles.theme.appName]}>{currentApplication?.chainName}</P>
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
