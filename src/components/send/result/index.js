import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

class Result extends React.Component {
  render() {
    const { address, amount } = this.props;
    const styles = StyleSheet.create({
      container: {
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        backgroundColor: '#ffffff',
      },
      inner: {
        padding: 20
      },
      button: {
        marginTop: 20
      },
      title: {
        fontSize: 30,
        marginBottom: 20,
      }
    });
    return (<View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>
          Success
        </Text>
        <Text>
          Transaction is being processed and will be confirmed. It may take up to 15 minutes to be secured in the blockchain.
        </Text>
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