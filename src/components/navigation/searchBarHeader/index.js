/* eslint-disable complexity */
import React, { useRef, useEffect } from 'react'
import { View, Animated, useWindowDimensions, Easing } from 'react-native'
import { translate } from 'react-i18next'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { colors, themes } from 'constants/styleGuide'
import withTheme from 'components/shared/withTheme'
import Input from 'components/shared/toolBox/input'
import Icon from 'components/shared/toolBox/icon'
import { H3, P } from 'components/shared/toolBox/typography'
import getStyles from './styles'

const HeaderBackButton = ({
      theme,
      styles,
      onPress,
      color,
      icon,
      title,
      t,
      noIcon,
      value,
      onChange,
      isSearchOpen,
      setIsSearchOpen,
}) => {
  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white
  }
  const width = useRef(new Animated.Value(0)).current
  const { width: windowWidth } = useWindowDimensions()

  const openSearchBar = () => {
    setIsSearchOpen(true)
  }

  const closeSearchBar = () => {
    setIsSearchOpen(false)
    onChange('')
  }

  useEffect(() => {
    if (isSearchOpen) {
      Animated.timing(width, {
        toValue: 1,
        easing: Easing.elastic(),
        duration: 500,
      }).start()
    } else {
      width.setValue(0)
    }
  }, [isSearchOpen])

  return (
    <View style={styles.navContainer}>
      {isSearchOpen ? (
        <Animated.View
          style={{
            transform: [
              {
                translateX: width.interpolate({
                  inputRange: [0, 1],
                  outputRange: [windowWidth, 0],
                }),
              },
            ],
          }}
        >
          <View style={styles.searchRow}>
            <View style={styles.flex}>
              <Icon
                style={styles.searchIcon}
                name="search"
                size={18}
                color={theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray}
              />
              <Input
                placeholder={t('Search for a bookmark')}
                autoCorrect={false}
                autoFocus
                innerStyles={{
                  input: [styles.input],
                  containerStyle: [styles.inputContainer],
                }}
                placeholderTextColor={
                  theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
                }
                onChange={onChange}
                value={value}
                returnKeyType="search"
              />
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={closeSearchBar}>
              <P style={styles.cancelButton}>{t('Cancel')}</P>
            </TouchableOpacity>
          </View>
        </Animated.View>
      ) : (
        <View style={styles.container}>
          <View style={styles.row}>
            {noIcon ? null : (
              <TouchableOpacity onPress={onPress}>
                <Icon name={icon || 'back'} color={color} />
              </TouchableOpacity>
            )}
            <H3 style={[styles.title, { color }, noIcon && styles.paddingLeft]}>{t(title)}</H3>
          </View>
          <TouchableOpacity onPress={openSearchBar} style={styles.iconButton}>
            <Icon name={'search'} color={colors.light.blueGray} size={18} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default withTheme(translate()(HeaderBackButton), getStyles())
