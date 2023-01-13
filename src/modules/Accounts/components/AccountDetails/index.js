import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useTheme } from 'contexts/ThemeContext';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';

import getAccountDetailsStyles from './styles';

/**
 * Renders an account details screen given an address by route params.
 * @TODO - Implement this component.
 */
export default function AccountDetails() {
  const navigation = useNavigation();
  const route = useRoute();

  const { styles } = useTheme({ styles: getAccountDetailsStyles() });

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
