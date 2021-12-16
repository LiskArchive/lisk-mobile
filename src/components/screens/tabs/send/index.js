import React from 'react';
import { BackHandler } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';

import MultiStep from '../../../shared/multiStep';
import Recipient from './recipient';
import Amount from './amount';
import Overview from './overview';
import SecondPassphrase from './secondPassphrase';
import Result from './result';
import withTheme from '../../../shared/withTheme';
import getStyles from './styles';
import { tokenMap } from '../../../../constants/tokens';

@connect(
  state => ({
    accounts: state.accounts,
    settings: state.settings,
  }),
  {}
)
class Send extends React.Component {
  state = {
    showProgressBar: true,
    query: {},
  };

  componentDidMount() {
    const { navigation } = this.props;

    this.subs = [
      navigation.addListener('focus', this.didFocus),
      navigation.addListener('blur', this.willBlur),
    ];
  }

  componentDidUpdate(prevProps) {
    // Reset the progress if active token has changed
    if (prevProps.settings.token.active !== this.props.settings.token.active) {
      this.resetMultiStep();
    }
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub?.remove?.());
  }

  resetMultiStep = () => {
    const query = this.props.route.params?.query ?? {};
    this.setState({ query });
    this.nav.reset(query);
  };

  checkQuery = () => {
    const query = this.props.route.params?.query ?? {};

    if (query.address) {
      this.resetMultiStep(query);
    }
  };

  didFocus = () => {
    const {
      route, accounts, settings, t
    } = this.props;

    BackHandler.addEventListener(
      'hardwareBackPress',
      this.onBackButtonPressedAndroid
    );

    if (route.params?.initialize ?? false) {
      this.nav.move({
        to: 3,
        data: {
          address: accounts.info[settings.token.active].address,
          amount: 0.1,
          reference: t('Account initialization'),
        },
      });
    } else {
      this.checkQuery();
    }
  };

  willBlur = () => {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.onBackButtonPressedAndroid
    );
  };

  finalCallback = () => {
    this.props.navigation.navigate({ name: 'Home' });
  };

  hideProgressBar = data => {
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

  render() {
    const {
      styles, accounts, navigation, route, settings
    } = this.props;

    let steps = [
      {
        component: Recipient,
        title: 'form',
      },
      {
        component: Amount,
        title: 'amount',
      },
      {
        component: Overview,
        title: 'Overview',
      },
      {
        component: Result,
        title: 'result',
      },
    ];

    if (accounts.info[settings.token.active].secondPublicKey) {
      steps.splice(3, 0, {
        component: SecondPassphrase,
        title: 'secondPassphrase',
      });
    }

    if (settings.token.active !== tokenMap.LSK.key) {
      steps = steps.filter(s => s.title !== 'reference');
    }

    return (
      <MultiStep
        ref={el => {
          this.nav = el;
        }}
        navStyles={{ multiStepWrapper: styles.multiStepWrapper }}
        finalCallback={this.finalCallback}
        showProgressBar={this.state.showProgressBar}
      >
        {steps.map(step => (
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
