import React from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import i18next from 'i18next';
import Toast from 'react-native-toast-message';

import { useModal } from 'hooks/useModal';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { B, Small } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { removeAccountPasswordFromKeychain } from 'modules/Auth/utils/recoveryPhrase';
import getStyles from './styles';

const DisableBioAuth = ({ onSubmit }) => {
  const { styles } = useTheme({ styles: getStyles() });
  const modal = useModal();
  const { sensorType } = useSelector((state) => state.settings);
  const [account, setCurrentAccount] = useCurrentAccount();
  const { setAccount } = useAccounts();

  const confirm = async () => {
    try {
      await removeAccountPasswordFromKeychain(account.metadata.address);
      const newAccount = { ...account, isBiometricsEnabled: false };
      setAccount(newAccount);
      setCurrentAccount(newAccount);
      modal.close();
      onSubmit?.();
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: error?.message,
      });
    }
  };

  return (
    <View>
      <View>
        <B style={[styles.header, styles.theme.rowTitle]}>
          {i18next.t('settings.biometrics.disableTitle', { sensorType })}
        </B>
      </View>
      <Small style={[styles.description, styles.theme.description]}>
        {i18next.t(`settings.biometrics.disableDescription`)}
      </Small>
      <PrimaryButton
        style={styles.button}
        onClick={confirm}
        title={i18next.t(`Disable ${sensorType}`)}
      />
    </View>
  );
};

export default DisableBioAuth;
