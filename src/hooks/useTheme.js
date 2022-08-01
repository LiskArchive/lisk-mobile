import { useContext } from 'react';

import ThemeContext from '../contexts/theme';
import { createThemedStyles } from '../utilities/helpers';

/**
 * Hook for consuming the app theme.
 * @param {styles} styles - Optional style declarations to be themed.
 * @param {boolean} noTheme - Flag to disable theme in case of needed.
 * @returns {Object} - The theme stored by context and the themed styles created based on it.
 */
export function useTheme({ noTheme, styles: baseStyles = {} }) {
  const theme = useContext(ThemeContext);

  const styles = createThemedStyles(theme, baseStyles, noTheme);

  return { theme, styles };
}
