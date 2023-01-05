import React, { useContext } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

import { themes, colors } from 'constants/styleGuide';
import { createThemedStyles } from '../utilities/helpers';

export const ThemeContext = React.createContext(themes.light);

export function ThemeProvider({ children }) {
  const { theme } = useSelector((state) => state.settings);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme === themes.dark ? colors.dark.black : colors.light.white,
      }}
    >
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </View>
  );
}

/**
 * Hook for consuming the app theme.
 * @param {styles} styles - Optional style declarations to be themed.
 * @param {boolean} noTheme - Flag to disable theme in case of needed.
 * @returns {Object} - The theme stored by context and the themed styles created based on it.
 */
export function useTheme({ noTheme, styles: baseStyles = {} } = {}) {
  const theme = useContext(ThemeContext);

  const styles = createThemedStyles(theme, baseStyles, noTheme);

  return { theme, styles };
}
