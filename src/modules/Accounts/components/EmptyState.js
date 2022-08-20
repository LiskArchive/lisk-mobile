import React from 'react';
import {
  View,
} from 'react-native';
import EmptyStateSvg from 'assets/svgs/EmptyStateSvg';
import { P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import getStyles from './styles';

const EmptyState = ({
  message
}) => {
  const { styles } = useTheme({ styles: getStyles() });
  return (
    <View style={[styles.emptyState]} testID="empty-transaction-list" >
      <EmptyStateSvg />
      {message && <View>
        <P style={[styles.message]} >{message}</P>
      </View>}
    </View>
  );
};

export default EmptyState;
