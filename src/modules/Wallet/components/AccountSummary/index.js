import React from 'react';
import {
  Animated, TouchableOpacity, View
} from 'react-native';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Avatar from 'components/shared/avatar';
import { fromRawLsk } from 'utilities/conversions';
import FormattedNumber from 'components/shared/formattedNumber';
import { P, B } from 'components/shared/toolBox/typography';
import { stringShortener } from 'utilities/helpers';
import withTheme from 'components/shared/withTheme';
import { colors, themes } from 'constants/styleGuide';
import CopyToClipboard from 'components/shared/copyToClipboard';
import Icon from 'components/shared/toolBox/icon';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction
} from 'modules/Accounts/store/actions';
import getStyles from './styles';

const AView = Animated.View;
// eslint-disable-next-line max-statements
const AccountSummary = ({
  styles,
  account,
  followedAccounts,
  settings: { token },
  language,
  t,
  navigation,
  theme
}) => {
  const normalizedBalance = fromRawLsk(account.balance);
  const isFollowed = followedAccounts.find(
    (item) => item.address === account.address
  );

  const sendLSK = () =>
    navigation.navigate({
      key: Math.random(),
      name: 'Home',
      params: {
        screen: 'Send',
        params: {
          query: { address: account.address }
        }
      }
    });

  return <AView style={[styles.walletContainer, styles.theme.walletContainer]}>
    <View style={styles.container}>
      <View style={[styles.addressContainer, styles.theme.addressContainer]}>
        <View>
          <B style={[styles.label, styles.theme.label]}>{isFollowed?.label}</B>
          <CopyToClipboard
            labelStyle={[styles.copy, styles.theme.copy]}
            iconStyle={styles.icon}
            label={stringShortener(account.address, 6, 5)}
            showIcon={true}
            iconSize={14}
            value={account.address}
            type={P}
          />
        </View>
        <Avatar address={account.address} size={51} />
      </View>
      <View style={[styles.balanceRow]}>
        <P style={styles.theme.copy}>{t('Balance')}</P>
        <FormattedNumber
          tokenType={token.active}
          style={[styles.walletBalance, styles.theme.walletBalance]}
          type={B}
          language={language}
        >
          {normalizedBalance}
        </FormattedNumber>
      </View>
      <TouchableOpacity style={[styles.button, styles.theme.button]} onPress={sendLSK} >
        <Icon
          name="send"
          size={18}
          style={styles.sendIcon}
          color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
        />
        <P style={styles.theme.send}>{t('Send LSK')}</P>
      </TouchableOpacity>
    </View>
  </AView>;
};

// TODO: Implement bookmark
const mapStateToProps = state => ({
  followedAccounts: [],
  settings: state.settings,
  activeToken: state.settings.token.active,
  language: state.settings.language
});

const mapDispatchToProps = ({
  accountFollowed: accountFollowedAction,
  accountUnFollowed: accountUnFollowedAction
});

export default withTheme(
  translate()(connect(mapStateToProps, mapDispatchToProps)(AccountSummary)), getStyles()
);
