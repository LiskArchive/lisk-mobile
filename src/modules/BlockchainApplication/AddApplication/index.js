import React from 'react';
import { translate } from 'react-i18next';
import { View } from 'react-native';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useTheme } from 'hooks/useTheme';
import ApplicationList from '../components/ApplicationList';
import getAddApplicationStyles from './styles';
import { useBlockchainApplicationExplorer } from '../hooks/useBlockchainApplicationExplorer';
import ApplicationItem from '../components/ApplicationItem';

const AddApplication = ({ navigation, t }) => {
  const { styles } = useTheme({ styles: getAddApplicationStyles() });
  const { applications } = useBlockchainApplicationExplorer();

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title={t('blockchainApplicationsList.title')}
        onPress={navigation.goBack}
      />
      <ApplicationList
        applications={applications.data}
        Component={ApplicationItem}
        onItemPress={(item) =>
          navigation.navigate('ApplicationDetail', {
            chainID: item.chainID,
            variant: 'manage'
          })
        }
      />
    </View>
  );
};

export default translate()(AddApplication);
