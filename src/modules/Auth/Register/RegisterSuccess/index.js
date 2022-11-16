import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';
import { SafeAreaView } from 'react-native-safe-area-context';

import { P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import HeaderPlaceholderButton from 'components/navigation/headerPlaceholderButton';
import { useNavigation } from '@react-navigation/native';
import image from 'assets/images/registrationProcess/success3x.png';

import styles from './styles';

export default function RegisterSuccess({ hideNav }) {
  const navigation = useNavigation();

  useEffect(() => {
    hideNav();

    navigation.setOptions({
      headerLeft: () => <HeaderPlaceholderButton />,
      title: i18next.t('Perfect! You’re all set'),
    });
  }, [navigation, hideNav]);

  return (
    <SafeAreaView style={styles.wrapper}>
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <P style={styles.subTitle}>
              {i18next.t('Great! now you can use your passphrase to sign in to your account.')}
            </P>
          </View>

          <View style={styles.imageContainer}>
            <Image style={styles.image} source={image} />
          </View>
        </View>

        <View>
          <PrimaryButton
            testID="registerSuccess"
            style={styles.button}
            onClick={() =>
              navigation.reset({
                index: 0,
                routes: [{ name: 'AuthMethod' }],
              })
            }
          >
            {i18next.t('Continue to Add account')}
          </PrimaryButton>
        </View>
      </View>
    </SafeAreaView>
  );
}
