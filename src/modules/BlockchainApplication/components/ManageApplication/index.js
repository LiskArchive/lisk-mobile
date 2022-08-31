/* eslint-disable max-statements */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import i18next from 'i18next';
import BottomModal from 'components/shared/BottomModal';
import { P, H3 } from 'components/shared/toolBox/typography';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'hooks/useTheme';
import AddSvg from 'assets/svgs/AddSvg';
import getStyles from './styles';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import ApplicationList from '../ApplicationList';
import BlockchainApplicationRow from '../ApplicationRow';
import SelectNode from '../SelectNode';

const ManageApplication = ({ closeModal, nextStep }) => {
  const navigation = useNavigation();
  const { applications } = useBlockchainApplicationManagement();
  const [, setApplication] = useCurrentBlockchainApplication();
  const { styles } = useTheme({ styles: getStyles });
  const [selectedApplication, setSelectedApplication] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addApplication = () => {
    closeModal();
    navigation.navigate('AddApplication');
  };

  const toggleModal = (bool) => {
    setIsModalOpen(bool);
  };

  const switchApplication = (acc) => {
    setApplication(acc);
    closeModal();
  };

  const onUrlSelect = (item) => {
    toggleModal(false);
    switchApplication({ ...selectedApplication, serviceURL: item });
  };

  const selectApplication = (acc) => {
    if (acc.apis.length > 1) {
      setSelectedApplication(acc);
      toggleModal(true);
    } else {
      switchApplication({ ...acc, serviceURL: acc.apis[0] });
    }
  };

  const deleteApplication = application => {
    nextStep({ application });
  };

  return (
    <View style={[styles.wrapper, styles.theme.wrapper]}>
      <H3>{i18next.t('application.title.switchApplication')}</H3>
      <ApplicationList
        applications={applications}
        Component={BlockchainApplicationRow}
        onItemPress={selectApplication}
        showActive
        navigation={navigation}
        deleteApplication={deleteApplication}
      />
      <View style={styles.bottom}>
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
      <BottomModal
        show={isModalOpen}
        toggleShow={() => toggleModal(false)}
        style={styles.modal}
      >
        {selectedApplication && (
          <SelectNode
            styles={styles}
            onPress={onUrlSelect}
            application={selectedApplication}
            closeModal={() => toggleModal(false)}
          />
        )}
      </BottomModal>
    </View>
  );
};

export default ManageApplication;
