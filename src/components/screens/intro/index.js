/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SplashScreen from 'react-native-splash-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import { translate } from 'react-i18next';
import activityHistoryImg from 'assets/images/intro/activityHistory3x.png';
import tokensTransferImg from 'assets/images/intro/tokensTransfer3x.png';
import secureAuthenticationImg from 'assets/images/intro/secureAuthentication3x.png';
import easyAccessImg from 'assets/images/intro/easyAccess3x.png';
import { useApplicationsMetaQuery } from 'modules/BlockchainApplication/api/useApplicationsMetaQuery';
import { useApplicationsManagement } from 'modules/BlockchainApplication/hooks/useApplicationsManagement';
import { useCurrentApplication } from 'modules/BlockchainApplication/hooks/useCurrentApplication';
import Heading from './heading';
import Splash from './splash';
import styles from './styles';

const Intro = ({ navigation, t }) => {
  const { data: chainMetaData } = useApplicationsMetaQuery();
  const { addApplication } = useApplicationsManagement();
  const [, setCurrentApplication] = useCurrentApplication();

  const skip = () => {
    AsyncStorage.setItem('@lisk-mobile-intro', 'true');
    navigation.push('AuthMethod', { signOut: true });
  };

  useEffect(() => {
    const timeout = setTimeout(() => SplashScreen.hide(), 500);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (chainMetaData) {
      chainMetaData.data.map((data) => addApplication(data));
      setCurrentApplication(chainMetaData.data[0]);
    }
  }, [chainMetaData]);

  const descriptionContent = [
    {
      step: 1,
      title: t('Activity history'),
      description: t(
        'Get a full overview of your current balance, transaction history and much more.'
      ),
      imageSrc: activityHistoryImg,
      imageStyle: styles.illustration,
    },
    {
      step: 2,
      title: t('Token transfer'),
      description: t('Transfer your tokens easily to other accounts, by simply scanning QR Codes.'),
      imageSrc: tokensTransferImg,
      imageStyle: styles.illustration,
    },
    {
      step: 3,
      title: t('Secure authentication'),
      description: t('Access all functions via advanced biometric authentication.'),
      imageSrc: secureAuthenticationImg,
      imageStyle: styles.illustration,
    },
    {
      step: 4,
      title: t('Easy access'),
      description: t('Create an account using passphrase to access your LSK cryptocurrency.'),
      imageSrc: easyAccessImg,
      imageStyle: styles.illustration,
      acceptTermsSwitch: true,
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper} testID="intro-screen">
        <Splash />
        <Heading skip={skip} descriptionContent={descriptionContent} testID="intro" />
      </View>
    </SafeAreaView>
  );
};
export default translate()(Intro);
