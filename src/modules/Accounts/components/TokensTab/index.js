import React, { memo } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import { colors } from 'constants/styleGuide';
import tokensTabStyles from './styles';
import CaretSvg from '../../../../assets/svgs/CaretSvg';

const TokensTab = ({ tokens }) => {
  const { styles } = useTheme({ styles: tokensTabStyles });

  console.log(tokens);

  return <View style={styles.container} >
    <View style={styles.row} >
      <View style={styles.tabsContainer} >
        <TouchableOpacity style={[styles.tabItem, styles.tabItemActive]} >
          <P style={[styles.tabItemText, styles.tabItemTextActive]} >Tokens</P>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.tabItem]} >
          <P style={[styles.tabItemText]} >Locked tokens</P>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={[styles.tabItem, styles.row]} >
        <P style={[styles.tabItemText, styles.viewAll]} >View all</P>
        <View style={[styles.viewIcon]} >
          <CaretSvg height={15} width={15} direction='right' color={colors.light.ultramarineBlue} />
        </View>
      </TouchableOpacity>
    </View>
  </View>;
};

export default memo(TokensTab);
