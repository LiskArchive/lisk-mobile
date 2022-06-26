import React from 'react';
import {
  BackHandler, View, SafeAreaView, TouchableOpacity, Linking
} from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';

import MultiStep from 'components/shared/multiStep';
import withTheme from 'components/shared/withTheme';
import { tokenMap } from 'constants/tokens';
import { B, P } from 'components/shared/toolBox/typography';
import SendLSKIllustrationSvg from 'assets/svgs/SendLSKIllustrationSvg';
import HeaderBackButton from 'components/navigation/headerBackButton';
import {
  Amount, Overview, Recipient, SecondPassphrase, Result
} from './components';
import getStyles from './styles';

@connect(
  (state) => ({
    accounts: state.account.summary,
    settings: state.settings
  }),
  {}
)
class Send extends React.Component {
  state = {
    showProgressBar: true,
    query: {}
  };

  componentDidMount() {
    const { navigation } = this.props;
    this.subs = [
      navigation.addListener('focus', this.didFocus),
      navigation.addListener('blur', this.willBlur)
    ];
  }

  componentDidUpdate(prevProps) {
    // Reset the progress if active token has changed
    if (prevProps.settings.token.active !== this.props.settings.token.active) {
      this.resetMultiStep();
    }
  }

  componentWillUnmount() {
    this.subs.forEach((sub) => sub?.remove?.());
  }

  resetMultiStep = () => {
    const query = this.props.route.params?.query ?? {};
    this.setState({ query });
    this.nav?.reset?.(query);
  };

  checkQuery = () => {
    const query = this.props.route.params?.query ?? {};
    if (query.address) {
      this.resetMultiStep(query);
    }
  };

  didFocus = () => {
    const {
      route, accounts, t
    } = this.props;

    BackHandler.addEventListener('hardwareBackPress', this.onBackButtonPressedAndroid);

    if (route.params?.initialize ?? false) {
      this.nav.move({
        to: 3,
        data: {
          address: accounts.address,
          amount: 0.1,
          reference: t('Account initialization')
        }
      });
    } else {
      this.checkQuery();
    }
  };

  willBlur = () => {
    this.props.navigation.setParams({ query: { address: '' } });
    this.setState({ query: {} });
    BackHandler.removeEventListener('hardwareBackPress', this.onBackButtonPressedAndroid);
  };

  finalCallback = () => {
    this.props.navigation.navigate({ name: 'Home' });
  };

  hideProgressBar = (data) => {
    this.setState({ showProgressBar: !data });
  };

  onBackButtonPressedAndroid = () => {
    // @todo Fix this on Android
    const action = this.props.route.params?.action ?? false;

    if (action && typeof action === 'function') {
      action();
      return true;
    }

    return false;
  };

  openLiskDesktopDownload = () => Linking.openURL('https://lisk.com/wallet');

  render() {
    const {
      styles, accounts, navigation, route, settings, t
    } = this.props;

    let steps = [
      {
        component: Recipient,
        title: 'form'
      },
      {
        component: Amount,
        title: 'amount'
      },
      {
        component: Overview,
        title: 'Overview'
      },
      {
        component: Result,
        title: 'result'
      }
    ];

    if (accounts.secondPublicKey) {
      steps.splice(3, 0, {
        component: SecondPassphrase,
        title: 'secondPassphrase'
      });
    }

    if (accounts.isMultisignature) {
      return (
        <SafeAreaView style={[styles.flex, styles.theme.multiSigContainer]}>
          <HeaderBackButton title="Send LSK" noIcon />
          <View style={[styles.flex]}>
            <View style={[styles.multiSigContainer]}>
              <View style={styles.illustrationWrapper}>
                <SendLSKIllustrationSvg />
              </View>
              <P style={styles.theme.copy}>{t('multisignature.send.description')}</P>
              <TouchableOpacity
                style={styles.buttonContainer}
                onPress={this.openLiskDesktopDownload}
              >
                <B style={[styles.button, styles.theme.button]}>
                  {t('multisignature.send.button')}
                </B>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    }

    if (settings.token.active !== tokenMap.LSK.key) {
      steps = steps.filter((s) => s.title !== 'reference');
    }

    return (
      <MultiStep
        ref={(el) => {
          this.nav = el;
        }}
        navStyles={{ multiStepWrapper: styles.multiStepWrapper }}
        finalCallback={this.finalCallback}
        showProgressBar={this.state.showProgressBar}
      >
        {steps.map((step) => (
          <step.component
            key={step.title}
            navigation={navigation}
            route={route}
            accounts={accounts}
            settings={settings}
          />
        ))}
      </MultiStep>
    );
  }
}

export default withTheme(translate()(Send), getStyles());
