import React from 'react';
import ThemeContext from '../../contexts/theme';
import { createThemedStyles } from '../../utilities/helpers';

export default function withTheme(Component, styles, forwardRefs = false) {
  if (forwardRefs) {
    return React.forwardRef((props, ref) => (
      <ThemeContext.Consumer>
        {theme => (
          <Component
            ref={ref}
            {...props}
            styles={createThemedStyles(theme, styles)}
          />
        )}
      </ThemeContext.Consumer>
    ));
  }

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
