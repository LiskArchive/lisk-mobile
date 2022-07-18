import { useContext } from 'react';

import ThemeContext from '../contexts/theme';
import { createThemedStyles } from '../utilities/helpers';

export function useTheme({ noTheme, styles: baseStyles }) {
  const theme = useContext(ThemeContext);

  const styles = createThemedStyles(theme, baseStyles, noTheme);

  return { theme, styles };
}
