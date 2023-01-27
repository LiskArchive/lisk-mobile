import React from 'react';
import { translate } from 'react-i18next';
import { View } from 'react-native';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useTheme } from 'contexts/ThemeContext';
import ApplicationList from '../ApplicationList/ApplicationList';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import getAddApplicationStyles from './styles';
import { useApplicationsExplorer } from '../../hooks/useApplicationsExplorer';

const AddApplication = ({ navigation, t }) => {
  const { styles } = useTheme({ styles: getAddApplicationStyles() });
  const applications = useApplicationsExplorer();

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton title={t('application.explore.title')} onPress={navigation.goBack} />

      <ApplicationList
        applications={applications}
        Component={ApplicationRow}
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
