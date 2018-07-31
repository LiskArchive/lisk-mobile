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

const createdAnimDuration = 4340;
const pendingRoundAnimDuration = 720;
const singleAnimRound = createdAnimDuration + pendingRoundAnimDuration;

@connect(state => ({
  account: state.accounts.active,
  transactions: state.transactions,
}), {})
class Result extends React.Component {
  state = {
    animSrc: txCreatedAnim,
    loop: false,
  };
  timeouts = {
    created: null,
    confirmed: null,
  };

  componentDidMount() {
    this.startDate = new Date();
    this.play('created');
  }

  componentWillUnmount() {
    clearTimeout(this.timeouts.created);
    clearTimeout(this.timeouts.confirmed);
  }

  componentWillUpdate(nextProp) {
    const nowPending = this.props.transactions.pending.filter(tx =>
      tx.id === this.props.txId).length > 0;
    const nextConfirmed = nextProp.transactions.confirmed.filter(tx =>
      tx.id === this.props.txId).length > 0;

    if (nowPending && nextConfirmed) {
      this.play('confirmed');
    }
  }

  play(stage) {
    if (stage === 'created') {
      this.setState({
        animSrc: txCreatedAnim,
        loop: false,
      });
      this.animation.play();
      this.timeouts.created = setTimeout(() => {
        this.setState({
          animSrc: txPendingAnim,
          loop: true,
        });
        this.animation.play();
      }, createdAnimDuration);
    } else if (stage === 'confirmed') {
      const timeLapsed = new Date() - this.startDate;
      const delay = (timeLapsed > singleAnimRound) ?
        timeLapsed % pendingRoundAnimDuration : singleAnimRound - timeLapsed;

      this.timeouts.confirmed = setTimeout(() => {
        this.setState({
          animSrc: txConfirmedAnim,
          loop: false,
        });
        this.animation.play();
      }, delay);
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
        <LottieView
          source={this.state.animSrc}
          loop={this.state.loop}
          ref={(el) => { this.animation = el; }}/>
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
