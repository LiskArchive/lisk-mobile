import React from 'react';
import { View } from 'react-native';
import i18next from 'i18next';
import { useNavigation } from '@react-navigation/native';
import { P, H2 } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import MigrateIllustration from 'assets/svgs/MigrateIllustration';
import { PrimaryButton } from 'components/shared/toolBox/button';
import getStyles from './Version2MigrationScreen.styles';

export default function Version2MigrationScreen({ recoveryPhrase }) {
  const navigation = useNavigation();

  const { styles } = useTheme({ styles: getStyles() });

  const handleSetupPasswordPress = () =>
    navigation.navigate('PasswordSetupForm', { recoveryPhrase });

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
      <View style={styles.footer}>
        <PrimaryButton
          style={styles.button}
          textStyle={styles.buttonText}
          onPress={handleSetupPasswordPress}
        >
          {i18next.t('auth.setup.migration.button.continue')}
        </PrimaryButton>
      </View>
    </View>
  );
}
