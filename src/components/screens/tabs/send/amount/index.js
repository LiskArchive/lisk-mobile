import React from 'react';
import connect from 'redux-connect-decorator';

import { SafeAreaView } from 'react-native-safe-area-context';
import withTheme from '../../../../shared/withTheme';
import getStyles from './styles';
import {
  pricesRetrieved as pricesRetrievedAction,
  dynamicFeesRetrieved as dynamicFeesRetrievedAction
} from '../../../../../actions/service';
import AmountLSK from './lsk';
import HeaderBackButton from '../../../router/headerBackButton';

@connect(
  (state) => ({
    priceTicker: state.service.priceTicker,
    dynamicFees: state.service.dynamicFees,
    activeToken: state.settings.token.active
  }),
  {
    pricesRetrieved: pricesRetrievedAction,
    dynamicFeesRetrieved: dynamicFeesRetrievedAction
  }
)
class Amount extends React.Component {
  render() {
    const { styles } = this.props;
    return (
      <SafeAreaView style={styles.wrapper}>
        <HeaderBackButton
          title={'Send LSK'}
          onPress={this.props.prevStep}
          currentIndex={2}
          length={3}
          step={true}
        />
        <AmountLSK {...this.props} />
      </SafeAreaView>
    );
  }
}

export default withTheme(Amount, getStyles());
