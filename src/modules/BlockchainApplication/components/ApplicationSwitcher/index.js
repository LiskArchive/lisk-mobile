import React from 'react';
import { View, Animated, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import ChangeSvg from 'assets/svgs/ChangeSvg';
import getStyles from './styles';
import { useBlockchainApplicationsManagement } from '../../hooks/useBlockchainApplicationManagement';

const ApplicationSwitcher = ({ onPress }) => {
  const { styles } = useTheme({ styles: getStyles });
  const { currentApplication } = useBlockchainApplicationsManagement();

  return (
    <View style={styles.switcherContainer}>
      <TouchableOpacity onPress={onPress}>
        <View style={[styles.container, styles.theme.container]}>
          <Animated.View style={[styles.switch]}>
            <Image source={{ uri: currentApplication.logo.png }} style={[styles.avatar]} />
            <P style={[styles.appName, styles.theme.appName]}>{currentApplication.chainName}</P>
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
