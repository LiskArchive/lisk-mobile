import React from 'react';
import connect from 'redux-connect-decorator';

import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import {
  pricesRetrieved as pricesRetrievedAction,
  dynamicFeesRetrieved as dynamicFeesRetrievedAction,
} from '../../../../../actions/service';
import { tokenMap } from '../../../../../constants/tokens';
import AmountLSK from './lsk';
import AmountBTC from './btc';
import HeaderBackButton from '../../../router/headerBackButton';

@connect(
  state => ({
    priceTicker: state.service.priceTicker,
    dynamicFees: state.service.dynamicFees,
    activeToken: state.settings.token.active,
  }),
  {
    pricesRetrieved: pricesRetrievedAction,
    dynamicFeesRetrieved: dynamicFeesRetrievedAction,
  },
)
class Amount extends React.Component {
  componentDidMount() {
    const { navigation, prevStep } = this.props;

    navigation.setOptions({
      title: null,
      headerLeft: props => <HeaderBackButton
        {...props}
        onPress={prevStep}
        safeArea={true}
        title={'Amount'} />,
    });
  }

  render() {
    switch (this.props.settings.token.active) {
      case tokenMap.LSK.key:
      default:
        return <AmountLSK {...this.props} />;

      case tokenMap.BTC.key:
        return <AmountBTC {...this.props} />;
    }
  }
}

export default withTheme(Amount, getStyles());
