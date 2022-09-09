import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import Modal from 'react-native-modalbox'
import Icon from 'components/shared/toolBox/icon'
import { useTheme } from 'hooks/useTheme'
import { colors, themes } from 'constants/styleGuide'
import getStyles from './styles'

const BottomModal = ({ showClose = true, show, toggleShow, children, style, ...props }) => {
  const { styles, theme } = useTheme({ styles: getStyles() })

  return (
    <Modal
      isOpen={show}
      onClosed={() => toggleShow(false)}
      backdropColor={theme === themes.dark ? colors.dark.volcanicSand : colors.light.dark}
      position="bottom"
      coverScreen
      style={[styles.container, styles.theme.container, style?.container]}
      {...props}
    >
      <View style={[styles.horizontalLine, styles.theme.horizontalLine]} />

      {showClose && (
        <TouchableOpacity
          style={[styles.closeButtonContainer, styles.theme.closeButtonContainer]}
          onPress={() => toggleShow(false)}
        >
          <Icon name="cross" color={colors.light.ultramarineBlue} size={20} />
        </TouchableOpacity>
      )}

      {children}
    </Modal>
  )
}

export default BottomModal
