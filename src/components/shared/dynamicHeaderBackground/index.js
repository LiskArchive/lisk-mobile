import React from 'react'
import connect from 'redux-connect-decorator'
import { View } from 'react-native'
import withTheme from 'components/shared/withTheme'
import getStyles from './styles'

@connect((state) => ({
  settings: state.settings,
}))
class DynamicHeaderBackground extends React.Component {
  render() {
    const {
      settings: { token },
      styles,
    } = this.props

    return <View style={[styles.header, styles.theme[token.active]]} />
  }
}

export default withTheme(DynamicHeaderBackground, getStyles())
