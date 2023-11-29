/* eslint-disable max-statements */
import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import i18next from 'i18next';

import { H4, P } from 'components/shared/toolBox/typography';
import { themes, colors } from 'constants/styleGuide';
import { useTheme } from 'contexts/ThemeContext';
import SwitchButton from 'components/shared/toolBox/switchButton';
import Checkbox from 'components/shared/Checkbox';
import InfoToggler from 'components/shared/InfoToggler';
import Icon from 'components/shared/toolBox/icon';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import HeaderBackButton from 'components/navigation/headerBackButton';
import PrivacySvg from 'assets/svgs/PrivacySvg';
import KeySvg from 'assets/svgs/KeySvg';
import getStyles from './SettingsScreen.styles';
import MoonSvg from 'assets/svgs/MoonSvg';
import CurrencySvg from 'assets/svgs/CurrencySvg';
import AboutSvg from 'assets/svgs/AboutSvg';
import TermsOfUseSvg from 'assets/svgs/TermsOfUseSvg';

import ItemTitle from '../ItemTitle';

export default function SettingsScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const settings = useSelector((state) => state.settings);

  const [account] = useCurrentAccount();

  const { styles, theme } = useTheme({ styles: getStyles() });

  const navigateToSecurity = () =>
    navigation.navigate('SecurityScreen', {
      account,
    });

  const switchTheme = () =>
    dispatch(
      settingsUpdated({
        theme: settings.theme === themes.dark ? themes.light : themes.dark,
      })
    );

  const toggleUseDerivationPath = () =>
    dispatch(
      settingsUpdated({
        useDerivationPath: !settings.useDerivationPath,
      })
    );

  const toggleShowDerivationPath = () =>
    dispatch(
      settingsUpdated({
        showDerivationPath: !settings.showDerivationPath,
      })
    );

  return (
    <NavigationSafeAreaView>
      <HeaderBackButton title={i18next.t('Settings')} noIcon />

      <ScrollView style={styles.innerContainer} testID={`${theme}-mode`}>
        <View style={styles.group}>
          <H4 style={[styles.subtitle, styles.theme.subtitle]}>
            {i18next.t('settings.headers.general')}
          </H4>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              icon={<KeySvg />}
              title={i18next.t('settings.menu.security')}
              iconSize={22}
              onPress={navigateToSecurity}
              targetStateLabel={
                <Icon
                  name="forward"
                  size={16}
                  style={styles.arrowIcon}
                  color={theme === themes.light ? colors.light.blueGray : colors.dark.white}
                />
              }
            />
          </View>
          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              testID="dark-mode"
              icon={<MoonSvg />}
              targetStateLabel={
                <SwitchButton value={settings.theme === themes.dark} onChange={switchTheme} />
              }
              title={i18next.t('settings.menu.darkMode')}
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon={<CurrencySvg />}
              testID="currency"
              title={i18next.t('settings.menu.currency')}
              target="CurrencySelection"
              targetStateLabel={
                <P style={[styles.itemTitle, styles.theme.targetStateLabel]}>{settings.currency}</P>
              }
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subtitle, styles.theme.subtitle]}>
            {i18next.t('settings.headers.info')}
          </H4>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              target="About"
              testID="about"
              icon={<AboutSvg />}
              title={i18next.t('settings.menu.about')}
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon={<TermsOfUseSvg />}
              testID="terms"
              target="Terms"
              title={i18next.t('settings.menu.terms')}
            />
          </View>

          <View style={[styles.item, styles.theme.item]}>
            <ItemTitle
              navigation={navigation}
              icon={<PrivacySvg />}
              testID="privacy"
              target="PrivacyPolicy"
              title={i18next.t('settings.menu.privacyPolicy')}
            />
          </View>
        </View>

        <View style={styles.group}>
          <H4 style={[styles.subtitle, styles.theme.subtitle]}>
            {i18next.t('settings.headers.advanced')}
          </H4>

          <View style={[styles.item, styles.theme.item]}>
            <View style={styles.row}>
              <Checkbox selected={!settings.useDerivationPath} onPress={toggleUseDerivationPath}>
                <P style={[styles.itemTitle, styles.theme.itemTitle]}>
                  {i18next.t('settings.menu.enableLegacyAccountLabel')}
                </P>
              </Checkbox>

              <InfoToggler
                title={i18next.t('settings.menu.enableLegacyAccountTitle')}
                description={i18next.t('settings.menu.enableLegacyAccountDescription')}
                style={{ toggleButton: styles.infoToggler }}
              />
            </View>
          </View>

          <View style={[styles.item, styles.theme.item]} testID="show-derivation-path">
            <View style={styles.row}>
              <Checkbox selected={settings.showDerivationPath} onPress={toggleShowDerivationPath}>
                <P style={[styles.itemTitle, styles.theme.itemTitle]}>
                  {i18next.t('settings.menu.showDerivationPath')}
                </P>
              </Checkbox>

              <InfoToggler
                title={i18next.t('commons.customDerivationPath')}
                description={i18next.t('auth.setup.customDerivationPathDescription')}
                style={{ toggleButton: styles.infoToggler }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </NavigationSafeAreaView>
  );
}
