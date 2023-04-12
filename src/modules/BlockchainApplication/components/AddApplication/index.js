import React from 'react';
import { translate } from 'react-i18next';
import { SafeAreaView } from 'react-native';

import HeaderBackButton from 'components/navigation/headerBackButton';
import { useTheme } from 'contexts/ThemeContext';
import ApplicationList from '../ApplicationList/ApplicationList';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import { useApplicationsExplorer } from '../../hooks/useApplicationsExplorer';

import getAddApplicationStyles from './styles';

const AddApplication = ({ navigation, t }) => {
  const applications = useApplicationsExplorer('manage');

  const { styles } = useTheme({ styles: getAddApplicationStyles() });

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton title={t('application.explore.title')} onPress={navigation.goBack} />

      <ApplicationList
        applications={applications}
        Component={ApplicationRow}
        onItemPress={(item) =>
          navigation.navigate('ApplicationDetails', {
            chainID: item.chainID,
            variant: 'manage',
          })
        }
        showCaret
        style={{ container: styles.applicationsListContainer }}
      />
    </SafeAreaView>
  );
};

export default translate()(AddApplication);
