import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { PrimaryButton } from '../../toolBox/button';
import { H2, H4 } from '../../toolBox/typography';

class Result extends React.Component {
  render() {
    return (<View style={styles.container}>
      <View style={styles.inner}>
        <H2 style={[styles.heading, styles.centerAlign, styles.gray]}>
          Success
        </H2>
        <H4>
          Transaction is being processed and will be confirmed. It may take up
          to 15 minutes to be secured in the blockchain.
        </H4>
        <PrimaryButton
          style={styles.button}
          onClick={() => {
            this.props.finalCallback();
            this.props.reset();
          }}
          title='ok' />
      </View>
    </View>);
  }
}

export default Result;
