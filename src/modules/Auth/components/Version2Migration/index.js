import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { P, H2 } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import MigrateIllustration from 'assets/svgs/MigrateIllustration';
import { PrimaryButton } from 'components/shared/toolBox/button';
import getStyles from './styles';

const Version2Migration = ({ recoveryPhrase }) => {
  const navigation = useNavigation();

  const { styles } = useTheme({ styles: getStyles() });

  const setupPassword = () => {
    navigation.navigate('PasswordSetupForm', { recoveryPhrase });
  };

  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>
        <View>
          <H2 style={styles.title}>{i18next.t('auth.setup.migration.title')}</H2>
          <P style={styles.content}>{i18next.t('auth.setup.migration.content')}</P>
        </View>
      </View>
      <View style={[styles.flex, styles.illustrationContainer]}>
        <MigrateIllustration />
      </View>
      <View>
        <PrimaryButton style={styles.button} textStyle={styles.buttonText} onPress={setupPassword}>
          {i18next.t('auth.setup.migration.button.continue')}
        </PrimaryButton>
      </View>
    </View>
  );
};

export default Version2Migration;
