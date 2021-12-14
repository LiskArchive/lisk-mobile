import React, { useEffect, useMemo, useState } from 'react';
import {
  View, Text, ScrollView, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import moment from 'moment';
import { colors } from '../../../../../constants/styleGuide';
import { B, P } from '../../../../shared/toolBox/typography';
import withTheme from '../../../../shared/withTheme';
import HeaderBackButton from '../../../router/headerBackButton';
import getStyles from './styles';
import { fromRawLsk } from '../../../../../utilities/conversions';

const getPendingTime = (unvoteHeight, unlockHeight) => {
  const awaitingBlocks = unlockHeight - unvoteHeight;
  const secondsToUnlockAllBalance = awaitingBlocks * 10;
  const momentSeconds = moment().second(secondsToUnlockAllBalance);
  return moment().to(momentSeconds, true);
};

const LockedBalanceDetails = ({
  account, styles, navigation, t, activeToken, network
}) => {
  const [lockedTokens, setLockedTokens] = useState({});
  const tokensToUnlock = account[activeToken]?.unlocking ?? [];

  const networkHeight = useMemo(() => network.height, [network]);

  useEffect(() => {
    const lockedTokensHashMap = {};
    tokensToUnlock.forEach((token) => {
      const pendingTime = getPendingTime(network.height, token.height.end);
      if (lockedTokensHashMap[pendingTime]) {
        lockedTokensHashMap[pendingTime].push(token);
      } else {
        lockedTokensHashMap[pendingTime] = [token];
      }
    });
    setLockedTokens(lockedTokensHashMap);
  }, [networkHeight]);

  return (
    <SafeAreaView style={styles.theme.container}>
      <ScrollView style={[styles.container]}>
        <HeaderBackButton
          noIcon
          title="Locked balance details"
          rightIcon="cross"
          rightColor={colors.dark.ultramarineBlue}
          onRightPress={navigation.goBack}
        />
        <View style={styles.content}>
          <P style={styles.theme.infoText}>
            {t('Find details of your locked balance and the unlock waiting period.')}
          </P>
          <View style={styles.tableContent}>
            <View style={[styles.row, styles.theme.row]}>
              <View style={styles.flexOne}>
                <B style={[styles.text, styles.theme.text]}>{t('Amount')}</B>
              </View>
              <View style={styles.flexOne}>
                <B style={[styles.text, styles.theme.text]}>{t('Status')}</B>
              </View>
            </View>
            {Object.keys(lockedTokens).map((time) => (
              <View style={[styles.row, styles.theme.row]} key={time}>
                <View style={styles.flexOne}>
                  <P style={[styles.text, styles.theme.text]}>
                    {fromRawLsk(lockedTokens[time].reduce((a, b) => a + Number(b.amount), 0))}
                  </P>
                </View>
                <View style={styles.flexOne}>
                  <P style={[styles.text, styles.theme.text]}>
                    {t('will be available to unlock', {
                      timeToUnlock: time
                    })}
                  </P>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  account: state.accounts.info || {},
  activeToken: state.settings.token.active,
  network: state.network
});

export default connect(mapStateToProps)(withTheme(translate()(LockedBalanceDetails), getStyles()));
