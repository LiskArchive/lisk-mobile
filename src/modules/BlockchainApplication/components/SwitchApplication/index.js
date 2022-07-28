/* eslint-disable max-statements */
/* eslint-disable max-len */
import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import ModalBox from 'react-native-modalbox';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import AddSvg from 'assets/svgs/AddSvg';
import { colors, themes } from 'constants/styleGuide';
import getStyles from './styles';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import ApplicationList from '../ApplicationList';
import BlockchainApplicationRow from '../ApplicationRow';
import SelectNode from '../SelectNode';

const SwitchApplication = ({ t, navigation }) => {
  const { applications } = useBlockchainApplicationManagement();
  const [, setApplication] = useCurrentBlockchainApplication();
  const { styles, theme } = useTheme({ styles: getStyles });
  const [selectedApplication, setSelectedApplication] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addApplication = () => {
    navigation.navigate('AddApplication');
  };

  const toggleModal = (bool) => {
    setIsModalOpen(bool);
  };

  const switchApplication = (acc) => {
    setApplication(acc);
    navigation.goBack();
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

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        noIcon
        title={t('application.title.switchApplication')}
        onPress={navigation.goBack}
        rightIcon="cross"
        rightColor={theme === themes.dark ? colors.dark.white : colors.light.zodiacBlue}
        onRightPress={navigation.goBack}
      />
      <ApplicationList
        applications={applications}
        Component={BlockchainApplicationRow}
        onItemPress={selectApplication}
        showActive
        navigation={navigation}
      />
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.button, styles.outline, styles.theme.outline]}
          onPress={addApplication}
        >
          <View style={styles.icon}>
            <AddSvg />
          </View>
          <P style={styles.buttonText}>{t('application.manage.add.buttonText')}</P>
        </TouchableOpacity>
      </View>
      <ModalBox
        position="bottom"
        isOpen={isModalOpen}
        onClosed={() => toggleModal(false)}
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
      </ModalBox>
    </SafeAreaView>
  );
};

export default translate()(SwitchApplication);
