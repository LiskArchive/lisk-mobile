import React from 'react';
import { Text, View } from 'react-native';
import { Button, FormLabel } from 'react-native-elements';
import styles from './styles';

class Result extends React.Component {
  render() {
    return (<View style={styles.container}>
      <View style={styles.inner}>
        <Text style={[styles.heading, styles.centerAlign, styles.gray]}>
          Success
        </Text>
        <FormLabel>
          Transaction is being processed and will be confirmed. It may take up
          to 15 minutes to be secured in the blockchain.
        </FormLabel>
        <Button
          backgroundColor='#008722'
          style={styles.button}
          onPress={() => {
            this.props.finalCallback();
            this.props.reset();
          }}
          title='ok' />
      </View>
    </View>);
  }
}

export default Result;
