import React from 'react';
import { View, Text } from 'react-native';
import liskService from '../../../utilities/api/liskService';
import Input from './input';

class Amount extends React.Component {
  maxLSKSupply = 125000000;
  state = {
    amount: {
      value: 0,
      validity: -1,
      valueInCurrency: 0,
    },
    priceTicker: {},
  };

  componentDidMount() {
    const { value } = this.props;
    this.getPriceTicker();

    if (value) {
      this.onChange(value);
    }
  }

  getPriceTicker = () => {
    liskService.getPriceTicker()
      .then(res => this.setState({ priceTicker: res.tickers.LSK }))
      .catch(console.log); //eslint-disable-line
  }

  onChange = (value) => {
    if (value > this.maxLSKSupply) {
      return;
    }

    const { currency } = this.props;
    const { priceTicker } = this.state;
    let valueInCurrency = 0;

    if (priceTicker[currency]) {
      valueInCurrency = (value * priceTicker[currency]).toFixed(2);
    }

    this.setState({
      amount: {
        value,
        validity: 0,
        valueInCurrency,
      },
    });
  }

  render() {
    const { currency } = this.props;
    const { amount: { value, validity, valueInCurrency } } = this.state;

    return (
      <View>
        <Text>
          {currency} {validity} {valueInCurrency}
        </Text>

        <Input
          label="Amount (LSK)"
          value={value}
          onChange={this.onChange}
          keyboardType="numeric"
        />
      </View>
    );
  }
}

export default Amount;
