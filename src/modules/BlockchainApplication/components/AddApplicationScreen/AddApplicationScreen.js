import React from 'react';
import { SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import HeaderBackButton from 'components/navigation/headerBackButton';
import { useTheme } from 'contexts/ThemeContext';
import ResultScreen from 'components/screens/ResultScreen';
import EmptyApplicationsIllustrationSvg from 'assets/svgs/EmptyIllustrationSvg';
import ApplicationList from '../ApplicationList/ApplicationList';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import { useApplicationsExplorer } from '../../hooks/useApplicationsExplorer';
import { useApplicationsLocalStorage } from '../../hooks/useApplicationsLocalStorage';
import { isMainchainApplication } from '../../utils';

import getAddApplicationStyles from './AddApplicationScreen.styles';

export default function AddApplicationScreen() {
  const navigation = useNavigation();

  const applications = useApplicationsExplorer();

  const { data: applicationsStorageData } = useApplicationsLocalStorage();

  const { styles } = useTheme({ styles: getAddApplicationStyles() });

  const filteredApplications = applications.data?.reduce((acc, app) => {
    const isAppAlreadyAdded = !!applicationsStorageData?.find(
      (addedApp) => addedApp.chainID === app.chainID
    );

    if (isAppAlreadyAdded || isMainchainApplication(app.chainID)) {
      return acc;
    }

    return [...acc, app];
  }, []);

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title={i18next.t('application.explore.title')}
        onPress={navigation.goBack}
      />

      <ApplicationList
        applications={{ ...applications, data: filteredApplications }}
        Component={ApplicationRow}
        onItemPress={(item) =>
          navigation.navigate('ApplicationDetails', {
            chainID: item.chainID,
            variant: 'manage',
          })
        }
        showCaret
        renderEmpty={() => (
          <ResultScreen
            illustration={<EmptyApplicationsIllustrationSvg />}
            description="All applications are now added to the application management list."
          />
        )}
        style={{ container: styles.applicationsListContainer }}
      />
    </SafeAreaView>
  );
}
