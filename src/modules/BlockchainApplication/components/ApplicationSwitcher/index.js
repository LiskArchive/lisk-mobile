import React from 'react';
import {
  View, Animated, Image, TouchableOpacity
} from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import ChangeSvg from 'assets/svgs/ChangeSvg';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';
import getStyles from './styles';

const ApplicationSwitcher = ({ onPress }) => {
  const { styles } = useTheme({ styles: getStyles });
  const [currentApplication] = useCurrentBlockchainApplication();

  return (
    <View style={styles.switcherContainer}>
      <TouchableOpacity onPress={onPress} >
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
