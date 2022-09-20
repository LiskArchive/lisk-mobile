import React from 'react';
import { TouchableOpacity, View, Modal, ScrollView } from 'react-native';
import Icon from 'components/shared/toolBox/icon';
import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
import getStyles from './styles';

const BottomModal = ({ showClose = true, show, toggleShow, children }) => {
  const { styles } = useTheme({ styles: getStyles() });

  return (
    <Modal transparent visible={show} onRequestClose={() => toggleShow(false)}>
      <View style={[styles.overlay, styles.theme.overlay]}>
        <View style={[styles.container, styles.theme.container]}>
          <View style={[styles.horizontalLine, styles.theme.horizontalLine]} />

          {showClose && (
            <TouchableOpacity
              style={[styles.closeButtonContainer, styles.theme.closeButtonContainer]}
              onPress={() => toggleShow(false)}
            >
              <Icon name="cross" color={colors.light.ultramarineBlue} size={20} />
            </TouchableOpacity>
          )}
          <ScrollView>{children}</ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default BottomModal;
