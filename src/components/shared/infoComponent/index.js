import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import InfoRoundSvg from 'assets/svgs/InfoRoundSvg'
import { P, B } from '../toolBox/typography'
import withTheme from '../withTheme'
import getStyles from './styles'

const InfoComponent = ({ text, buttonText, onPress, styles }) => (
  <View style={[styles.container, styles.theme.container]}>
    <InfoRoundSvg />
    <View style={styles.description}>
      <P style={[styles.copy, styles.theme.copy]}>{text}</P>
    </View>
    <TouchableOpacity onPress={onPress}>
      <B style={[styles.theme.button]}>{buttonText}</B>
    </TouchableOpacity>
  </View>
)

export default withTheme(InfoComponent, getStyles())
