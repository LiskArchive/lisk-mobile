import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';
import styles from './styles';
import { SecondaryButton } from '../../toolBox/button';
import { H1, P } from '../../toolBox/typography';
import txCreatedAnim from '../../../assets/animations/tx-created.json';
import txPendingAnim from '../../../assets/animations/tx-pending.json';
import txConfirmedAnim from '../../../assets/animations/tx-confirmed.json';

@connect(state => ({
  account: state.accounts.active,
  pending: state.transactions.pending,
}), {})
class Result extends React.Component {
  state = {
    animSrc: txCreatedAnim,
  };

  componentDidMount() {
    this.play('created');
  }

  componentDidUpdate(nextProp) {
    const currentTx = this.props.pending.filter(tx =>
      tx.id === this.props.txId);
    const nextTx = nextProp.pending.filter(tx =>
      tx.id === this.props.txId);
    if (nextTx && nextTx.timestamp && !currentTx.timestamp) {
      this.play('confirmed');
    }
  }

  play(stage) {
    if (stage === 'created') {
      this.setState({
        animSrc: txCreatedAnim,
      });
      this.animation.play();
      setTimeout(() => {
        this.setState({
          animSrc: txPendingAnim,
        });
        this.animation.play();
      }, 3890);
    } else if (stage === 'confirmed') {
      this.setState({
        animSrc: txConfirmedAnim,
      });
      this.animation.play();
      setTimeout(() => {
        this.animation.stop();
      }, 5430);
    }
  }

  render() {
    return (<View style={styles.container}>
      <View>
        <H1>Sent</H1>
        <P style={styles.subtitle}>
          The transaction is being processed and will be confirmed. It may take up to
          15 minutes to be secured in the blockchain.
        </P>
      </View>
      <View style={styles.illustration}>
        <LottieView source={this.state.animSrc} ref={(el) => { this.animation = el; }}/>
      </View>
      <SecondaryButton
        style={styles.button}
        onClick={() => {
          this.props.finalCallback();
          this.props.reset();
        }}
        title='Return to home' />
    </View>);
  }
}

export default Result;
