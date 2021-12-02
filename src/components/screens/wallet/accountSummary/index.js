import React from 'react';
import { View, Animated, Dimensions } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import {
  accountFollowed as accountFollowedAction,
  accountUnFollowed as accountUnFollowedAction,
} from '../../../../actions/accounts';
import Avatar from '../../../shared/avatar';
import Icon from '../../../shared/toolBox/icon';
import { fromRawLsk } from '../../../../utilities/conversions';
import FormattedNumber from '../../../shared/formattedNumber';
import { tokenMap, tokenKeys } from '../../../../constants/tokens';
import Share from '../../../shared/share';
import { P, H2 } from '../../../shared/toolBox/typography';
import { IconButton } from '../../../shared/toolBox/button';
import easing from '../../../../utilities/easing';
import { stringShortener } from '../../../../utilities/helpers';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';
import { colors } from '../../../../constants/styleGuide';
import DeleteBookmarkModal from '../../../shared/bookmarks/deleteBookmarkModal';
import modalHolder from '../../../../utilities/modal';

@connect(
  state => ({
    followedAccounts: state.accounts.followed,
    settings: state.settings,
    activeToken: state.settings.token.active,
    language: state.settings.language,
  }),
  {
    accountFollowed: accountFollowedAction,
    accountUnFollowed: accountUnFollowedAction,
  }
)
class AccountSummary extends React.Component {
  state = {
    modalVisible: false,
    addressWidth: 0,
    initialAnimations: {
      opacity: new Animated.Value(0),
      top: new Animated.Value(-20),
    },
    followed: false,
  };

  toggleModal() {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  }

  interpolate = (inputRange, outputRange) =>
    this.props.scrollY.interpolate({
      inputRange,
      outputRange,
      extrapolate: 'clamp',
    });

  initialFadeIn = () => {
    const { opacity, top } = this.state.initialAnimations;
    Animated.timing(opacity, {
      toValue: 1,
      duration: 400,
      delay: 100,
    }).start();
    Animated.timing(top, {
      toValue: 0,
      duration: 400,
      delay: 100,
      easing: easing.easeInOutQuart,
    }).start();
  };

  toggleBookmark = () => {
    const {
      followedAccounts,
      account,
      navigation,
      accountUnFollowed,
      t,
      activeToken,
    } = this.props;

    const isFollowed = followedAccounts[activeToken].some(
      item => item.address === account.address
    );

    if (isFollowed) {
      modalHolder.open({
        title: 'Delete bookmark',
        component: DeleteBookmarkModal,
        callback: () => accountUnFollowed(account.address),
      });
    } else {
      navigation.navigate({
        name: 'AddBookmark',
        params: {
          account,
          title: t('Add bookmark'),
        },
      });
    }
  };

  componentDidMount() {
    this.screenWidth = Dimensions.get('window').width;
    this.initialFadeIn();
  }

  render() {
    const {
      styles,
      account,
      followedAccounts,
      activeToken,
      settings: { token },
      theme,
      navigation,
      language,
    } = this.props;
    const address = token.active === tokenKeys[1]
      ? stringShortener(account.address, 10, 10)
      : account.address;

    const { interpolate } = this;
    const AView = Animated.View;
    const { opacity, top } = this.state.initialAnimations;
    const normalizedBalance = fromRawLsk(account.balance);
    const height = 203;
    const isFollowed = followedAccounts[activeToken].some(
      item => item.address === account.address
    );

    return (
      <AView
        style={[
          styles.walletContainer,
          styles.theme.walletContainer,
          this.props.style,
          { opacity, top, height },
          { marginTop: interpolate([0, height + 10], [0, -1 * (height - 1)]) },
        ]}
      >
        <AView
          style={[
            styles.avatarContainer,
            { opacity },
            { marginTop: interpolate([0, 100], [0, 100]) },
          ]}
        >
          {token.active === 'LSK' ? (
            <Avatar address={account.address} size={51} />
          ) : (
            <View
              style={[styles.tokenLogoWrapper, styles.walletTokenLogoWrapper]}
            >
              <Icon
                style={styles.tokenLogo}
                name={tokenMap[token.active].icon}
                size={30}
                color={colors.light.whiteSmoke}
              />
            </View>
          )}
        </AView>
        <AView
          style={[
            styles.address,
            { opacity },
            {
              opacity: this.interpolate([0, 45], [1, 0]),
              top: this.interpolate([0, 115], [0, 80]),
            },
          ]}
        >
          <Share
            type={P}
            style={[styles.addressP, styles.theme.walletAddress]}
            iconColor={colors.light.blueGray}
            containerStyle={styles.addressContainer}
            value={account.address}
            title={address}
            icon={true}
          />
        </AView>
        <AView
          style={[
            styles.balance,
            { opacity },
            {
              opacity: this.interpolate([0, 30], [1, 0]),
              top: this.interpolate([0, 100], [0, 80]),
            },
          ]}
        >
          <FormattedNumber
            tokenType={token.active}
            style={styles.theme.walletBalance}
            type={H2}
            language={language}
          >
            {normalizedBalance}
          </FormattedNumber>
        </AView>
        <AView
          style={[
            styles.actionBar,
            { opacity },
            {
              opacity: this.interpolate([0, 15], [1, 0]),
              top: this.interpolate([0, 85], [0, 80]),
            },
          ]}
        >
          <IconButton
            style={[styles.sendButton, styles.theme.sendButton]}
            title=""
            icon={isFollowed ? 'bookmarks-filled' : 'bookmarks'}
            color={colors[theme].ultramarineBlue}
            iconSize={20}
            onClick={this.toggleBookmark}
          />
          <IconButton
            style={[styles.sendButton, styles.theme.sendButton]}
            title=""
            icon="send"
            color={colors[theme].ultramarineBlue}
            iconSize={20}
            onClick={() => {
              navigation.navigate({
                name: 'Main',
                params: {
                  screen: 'Send',
                  params: {
                    query: { address: account.address },
                  },
                },
              });
            }}
          />
        </AView>
      </AView>
    );
  }
}

export default withTheme(translate()(AccountSummary), getStyles());
