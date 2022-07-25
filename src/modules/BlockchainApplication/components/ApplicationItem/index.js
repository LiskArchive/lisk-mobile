import React from 'react';
import { View, TouchableOpacity, Image } from 'react-native';
import { P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import WarningFilledSvg from 'assets/svgs/WarningFilledSvg';
import getStyles from './styles';
import PinSvg from '../../../../assets/svgs/PinSvg';
import CaretSvg from '../../../../assets/svgs/CaretSvg';

const ApplicationItem = ({
  application,
  onPress,
  active,
  testID,
  image,
  showPinned,
  showCaret,
}) => {
  const { name: applicationName, isDisabled, isPinned } = application;
  const { styles, theme } = useTheme({ styles: getStyles });
  return (
    <TouchableOpacity
      style={[styles.container, styles.theme.container]}
      onPress={onPress}
      testID={testID}
    >
      <Image
        source={{ uri: image }}
        style={[styles.avatar, isDisabled && styles.disabled]}
      />
      <View style={[styles.content, isDisabled && styles.disabled]}>
        <P style={[styles.username, styles.theme.username]}>
          {applicationName}
        </P>
      </View>
      <View style={styles.iconContainer}>
        {active && (
          <View style={styles.icon}>
            <CircleCheckedSvg />
          </View>
        )}
        {showPinned && isPinned && (
          <View style={styles.icon}>
            <PinSvg variant="fill" />
          </View>
        )}
        {showCaret && (
          <View style={styles.icon}>
            <CaretSvg direction="left" />
          </View>
        )}
      </View>
      {isDisabled && <WarningFilledSvg theme={theme} />}
    </TouchableOpacity>
  );
};

export default ApplicationItem;
