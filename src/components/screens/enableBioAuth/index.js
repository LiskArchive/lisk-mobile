import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { themes, colors } from 'constants/styleGuide';
import { B, P, Small } from 'components/shared/toolBox/typography';
import { useTheme } from 'contexts/ThemeContext';
import Icon from 'components/shared/toolBox/icon';
import { PrimaryButton } from 'components/shared/toolBox/button';
import i18next from 'i18next';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { settingsUpdated } from 'modules/Settings/store/actions';
import getStyles from './styles';

const EnableBioAuth = ({ navigation, route }) => {
  const { styles, theme } = useTheme({ styles: getStyles() });
  const dispatch = useDispatch();

  const confirm = () => {
    dispatch(settingsUpdated({ biometricsEnabled: true }));
    navigation.pop();
  };

  const title = route.params?.title ?? 'Bio Auth';

  useEffect(() => {
    navigation.setOptions({
      title: null,
      headerLeft: (props) => (
        <HeaderBackButton title={`Enable ${title}`} onPress={navigation.goBack} {...props} />
      ),
    });
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={[styles.container, styles.theme.container]}>
        <View>
          <P style={[styles.subHeader, styles.theme.subHeader]}>
            {i18next.t('Here’s what you need to know:')}
          </P>
          <View style={[styles.row, styles.separator, styles.theme.separator]}>
            <View style={styles.iconWrapper}>
              <Icon
                name="passphrase"
                color={
                  theme === themes.light
                    ? colors.light.ultramarineBlue
                    : colors.dark.ultramarineBlue
                }
                size={30}
              />
            </View>
            <View style={styles.textWrapper}>
              <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                {i18next.t('settings.biometrics.description')}
              </B>
              <Small style={[styles.description, styles.theme.description]}>
                {i18next.t('settings.biometrics.title1')}
                {i18next.t('settings.biometrics.description1')}
              </Small>
            </View>
          </View>
          <View style={[styles.row, styles.separator, styles.theme.separator]}>
            <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
              <Icon
                name="secure"
                color={
                  theme === themes.light
                    ? colors.light.ultramarineBlue
                    : colors.dark.ultramarineBlue
                }
                size={30}
              />
            </View>
            <View style={styles.textWrapper}>
              <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                {i18next.t('settings.biometrics.title2')}
              </B>
              <Small style={[styles.description, styles.theme.description]}>
                {i18next.t(`settings.biometrics.description2`)}
              </Small>
            </View>
          </View>
          <View style={[styles.row, styles.separator, styles.theme.separator]}>
            <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
              <Icon
                name="settings-bg"
                color={
                  theme === themes.light
                    ? colors.light.ultramarineBlue
                    : colors.dark.ultramarineBlue
                }
                size={30}
              />
            </View>
            <View style={styles.textWrapper}>
              <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                {i18next.t('settings.biometrics.title3')}
              </B>
              <Small style={[styles.description, styles.theme.description]}>
                {i18next.t(`settings.biometrics.description3`, { title })}
              </Small>
            </View>
          </View>
        </View>
        <PrimaryButton
          style={styles.button}
          onClick={confirm}
          title={i18next.t(`Enable ${title}`)}
        />
      </View>
    </View>
  );
};

export default EnableBioAuth;
