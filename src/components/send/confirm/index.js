import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Card } from 'react-native-elements';

class Form extends React.Component {
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
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 0,
        marginTop: 20
      },
    });
    console.log(this.props);
    return (<View style={styles.container}>
      <Card
        title={`${amount} LSK`}>
        <Text>To: {address}</Text>
        <Button
          backgroundColor='#03A9F4'
          style={styles.button}
          onPress={() => this.props.nextStep()}
          title='Next' />
      </Card>
    </View>);
  }
}

export default Form;