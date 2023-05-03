import React from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useModal } from 'hooks/useModal';
import { themes, colors } from 'constants/styleGuide';
import { B, Small } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import Icon from 'components/shared/toolBox/icon';
import { PrimaryButton } from 'components/shared/toolBox/button';
import i18next from 'i18next';
import { settingsUpdated } from 'modules/Settings/store/actions';
import {
  bioMetricAuthentication,
  storeAccountPasswordInKeyChain,
} from 'modules/Auth/utils/passphrase';
import getStyles from './styles';

const EnableBioAuth = ({ onSubmit, sharedData = {} }) => {
  const { styles, theme } = useTheme({ styles: getStyles() });
  const { address, password } = sharedData;
  const dispatch = useDispatch();
  const modal = useModal();
  const { sensorType } = useSelector((state) => state.settings);

  const confirm = () => {
    bioMetricAuthentication({
      successCallback: async () => {
        if (password && address) {
          await storeAccountPasswordInKeyChain(address, password);
        }
        modal.close();
        dispatch(settingsUpdated({ biometricsEnabled: true }));
        if (onSubmit) {
          onSubmit();
        }
      },
    });
  };

  return (
    <View>
      <B style={[styles.header, styles.theme.rowTitle]}>
        {i18next.t('settings.biometrics.enableTitle', { sensorType })}
      </B>
      <View style={[styles.row, styles.separator, styles.theme.separator]}>
        <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
          <Icon
            name="secure"
            color={
              theme === themes.light ? colors.light.ultramarineBlue : colors.dark.ultramarineBlue
            }
            size={30}
          />
        </View>
        <View style={styles.textWrapper}>
          <B style={[styles.rowTitle, styles.theme.rowTitle]}>
            {i18next.t('settings.biometrics.title1')}
          </B>
          <Small style={[styles.description, styles.theme.description]}>
            {i18next.t(`settings.biometrics.description1`)}
          </Small>
        </View>
      </View>
      <View style={[styles.row, styles.separator, styles.theme.separator]}>
        <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
          <Icon
            name="settings-bg"
            color={
              theme === themes.light ? colors.light.ultramarineBlue : colors.dark.ultramarineBlue
            }
            size={30}
          />
        </View>
        <View style={styles.textWrapper}>
          <B style={[styles.rowTitle, styles.theme.rowTitle]}>
            {i18next.t('settings.biometrics.title2')}
          </B>
          <Small style={[styles.description, styles.theme.description]}>
            {i18next.t(`settings.biometrics.description2`, { sensorType })}
          </Small>
        </View>
      </View>
      <PrimaryButton
        style={styles.button}
        onClick={confirm}
        title={i18next.t(`Enable ${sensorType}`)}
      />
    </View>
  );
};

export default EnableBioAuth;
