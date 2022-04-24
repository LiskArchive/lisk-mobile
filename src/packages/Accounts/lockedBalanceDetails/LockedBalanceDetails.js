/* eslint-disable no-undef */
import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import moment from 'moment';
import { colors, themes } from 'constants/styleGuide';
import { P } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'navigation/headerBackButton';
import { fromRawLsk } from 'utilities/conversions';
import LockSvg from 'assets/svgs/LockSvg';
import ProgressSvg from 'assets/svgs/ProgressSvg';
import UnlockSvg from 'assets/svgs/UnlockSvg';
import FormattedNumber from 'components/shared/formattedNumber';
import getStyles from './styles';
import { getPendingTime } from '../utils';

const RowItem = ({
  styles, title, value, IconComponent, tokenType, language, theme
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
        <IconComponent
          size={1.2}
          color={theme === themes.dark ? colors.dark.ultramarineBlue : colors.light.inkBlue} />
      </View>
      <P style={[styles.text, styles.theme.text]}>{value}</P>
    </View>
  </View>
);

const LockedBalanceDetailsScreen = ({
  account, styles, navigation, t, activeToken, network, language, theme
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
                <P style={[styles.headerText, styles.theme.text]}>{t('Amount')}</P>
              </View>
              <View style={styles.flexOne}>
                <P style={[styles.headerText, styles.theme.text]}>{t('Status')}</P>
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
                theme={theme}
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
                theme={theme}
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
                theme={theme}
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

export const LockedBalanceDetails = connect(mapStateToProps)(
  withTheme(translate()(LockedBalanceDetailsScreen), getStyles())
);