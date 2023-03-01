/* eslint-disable max-statements */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';

import { P, H3 } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'contexts/useModal';
import AddSvg from 'assets/svgs/AddSvg';
import getStyles from './styles';
import ApplicationList from '../ApplicationList/ApplicationList';
import ApplicationRow from '../ApplicationRow/ApplicationRow';
import SelectNode from '../SelectNode';
import { useApplicationsManagement } from '../../hooks/useApplicationsManagement';
import { useCurrentApplication } from '../../hooks/useCurrentApplication';

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
        deleteApplication={deleteApplication}
        navigation={navigation}
      />

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.button, styles.outline, styles.theme.outline]}
          onPress={addApplication}
        >
          <View style={styles.icon}>
            <AddSvg />
          </View>
          <P style={styles.buttonText}>{i18next.t('application.manage.add.buttonText')}</P>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ManageApplication;
