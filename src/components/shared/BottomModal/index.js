import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modalbox';
import Icon from 'components/shared/toolBox/icon';
import { useTheme } from 'hooks/useTheme';
import { colors, themes } from 'constants/styleGuide';
import getStyles from './styles';

const BottomModal = ({
  showClose = true, isOpen, toggleModal, children, style
}) => {
  const { styles, theme } = useTheme({ styles: getStyles() });
  return (
    <Modal
      isOpen={isOpen}
      onClosed={() => toggleModal(false)}
      style={[styles.wrapper, styles.theme.wrapper, style]}
      backdropColor={theme === themes.dark ? colors.dark.volcanicSand : colors.light.white }
      position="bottom"
    >
      <View style={styles.row} >
        <View style={[styles.horizontalLine, styles.theme.horizontalLine]} />
      </View>
      {showClose && (
        <TouchableOpacity
          style={[styles.closeButton, styles.theme.closeButton]}
          onPress={() => toggleModal(false)}
        >
          <Icon name="cross" color={colors.light.ultramarineBlue} size={20} />
        </TouchableOpacity>
      )}
      <View style={[styles.body]}>{children}</View>
    </Modal>
  );
};

export default BottomModal;
