import React from 'react';
import { translate } from 'react-i18next';
import { View } from 'react-native';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useTheme } from 'hooks/useTheme';
import ApplicationList from '../ApplicationList';
import getAddApplicationStyles from './styles';
import { useBlockchainApplicationExplorer } from '../../hooks/useBlockchainApplicationExplorer';
import BlockchainApplicationRow from '../ApplicationRow';

const AddApplication = ({ navigation, t }) => {
  const { styles } = useTheme({ styles: getAddApplicationStyles() });
  const { applicationsMetadata } = useBlockchainApplicationExplorer();

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title={t('application.explore.title')}
        onPress={navigation.goBack}
        titleStyle={[styles.header]}
      />

      <ApplicationList
        applications={applicationsMetadata}
        Component={BlockchainApplicationRow}
        onItemPress={(item) =>
          navigation.navigate('ApplicationDetail', {
            chainID: item.chainID,
            variant: 'manage',
          })
        }
        showCaret
        style={{ container: styles.applicationsListContainer }}
      />
    </View>
  );
};

export default translate()(AddApplication);
