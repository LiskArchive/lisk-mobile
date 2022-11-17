import React, { useEffect } from 'react';
import { SafeAreaView, View, Image } from 'react-native';
import i18next from 'i18next';

import { H4, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useNavigation } from '@react-navigation/native';
import image from 'assets/images/registrationProcess/success3x.png';

import styles from './styles';

export default function RegisterSuccess({ hideNav }) {
  const navigation = useNavigation();

  useEffect(() => {
    hideNav();

    navigation.setOptions({
      headerLeft: () => <HeaderBackButton noIcon title={i18next.t('Create Account')} />,
      title: null,
    });
  }, [navigation, hideNav]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.body}>
        <View style={styles.titleContainer}>
          <H4 style={styles.title}>{i18next.t('Perfect! You’re all set')}</H4>

          <P style={styles.subTitle}>
            {i18next.t('Great! now you can use your passphrase to sign in to your account.')}
          </P>
        </View>

        <View style={styles.imageContainer}>
          <Image style={styles.image} source={image} />
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          testID="registerSuccess"
          style={styles.button}
          onClick={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'AuthMethod', params: { authRequired: true } }],
            })
          }
        >
          {i18next.t('Continue to Add account')}
        </PrimaryButton>
      </View>
    </SafeAreaView>
  );
}
