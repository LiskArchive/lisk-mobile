import React from 'react'
import { View, ScrollView } from 'react-native'
import ModalBox from 'react-native-modalbox'
import { translate } from 'react-i18next'
import { boxes, colors, themes } from 'constants/styleGuide'
import { deviceHeight, headerHeight } from 'utilities/device'
import ModalHolder from 'utilities/modal'
import { B } from '../toolBox/typography'
import withTheme from '../withTheme'
import getStyles from './styles'
import Icon from '../toolBox/icon'

class Modal extends React.Component {
  state = {
    headerStyle: {},
    contentStyle: {},
    Component: View,
    title: '',
    modalCallback: () => true,
  }

  updateModal = (config) => {
    this.setState({
      title: this.props.t(config.title),
      Component: config.component || null,
      modalCallback: config.callback,
    })
  }

  closeModal = () => {
    ModalHolder.close()
  }

  setHeaderHeight = ({ nativeEvent }) => {
    const viewHeight = nativeEvent.layout.height
    const headerStyle = { height: headerHeight() }
    const contentStyle = { paddingTop: headerHeight() + boxes.boxPadding }
    if (viewHeight >= deviceHeight()) {
      this.setState({ headerStyle, contentStyle })
    }
  }

  render() {
    const { styles, theme } = this.props
    const { contentStyle, headerStyle } = this.state
    const { title, Component, modalCallback } = this.state

    return (
      <ModalBox
        position={'bottom'}
        style={styles.modal}
        ref={(ref) => ModalHolder.initialize(ref, this.updateModal)}
      >
        <View style={styles.wrapper}>
          <View style={[styles.container, styles.theme.container]}>
            <View style={[styles.titleContainer, styles.theme.titleContainer, headerStyle]}>
              <B style={[styles.title, styles.theme.title]}>{title}</B>
              <Icon
                onPress={this.closeModal}
                name="cross"
                color={theme === themes.light ? colors.light.black : colors.dark.white}
                style={styles.closeButton}
              />
            </View>
            <ScrollView>
              <View style={[styles.contentContainer, contentStyle]}>
                <Component modalCallback={modalCallback} close={this.closeModal} />
              </View>
            </ScrollView>
          </View>
        </View>
      </ModalBox>
    )
  }
}

export default withTheme(translate()(Modal), getStyles())
