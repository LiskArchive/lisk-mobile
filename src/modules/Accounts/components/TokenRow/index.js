/* eslint-disable max-statements */
import React from 'react';
import { View } from 'react-native';
import { P, H3 } from 'components/shared/toolBox/typography';
import { fromRawLsk } from 'utilities/conversions';
import { useTheme } from 'hooks/useTheme';
import TokenSvg from 'assets/svgs/TokenSvg';

import getTokenRowStyles from './styles';

export default function TokenRow({ token }) {
  const balance = Number(fromRawLsk(token.availableBalance)).toLocaleString();

  const { styles } = useTheme({ styles: getTokenRowStyles() });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.row, styles.alignCenter]}>
        <TokenSvg symbol="LSK" height={28} width={28} />

        <P style={[styles.title, styles.theme.title]}>Lisk</P>
      </View>

      <View style={[styles.balanceContainer]}>
        <H3 style={[styles.theme.title]}>{balance}</H3>

        {/* TODO: Implement currency conversion */}
        <P style={[styles.theme.currency]}>25USD</P>
      </View>
    </View>
  );
}
