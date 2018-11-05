import React from 'react';
import ThemeContext from '../../contexts/theme';
import { createThemedStyles } from '../../utilities/helpers';

export default function withTheme(Component, styles) {
  return function ThemedComponent(props) {
    return (
      <ThemeContext.Consumer>
        {theme => (
          <Component
            {...props}
            styles={createThemedStyles(theme, styles)}
          />
        )}
      </ThemeContext.Consumer>
    );
  };
}
