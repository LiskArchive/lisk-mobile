import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { SecondaryButton } from '../../toolBox/button';
import { H1, P } from '../../toolBox/typography';

class Result extends React.Component {
  render() {
    return (<View style={styles.container}>
      <View>
        <H1>
          Sent
        </H1>
        <P style={styles.subtitle}>
          The transaction is being processed and will be confirmed. It may take up to
          15 minutes to be secured in the blockchain.
        </P>
      </View>
      <SecondaryButton
        style={styles.button}
        onClick={() => {
          this.props.finalCallback();
          this.props.reset();
        }}
        title='Go to wallet' />
    </View>);
  }
}

export default Result;
