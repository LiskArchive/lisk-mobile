import React from 'react';
import { translate } from 'react-i18next';
import { View } from 'react-native';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useTheme } from 'hooks/useTheme';
import ApplicationList from '../components/ApplicationList';
import getAddApplicationStyles from './styles';

const AddApplication = ({ navigation, t }) => {
  const { styles } = useTheme({ styles: getAddApplicationStyles() });

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]} >
      <HeaderBackButton
        title={t('blockchainApplicationsList.title')}
        onPress={navigation.goBack}
      />
      <ApplicationList />
    </View>
  );
};

export default translate()(AddApplication);
