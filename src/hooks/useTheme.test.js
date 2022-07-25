import React from 'react';
import { renderHook } from '@testing-library/react-hooks';

import { themes } from 'constants/styleGuide';
import ThemeContext from '../contexts/theme';
import * as helpers from '../utilities/helpers';

import { useTheme } from './useTheme';

describe('useTheme hook', () => {
  const defaultProps = {
    noTheme: false, styles: { marginTop: 4 }
  };
  const defaultTheme = themes.dark;

  jest
    .spyOn(helpers, 'createThemedStyles')
    .mockImplementation(() => defaultProps.styles);

  it('should be defined', () => {
    expect(useTheme).toBeDefined();
  });

  it('returns correct values after on change', async () => {
    const wrapper = ({ children }) => (
      <ThemeContext.Provider value={defaultTheme}>
        {children}
      </ThemeContext.Provider>
    );

    const { result } = renderHook(() => useTheme(defaultProps), { wrapper });

    expect(result.current.styles).toMatchObject(defaultProps.styles);
    expect(result.current.theme).toBe(defaultTheme);
  });
});
