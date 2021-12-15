import React from 'react';
import {
  View, Text, ScrollView, SafeAreaView
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { colors } from '../../../../../constants/styleGuide';
import { B, P } from '../../../../shared/toolBox/typography';
import withTheme from '../../../../shared/withTheme';
import HeaderBackButton from '../../../router/headerBackButton';
import getStyles from './styles';

const LockedBalanceDetails = ({
  account, styles, navigation, t
}) => {
  console.log('account', account);
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
            <View style={[styles.row, styles.theme.row]}>
              <View style={styles.flexOne}>
                <P style={[styles.text, styles.theme.text]}>{t('Amount')}</P>
              </View>
              <View style={styles.flexOne}>
                <P style={[styles.text, styles.theme.text]}>{t('locked')}</P>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  account: state.accounts.info || {},
  transactions: state.transactions,
  incognito: state.settings.incognito,
  activeToken: state.settings.token.active,
  btcIntroShown: state.settings.btcIntroShown,
  settings: state.settings,
  followedAccounts: state.accounts.followed || []
});

export default connect(mapStateToProps)(withTheme(translate()(LockedBalanceDetails), getStyles()));
