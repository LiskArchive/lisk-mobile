import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import ColectiImg from 'assets/images/mocks/colecti.png';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import WarningFilledSvg from 'assets/svgs/WarningFilledSvg';
import getStyles from './styles';

const ApplicationItem = ({
  application, onPress, active, testID, image
}) => {
  const { name: applicationName, isDisabled } = application;
  const { styles, theme } = useTheme({ styles: getStyles });
  return (
    <TouchableOpacity
      style={[styles.container, styles.theme.container]}
      onPress={onPress}
      testID={testID}
    >
      <Image source={{ uri: image }} style={[styles.avatar, isDisabled && styles.disabled]} />
      <View style={[styles.content, isDisabled && styles.disabled]}>
        <P style={[styles.username, styles.theme.username]}>
          {applicationName}
        </P>
      </View>
      {active && <CircleCheckedSvg />}
      {isDisabled && <WarningFilledSvg theme={theme} />}
    </TouchableOpacity>
  );
};

export default ApplicationItem;
