import React, { useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { H4, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import AllSetIllustrationSvg from 'assets/svgs/AllSetIllustrationSvg';

import getRegisterSuccessStyles from './styles';

export default function RegisterSuccess({ hideNav }) {
  const navigation = useNavigation();

  const { styles } = useTheme({
    styles: getRegisterSuccessStyles(),
  });

  useEffect(() => {
    hideNav();

    navigation.setOptions({
      headerLeft: () => <HeaderBackButton noIcon title={i18next.t('auth.register.title')} />,
      title: null,
    });
  }, [navigation, hideNav]);

  return (
    <SafeAreaView style={[styles.container, styles.theme.container]}>
      <View style={[styles.body]}>
        <H4 style={[styles.title, styles.theme.title]}>
          {i18next.t('auth.register.success.title')}
        </H4>

        <AllSetIllustrationSvg style={styles.illustration} />
      </View>

      <View style={[styles.footer]}>
        <P style={[styles.description, styles.theme.description]}>
          {i18next.t('auth.register.success.description')}
        </P>

        <PrimaryButton
          testID="register-continue-button"
          style={styles.button}
          onClick={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'AuthMethod', params: { authRequired: true } }],
            })
          }
        >
          {i18next.t('auth.register.success.continueButtonText')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
