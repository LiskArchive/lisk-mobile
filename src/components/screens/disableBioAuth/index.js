import React from 'react';
import { View } from 'react-native';
import { useModal } from 'hooks/useModal';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useDispatch, useSelector } from 'react-redux';
import { B, Small } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton } from 'components/shared/toolBox/button';
import i18next from 'i18next';
import {
  bioMetricAuthentication,
  removeAccountPasswordFromKeychain,
} from 'modules/Auth/utils/passphrase';
import { settingsUpdated } from 'modules/Settings/store/actions';
import getStyles from './styles';

const DisableBioAuth = () => {
  const { styles } = useTheme({ styles: getStyles() });
  const dispatch = useDispatch();
  const modal = useModal();
  const { sensorType } = useSelector((state) => state.settings);
  const [account] = useCurrentAccount();

  const confirm = () => {
    bioMetricAuthentication({
      successCallback: () => {
        removeAccountPasswordFromKeychain(account.metadata.address);
        modal.close();
        dispatch(settingsUpdated({ biometricsEnabled: false }));
      },
    });
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
