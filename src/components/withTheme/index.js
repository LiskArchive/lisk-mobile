import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import ThemeContext from '../../contexts/theme';
import { createThemedStyles } from '../../utilities/helpers';

const getDisplayName = Component =>
  Component.displayName || Component.name || 'Component';

/**
 * React Navigation has a problem with rendering components as
 * route handlers when they're wrapped with React's forwardRef API.
 * Because of this, we need to avoid using refs in them.
 * https://github.com/react-navigation/react-navigation/issues/5193
 *
 * However, it's safe to use refs in child components and forwardRefs flag
 * should be true when wrapping them with this HOC.
 */
export default (WrappedComponent, styles, forwardRefs = false) => {
  if (forwardRefs) {
    class WithTheme extends React.Component {
      render() {
        const { forwardedRef, ...rest } = this.props;

        return (
          <ThemeContext.Consumer>
            {theme => (
              <WrappedComponent
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

    WithTheme.displayName = `withTheme(${getDisplayName(WrappedComponent)}`;
    hoistNonReactStatics(WithTheme, WrappedComponent);
    return React.forwardRef((props, ref) => <WithTheme {...props} forwardedRef={ref} />);
  }

  class WithTheme extends React.Component {
    render() {
      return (
        <ThemeContext.Consumer>
          {theme => (
            <WrappedComponent
              {...this.props}
              styles={createThemedStyles(theme, styles)}
              theme={theme}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }

  WithTheme.displayName = `withTheme(${getDisplayName(WrappedComponent)}`;
  return hoistNonReactStatics(WithTheme, WrappedComponent);
};
