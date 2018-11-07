import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ThemeContext from '../../contexts/theme';
import { createThemedStyles } from '../../utilities/helpers';

export default (Component, styles, forwardRefs = false) => {
  if (forwardRefs) {
    class WithTheme extends React.Component {
      render() {
        const { forwardedRef, ...rest } = this.props;

        return (
          <ThemeContext.Consumer>
            {theme => (
              <Component
                ref={forwardedRef}
                styles={createThemedStyles(theme, styles)}
                theme={theme}
                {...rest}
              />
            )}
          </ThemeContext.Consumer>
        );
      }
    }

    WithTheme.displayName = `withTheme(${Component.displayName || Component.name}`;
    hoistNonReactStatics(WithTheme, Component);
    return React.forwardRef((props, ref) => <WithTheme {...props} forwardedRef={ref} />);
  }

  class WithTheme extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {theme => (
            <Component
              {...this.props}
              styles={createThemedStyles(theme, styles)}
              theme={theme}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }

  WithTheme.displayName = `withTheme(${Component.displayName || Component.name}`;
  return hoistNonReactStatics(WithTheme, Component);
};
