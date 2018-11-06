import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ThemeContext from '../../contexts/theme';
import { createThemedStyles } from '../../utilities/helpers';

export default (Component, styles, forwardRefs = false) => {
  if (forwardRefs) {
    const WithTheme = React.forwardRef((props, ref) => (
      <ThemeContext.Consumer>
        {theme => (
          <Component
            {...props}
            ref={ref}
            styles={createThemedStyles(theme, styles)}
          />
        )}
      </ThemeContext.Consumer>
    ));

    hoistNonReactStatics(WithTheme, Component);
    WithTheme.displayName = `withTheme(${Component.displayName || Component.name}`;

    return WithTheme;
  }

  return (props) => {
    const WithTheme = (
      <ThemeContext.Consumer>
        {theme => (
          <Component
            {...props}
            styles={createThemedStyles(theme, styles)}
          />
        )}
      </ThemeContext.Consumer>
    );

    hoistNonReactStatics(WithTheme, Component);
    WithTheme.displayName = `withTheme(${Component.displayName || Component.name}`;

    return WithTheme;
  };
};
