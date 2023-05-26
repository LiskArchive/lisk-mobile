import React from 'react';
import i18next from 'i18next';
import { View, Text } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton } from 'components/shared/toolBox/button';
import getNotFoundStyles from './styles';

const NotFound = ({ onContinue }) => {
  const { styles } = useTheme({ styles: getNotFoundStyles() });

  return (
    <View style={[styles.container, styles.theme.container]}>
      <Text style={[styles.title, styles.theme.title]}>{i18next.t('notFound.title')}</Text>
      <Text style={[styles.description, styles.theme.description]}>
        {i18next.t('notFound.description')}
      </Text>
      <PrimaryButton style={styles.button} onPress={onContinue}>
        {i18next.t('commons.buttons.continue')}
      </PrimaryButton>
    </View>
  );
};

export default NotFound;
