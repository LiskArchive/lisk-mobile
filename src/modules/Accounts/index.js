/* eslint-disable no-shadow */
import React from 'react';
import {
  SafeAreaView, TouchableOpacity, View
} from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { useTheme } from 'hooks/useTheme';
import { useDispatch, useSelector } from 'react-redux';
import { P } from 'components/shared/toolBox/typography';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import IncognitoSvg from 'assets/svgs/IncognitoSvg';
import CopyToClipboard from 'components/shared/copyToClipboard';
import { settingsUpdated } from 'modules/Settings/actions';

import getStyles from './styles';

import ApplicationSwitcher from '../BlockchainApplication/components/ApplicationSwitcher';
import { useAccountTokens } from './hooks/useAccounts/useAccountTokens';
import { useCurrentAccount } from './hooks/useAccounts/useCurrentAccount';

/**
 * This component would be mounted first and would be used to config and redirect
 * the application to referer page or Sign In
 *
 * @todo Implement release notification
 * @todo Implement custom message: this can be used in case we need to notify the user
 * about any unforeseen issue/change
 */

// eslint-disable-next-line max-statements
const Home = () => {
  const [currAccount] = useCurrentAccount();
  const { address, name: username } = currAccount.metadata;
  const discrete = useSelector(state => state.settings.discrete);
  const dispatch = useDispatch();
  const { tokens } = useAccountTokens(address);

  console.log('tokens', tokens);

  const { styles } = useTheme({ styles: getStyles() });

  const switchAccount = () => { };

  const toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection');
    dispatch(settingsUpdated({
      discrete: !discrete
    }));
  };

  return (
    <SafeAreaView style={[styles.flex, styles.theme.homeContainer]}>
      <View style={[styles.row, styles.alignItemsCenter, styles.topContainer]} >
        <TouchableOpacity style={[styles.discreteContainer]} onPress={toggleIncognito} >
          <IncognitoSvg size={1.2} disabled={discrete} />
        </TouchableOpacity>
        <View style={styles.flex} >
          <ApplicationSwitcher />
        </View>
      </View>
      <View style={[styles.body]} >
        <View style={[styles.accountCard]} >
          <View style={[styles.row]} >
            <Avatar address={address} size={50} />
            <View style={[styles.accountDetails]} >
              <P style={[styles.username, styles.theme.username]} >{username}</P>
              <View>
                <CopyToClipboard
                  labelStyle={[styles.address, styles.theme.address]}
                  label={stringShortener(address, 7, 6)}
                  iconColor={colors.light.platinumGray}
                />
              </View>
            </View>
            <TouchableOpacity style={[styles.switchContainer]} onPress={switchAccount} >
              <SwitchSvg />
            </TouchableOpacity>
          </View>
          <View style={[styles.row, styles.buttonContainer]} >
            <TouchableOpacity style={[styles.button]} >
              <P style={[styles.buttonText]} >Request</P>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.button, styles.sendButton]} >
              <P style={[styles.buttonText, styles.sendButtonText]} >Send</P>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;
