import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';

import getAccountDetailsScreenStyles from './AccountDetailsScreen.styles';

/**
 * Renders an account details screen given an address by route params.
 * @TODO - Implement this component.
 * (details on https://github.com/LiskHQ/lisk-mobile/issues/1601).
 */
export default function AccountDetailsScreen() {
  const navigation = useNavigation();
  const route = useRoute();

  const { styles } = useTheme({ styles: getAccountDetailsScreenStyles() });

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <HeaderBackButton title="Account Details" onPress={navigation.goBack} />

      <View style={[styles.body]}>
        <P style={[styles.text, styles.theme.text, { marginBottom: 8 }]}>
          Screen not available yet.
        </P>

        <P style={[styles.text, styles.theme.text, { marginBottom: 8 }]}>
          Address: {route.params?.address}
        </P>
      </View>
    </SafeAreaView>
  );
}
