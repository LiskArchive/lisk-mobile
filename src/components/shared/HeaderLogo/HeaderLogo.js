import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';
import LiskMobileLogoSvg from 'assets/svgs/LiskMobileLogoSvg';

import { getHeaderLogoStyles } from './HeaderLogo.styles';

/**
 * Renders Lisk logo and project description in a single header component.
 * @param {Object} style - Custom styles for internal components (optional).
 * @param {React.CSSProperties} style.container - Custom styles for component main container.
 * @param {React.CSSProperties} style.logo - Custom styles for the logo.
 * @param {React.CSSProperties} style.title - Custom styles for the title.
 */
export default function HeaderLogo({ style }) {
  const { styles } = useTheme({ styles: getHeaderLogoStyles() });

  return (
    <View style={[styles.container, style?.container]}>
      <LiskMobileLogoSvg style={[styles.logo, style?.logo]} />

      <P style={[styles.title, styles.theme.title, style?.title]}>
        {i18next.t('The official Lisk mobile wallet.')}
      </P>
    </View>
  );
}
