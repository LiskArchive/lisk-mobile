/* eslint-disable max-len */
import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { P } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import AddSvg from 'assets/svgs/AddSvg';
import { colors, themes } from 'constants/styleGuide';
import getStyles from './styles';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import ApplicationList from '../ApplicationList';
import BlockchainApplicationRow from '../BlockchainApplicationRow';

const SwitchAccount = ({ t, navigation }) => {
  const { applications } = useBlockchainApplicationManagement();
  const [, setApplication] = useCurrentBlockchainApplication();
  const { styles, theme } = useTheme({ styles: getStyles });
  const selectApplication = (acc) => {
    setApplication(acc);
    navigation.goBack();
  };

  const addApplication = () => {
    navigation.navigate('AddApplication');
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        noIcon
        title={t('application.title.switchApplication')}
        onPress={navigation.goBack}
        rightIcon="cross"
        rightColor={
          theme === themes.dark ? colors.dark.white : colors.light.zodiacBlue
        }
        onRightPress={navigation.goBack}
      />
      <ApplicationList
        applications={applications.data}
        Component={BlockchainApplicationRow}
        onItemPress={selectApplication}
        showActive
      />
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.button, styles.outline, styles.theme.outline]}
          onPress={addApplication}
        >
          <View style={styles.icon}>
            <AddSvg />
          </View>
          <P style={styles.buttonText}>{t('application.manage.add')}</P>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default translate()(SwitchAccount);
