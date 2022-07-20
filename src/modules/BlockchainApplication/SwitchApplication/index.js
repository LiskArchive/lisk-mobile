/* eslint-disable max-len */
import React from 'react';
import { View, SafeAreaView, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import ApplicationItem from '../components/ApplicationItem';
import getStyles from './styles';
import { useCurrentBlockchainApplication } from '../hooks/useCurrentBlockchainApplication';
import { useBlockchainApplicationManagement } from '../hooks/useBlockchainApplicationManagement';
import AddSvg from '../../../assets/svgs/AddSvg';

const SwitchAccount = ({ t, navigation }) => {
  const { applications } = useBlockchainApplicationManagement();
  const [application, setApplication] = useCurrentBlockchainApplication();
  const { styles } = useTheme({ styles: getStyles });
  const selectApplication = (acc) => {
    setApplication(acc);
  };

  return (
    <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
      <HeaderBackButton
        title={t('auth.setup.switch_account')}
        onPress={navigation.goBack}
      />
      <ScrollView style={styles.container}>
        {applications.map((app) => (
          <ApplicationItem
            key={app.chainID}
            application={app}
            onPress={() => selectApplication(app)}
            active={app.chainID === application?.chainID}
          />
        ))}
      </ScrollView>
      <View style={styles.bottom}>
        <TouchableOpacity
          style={[styles.button, styles.outline, styles.theme.outline]}
        >
          <View style={styles.icon}>
            <AddSvg />
          </View>
          <P style={styles.buttonText} >{t('application.management.add')}</P>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default translate()(SwitchAccount);
