import React from 'react';
import { View, Animated, Image, TouchableOpacity } from 'react-native';

import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import ApplicationManagerModal from 'modules/BlockchainApplication/components/ApplicationManagerModal';
import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';
import { useModal } from 'contexts/useModal';
import ChangeSvg from 'assets/svgs/ChangeSvg';
import { useNavigation } from '@react-navigation/native';

import getStyles from './styles';

const ApplicationSwitcher = () => {
  const [currentApplication] = useCurrentApplication();
  const { showModal } = useModal();
  const navigation = useNavigation();

  const showManageApplicationModal = () =>
    showModal(<ApplicationManagerModal navigation={navigation} />);

  const { styles } = useTheme({ styles: getStyles });

  return (
    <View style={styles.switcherContainer} testID="switch-application-container">
      <TouchableOpacity onPress={showManageApplicationModal}>
        <View style={[styles.container, styles.theme.container]}>
          <Animated.View style={[styles.switch]}>
            <Image source={{ uri: currentApplication.data?.logo.png }} style={[styles.avatar]} />
            <P style={[styles.appName, styles.theme.appName]}>
              {currentApplication.data?.chainName}
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
