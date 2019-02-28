import React from 'react';
import { Image, View } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import KeyboardAwareScrollView from '../../toolBox/keyboardAwareScrollView';
import transactions from '../../../constants/transactions';
import { fromRawLsk } from '../../../utilities/conversions';
import { B, P } from '../../toolBox/typography';
import FormattedNumber from '../../formattedNumber';
import reg from '../../../constants/regex';
import { merge } from '../../../utilities/helpers';
import AmountInput from './input';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { deviceType, deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';
import darkBlur from '../../../assets/images/amountFormBalanceBlur/dark.png';
import lightBlur from '../../../assets/images/amountFormBalanceBlur/light.png';

const blurs = { dark: darkBlur, light: lightBlur };
const isAndroid = deviceType() === 'android';
const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

@connect(state => ({
  priceTicker: state.service.priceTicker,
}))
class Amount extends React.Component {
  state = {
    amount: {
      value: '',
      normalizedValue: '',
      validity: {
        code: 0,
        message: '',
      },
    },
  };

  validator = (str) => {
    const { t, accounts, settings: { token } } = this.props;

    if (str === '' || parseFloat(str) === 0) {
      return {
        code: -1,
        message: t('Please enter an amount.'),
      };
    }

    let message = '';

    if (!reg.amount.test(str)) {
      message = t('The amount value is invalid.');
    } else if (accounts.info[token.active].balance < transactions.send.fee ||
      parseFloat(str) > fromRawLsk(accounts.info[token.active].balance - transactions.send.fee)) {
      message = t('Your balance is not sufficient.');
    }

    return ({
      code: message ? 1 : 0,
      message,
    });
  };

  componentDidMount() {
    const {
      sharedData, accounts, navigation: { setParams }, move,
    } = this.props;
    const status = accounts.followed
      .filter(item => item.address === (sharedData.address)).length > 0;

    if (sharedData.amount) {
      this.onChange(sharedData.amount);
    }

    setParams({
      title: isSmallScreen ? 'Send' : 'Amount',
      showButtonLeft: true,
      action: () => move({
        to: status ? 0 : 1,
      }),
    });

    if (isAndroid) {
      setTimeout(() => this.input.focus(), 250);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.lng !== this.props.lng) {
      const {
        navigation: { setParams },
      } = this.props;
      setParams({
        title: isSmallScreen ? 'Send' : 'Amount',
      });
    }
  }

  onChange = (value) => {
    const normalizedValue = value.replace(/[^0-9]/g, '.');

    this.setState({
      amount: {
        value,
        normalizedValue,
        validity: -1,
      },
    });
  }

  onSubmit = () => {
    const { amount } = this.state;
    const validity = this.validator(amount.normalizedValue);

    if (validity.code === 0) {
      this.props.nextStep(merge(this.props.sharedData, {
        amount: amount.normalizedValue,
      }));
    } else {
      this.setState({
        amount: merge(amount, { validity }),
      });
    }
  }

  render() {
    const {
      theme, styles, t,
      settings: { currency, incognito, token },
      accounts, priceTicker,
    } = this.props;
    const { amount: { value, normalizedValue, validity } } = this.state;

    let valueInCurrency = 0;

    if (value && this.validator(normalizedValue).code === 0 && priceTicker[currency]) {
      valueInCurrency = (normalizedValue * priceTicker[currency]).toFixed(2);
      valueInCurrency = valueInCurrency === 'NaN' ? 0 : valueInCurrency;
    }

    return (
      <View style={styles.theme.wrapper}>
        <KeyboardAwareScrollView
          onSubmit={this.onSubmit}
          styles={{ innerContainer: styles.innerContainer }}
          hasTabBar={true}
          button={{
            title: t('Continue'),
            type: 'inBox',
          }}
        >
          <View>
            {!isSmallScreen ? (
              <View style={styles.headerContainer}>
                <P style={styles.theme.subHeader}>
                  {t('Enter the amount you want to send.')}
                </P>
              </View>
            ) : null}
            <View
              style={[
                styles.balanceContainer,
                styles.theme.balanceContainer,
                (incognito ? styles.balanceContainerIncognito : {}),
              ]}
            >
              <B style={[styles.balanceText, styles.theme.balanceText]}>
                {t('You have')}
              </B>

              {incognito ?
                <Image
                  source={blurs[theme]}
                  style={styles.balanceIncognito}
                /> :
                <FormattedNumber
                  type={B}
                  style={[styles.balanceNumber, styles.theme.balanceNumber]}
                >
                  {fromRawLsk(accounts.info[token.active].balance || 0)}
                </FormattedNumber>
              }
            </View>

            <AmountInput
              reference={(el) => { this.input = el; }}
              autoFocus={!isAndroid}
              label={t('Amount (LSK)')}
              value={value}
              onChange={this.onChange}
              keyboardType='numeric'
              currency={currency}
              valueInCurrency={valueInCurrency}
              error={validity.message}
            />
           </View>
        </KeyboardAwareScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Amount), getStyles());
