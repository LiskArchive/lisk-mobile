/* eslint-disable complexity */
import React, { useRef, useEffect } from 'react';
import { View, Animated, useWindowDimensions, Easing } from 'react-native';
import i18next from 'i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from 'hooks/useTheme';
import Input from 'components/shared/toolBox/input';
import Icon from 'components/shared/toolBox/icon';
import { H3, P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import SearchSvg from 'assets/svgs/SearchSvg';

import getStyles from './styles';

export default function HeaderSearchBar({
  onPress,
  color,
  icon,
  title,
  noIcon,
  value,
  onChange,
  isSearchOpen,
  setIsSearchOpen,
}) {
  const { theme, styles } = useTheme({
    styles: getStyles(),
  });

  if (!color) {
    color = theme === themes.light ? colors.light.black : colors.dark.white;
  }
  const width = useRef(new Animated.Value(0)).current;
  const { width: windowWidth } = useWindowDimensions();

  const openSearchBar = () => {
    setIsSearchOpen(true);
  };

  const closeSearchBar = () => {
    setIsSearchOpen(false);
    onChange('');
  };

  useEffect(() => {
    if (isSearchOpen) {
      Animated.timing(width, {
        toValue: 1,
        easing: Easing.elastic(),
        duration: 500,
      }).start();
    } else {
      width.setValue(0);
    }
  }, [isSearchOpen, width]);

  return (
    <View>
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
              <Input
                placeholder={i18next.t('Search for a bookmark')}
                autoCorrect={false}
                autoFocus
                innerStyles={{ input: [styles.input] }}
                placeholderTextColor={
                  theme === themes.dark ? colors.dark.ultramarineBlue : colors.light.blueGray
                }
                onChange={onChange}
                value={value}
                returnKeyType="search"
                adornments={{
                  left: (
                    <SearchSvg
                      color={
                        theme === themes.dark ? colors.dark.ultramarineBlue : colors.light.blueGray
                      }
                    />
                  ),
                }}
              />
            </View>
            <TouchableOpacity style={styles.iconButton} onPress={closeSearchBar}>
              <P style={styles.cancelButton}>{i18next.t('Cancel')}</P>
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
            <H3 style={[styles.title, { color }, noIcon && styles.paddingLeft]}>
              {i18next.t(title)}
            </H3>
          </View>
          <TouchableOpacity onPress={openSearchBar} style={styles.iconButton}>
            <Icon name={'search'} color={colors.light.blueGray} size={18} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}
