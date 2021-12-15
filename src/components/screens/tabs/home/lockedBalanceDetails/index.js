/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import moment from 'moment';
import { colors } from '../../../../../constants/styleGuide';
import { B, P } from '../../../../shared/toolBox/typography';
import withTheme from '../../../../shared/withTheme';
import HeaderBackButton from '../../../router/headerBackButton';
import getStyles from './styles';
import { fromRawLsk } from '../../../../../utilities/conversions';
import LockSvg from '../../../../../assets/svgs/LockSvg';
import ProgressSvg from '../../../../../assets/svgs/ProgressSvg';
import UnlockSvg from '../../../../../assets/svgs/UnlockSvg';
import FormattedNumber from '../../../../shared/formattedNumber';

const getPendingTime = (unvoteHeight, unlockHeight) => {
  const awaitingBlocks = unlockHeight - unvoteHeight;
  const secondsToUnlockAllBalance = awaitingBlocks * 10;
  const momentSeconds = moment().second(secondsToUnlockAllBalance);
  return moment().to(momentSeconds, true);
};

const RowItem = ({
  styles, title, value, IconComponent, tokenType, language
}) => (
  <View style={[styles.row, styles.theme.row]}>
    <View style={styles.flex}>
      <FormattedNumber
        type={P}
        style={[styles.text, styles.theme.text]}
        tokenType={tokenType}
        language={language}
      >
        {title}
      </FormattedNumber>
    </View>
    <View style={[styles.flexOne, styles.flexRow]}>
      <View style={styles.iconContainer}>
        <IconComponent size={1.2} />
      </View>
      <P style={[styles.text, styles.theme.text]}>{value}</P>
    </View>
  </View>
);

const LockedBalanceDetails = ({
  account, styles, navigation, t, activeToken, network, language
}) => {
  const [unlockedTokens, setUnunlockedTokens] = useState({});
  const [availableTokens, setAvailableTokens] = useState([]);
  const [lockedTokensSum, setLockedTokensSum] = useState('');

  const networkHeight = useMemo(() => network.height, [network]);
  const sentVotes = useMemo(() => account[activeToken].sentVotes, [account]);

  useEffect(() => {
    const tokensToUnlock = account[activeToken]?.unlocking ?? [];
    const unlockedTokensHashMap = {};
    const availableToUnlock = [];
    tokensToUnlock.forEach((token) => {
      const pendingTime = getPendingTime(network.height, token.height.end);
      if (network.height > token.height.end) {
        availableToUnlock.push(token);
      } else if (unlockedTokensHashMap[pendingTime]) {
        unlockedTokensHashMap[pendingTime].push(token);
      } else {
        unlockedTokensHashMap[pendingTime] = [token];
      }
    });
    setAvailableTokens(availableToUnlock);
    setUnunlockedTokens(unlockedTokensHashMap);
  }, [networkHeight]);

  useEffect(() => {
    if (sentVotes?.length) {
      setLockedTokensSum(sentVotes.reduce((a, b) => a + BigInt(b.amount), BigInt(0)));
    }
  }, [sentVotes]);

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
              <View style={styles.flex}>
                <B style={[styles.text, styles.theme.text]}>{t('Amount')}</B>
              </View>
              <View style={styles.flexOne}>
                <B style={[styles.text, styles.theme.text]}>{t('Status')}</B>
              </View>
            </View>
            {lockedTokensSum ? (
              <RowItem
                title={fromRawLsk(lockedTokensSum)}
                value={t('locked')}
                IconComponent={LockSvg}
                styles={styles}
                tokenType={activeToken}
                language={language}
              />
            ) : null}
            {Object.keys(unlockedTokens).map((time) => (
              <RowItem
                key={time}
                title={fromRawLsk(
                  unlockedTokens[time].reduce((a, b) => a + BigInt(b.amount), BigInt(0))
                )}
                value={t('will be available to unlock', {
                  timeToUnlock: time
                })}
                IconComponent={ProgressSvg}
                styles={styles}
                tokenType={activeToken}
                language={language}
              />
            ))}
            {availableTokens.length ? (
              <RowItem
                title={fromRawLsk(
                  availableTokens.reduce((a, b) => a + BigInt(b.amount), BigInt(0))
                )}
                value={t('available to unlock (only on desktop)')}
                IconComponent={UnlockSvg}
                styles={styles}
                tokenType={activeToken}
                language={language}
              />
            ) : null}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  account: state.accounts.info || {},
  activeToken: state.settings.token.active,
  network: state.network,
  language: state.settings.language,
});

export default connect(mapStateToProps)(withTheme(translate()(LockedBalanceDetails), getStyles()));
