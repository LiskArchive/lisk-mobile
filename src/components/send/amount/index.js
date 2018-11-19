import React from 'react';
import { View, Text } from 'react-native';
import liskService from '../../../utilities/api/liskService';

class Amount extends React.Component {
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
      .then(res => this.setState({ priceTicker: res.body.tickers.LSK }))
      .catch(err => console.log(err));
  }

  onChange = (value) => {
    const { currency } = this.props;
    const { priceTicker } = this.state;
    let valueInCurrency = 0;

    if (priceTicker[currency]) {
      valueInCurrency = (value * priceTicker[currency]);
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
    const { amount: { value, validity } } = this.state;
    console.log(currency, value, validity);

    return (
      <View>
        <Text>
          {value}
        </Text>
      </View>
    );
  }
}

export default Amount;
