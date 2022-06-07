import React from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';
import { createThemedStyles } from 'utilities/helpers';
import ThemeContext from '../../../contexts/theme';

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
  class WithTheme extends React.Component {
    render() {
      // normalized the forwarded reference
      const props = Object.keys(this.props)
        .filter(key => key !== 'forwardedRef')
        .reduce((acc, key) => {
          acc[key] = this.props[key];
          return acc;
        }, {});
      if (this.props.forwardedRef) {
        props.ref = this.props.forwardedRef;
      }

      return (
        <ThemeContext.Consumer>
          {theme => (
            <WrappedComponent
              {...props}
              styles={createThemedStyles(theme, styles, this.props.noTheme)}
              theme={theme}
            />
          )}
        </ThemeContext.Consumer>
      );
    }
  }

  WithTheme.displayName = `withTheme(${getDisplayName(WrappedComponent)}`;
  const HoistedWithTheme = hoistNonReactStatics(WithTheme, WrappedComponent);

  return forwardRefs
    ? React.forwardRef((props, ref) => (
        <HoistedWithTheme {...props} forwardedRef={ref} />
    ))
    : HoistedWithTheme;
};
