import React from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton, LabelButton } from 'components/shared/toolBox/button';
import TxErrorSvg from 'assets/svgs/TxErrorSvg';

import getSendTokenErrorStyles from './styles';

export default function SendTokenError({ onClick }) {
  const { styles } = useTheme({
    styles: getSendTokenErrorStyles(),
  });

  return (
    <View style={[styles.container, styles.theme.container]}>

      <View style={[styles.body]}>
        <View style={styles.illustrationContainer}>
          <TxErrorSvg />
        </View>

        <Text style={[styles.title, styles.theme.title]}>Transaction failed</Text>

        <Text style={[styles.subtitle, styles.theme.subtitle]}>
          There was an error on the transaction. Please try again.
        </Text>

      </View>

      <View>
        <PrimaryButton
          onClick={onClick}
          title="Try again"
          style={[styles.tryAgainButton]}
        />

        <Text style={[styles.actionLabel, styles.theme.actionLabel]}>
          Is the problem persisting?
        </Text>

        <LabelButton
          onClick={() => console.log('report error via email...')}
          textStyle={{ fontSize: 14, lineHeight: 0, marginBottom: 24 }}
        >
          Report the error via email
        </LabelButton>
      </View>
    </View>
  );
}
