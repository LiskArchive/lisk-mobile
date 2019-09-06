import React from 'react';
import connect from 'redux-connect-decorator';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import { deviceHeight, SCREEN_HEIGHTS } from '../../../../../utilities/device';
import {
  pricesRetrieved as pricesRetrievedAction,
  dynamicFeesRetrieved as dynamicFeesRetrievedAction,
} from '../../../../../actions/service';
import { tokenMap } from '../../../../../constants/tokens';
import AmountLSK from './lsk';
import AmountBTC from './btc';

const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

@connect(
  state => ({
    priceTicker: state.service.priceTicker,
    dynamicFees: state.service.dynamicFees,
    activeToken: state.settings.token.active,
  }),
  {
    pricesRetrieved: pricesRetrievedAction,
    dynamicFeesRetrieved: dynamicFeesRetrievedAction,
  }
)
class Amount extends React.Component {
  componentDidMount() {
    const { navigation, move } = this.props;

    navigation.setParams({
      title: isSmallScreen ? 'Send' : 'Amount',
      showButtonLeft: true,
      action: () =>
        move({
          to: 0,
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
