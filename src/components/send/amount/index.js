import React from 'react';
import connect from 'redux-connect-decorator';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../utilities/device';
import {
  pricesRetrieved as pricesRetrievedAction,
  dynamicFeesRetrieved as dynamicFeesRetrievedAction,
} from '../../../actions/service';
import { tokenMap } from '../../../constants/tokens';
import AmountLSK from './lsk';
import AmountBTC from './btc';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

@connect(state => ({
  priceTicker: state.service.priceTicker,
  dynamicFees: state.service.dynamicFees,
}), {
  pricesRetrieved: pricesRetrievedAction,
  dynamicFeesRetrieved: dynamicFeesRetrievedAction,
})
class Amount extends React.Component {
  componentDidMount() {
    const {
      navigation, accounts, sharedData, move,
    } = this.props;

    navigation.setParams({
      title: isSmallScreen ? 'Send' : 'Amount',
      showButtonLeft: true,
      action: () => move({
        to: accounts.followed.some(item => item.address === sharedData.address) ? 0 : 1,
      }),
    });
  }

  componentDidUpdate(prevProps) {
    const { lng, navigation } = this.props;

    if (prevProps.lng !== lng) {
      navigation.setParams({
        title: isSmallScreen ? 'Send' : 'Amount',
      });
    }
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
