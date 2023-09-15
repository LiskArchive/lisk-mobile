/* eslint-disable max-statements */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { H3 } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import { PrimaryButton } from 'components/shared/toolBox/button';
import ApplicationList from '../ApplicationList/ApplicationList';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import SelectNode from '../SelectNode';
import { useApplicationsManagement } from '../../hooks/useApplicationsManagement';
import { useCurrentApplication } from '../../hooks/useCurrentApplication';

import getStyles from './styles';

const ManageApplication = ({ nextStep, style, navigation }) => {
  const [selectedApplication, setSelectedApplication] = useState({});
  const modal = useModal();

  const { applications } = useApplicationsManagement();

  const [, setCurrentApplication] = useCurrentApplication();

  const { styles } = useTheme({ styles: getStyles });

  const addApplication = () => {
    modal.close();
    navigation.navigate('AddApplication');
  };

  const switchApplication = (acc) => {
    setCurrentApplication(acc);
    modal.close();
  };

  const onUrlSelect = (item) => {
    modal.close(false);
    switchApplication({ ...selectedApplication, serviceURL: item });
  };

  const renderSelectNodeOptions = () =>
    selectedApplication && (
      <SelectNode
        styles={styles}
        onPress={onUrlSelect}
        application={selectedApplication}
        closeModal={() => modal.close(false)}
      />
    );

  const selectNode = () => modal.open(renderSelectNodeOptions());

  const selectApplication = (acc) => {
    if (acc.serviceURLs.length > 1) {
      setSelectedApplication(acc);
      selectNode();
    } else {
      switchApplication({ ...acc, serviceURL: acc.serviceURLs[0] });
    }
  };

  const deleteApplication = (application) => {
    nextStep({ application });
  };

  return (
    <View style={[styles.container, styles.theme.container, style?.container]}>
      <H3 style={[styles.title, styles.theme.title, style?.title]}>
        {i18next.t('application.title.switchApplication')}
      </H3>

      <ApplicationList
        applications={applications}
        Component={ApplicationRow}
        onItemPress={selectApplication}
        showActive
        style={{ container: styles.container }}
        deleteApplication={deleteApplication}
        navigation={navigation}
      />

      <View style={styles.footer}>
        <PrimaryButton onPress={addApplication}>
          {i18next.t('application.manage.add.buttonText')}
        </PrimaryButton>
      </View>
    </View>
  );
};

export default ManageApplication;
