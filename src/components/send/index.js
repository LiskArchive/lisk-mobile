import React from 'react';
import { View } from 'react-native';
import MultiStep from '../multiStep';
import Form from './form';
import Confirm from './confirm';
import Result from './result';
import styles from './styles';

class Send extends React.Component {
  state = { focused: 1 };
  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.didFocus()),
    ];
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  didFocus() {
    this.setState({ focused: !this.state.focused });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.wrapper}>
        <MultiStep finalCallback={() => {
          navigation.navigate({ routeName: 'OwnWallet' });
        }} reset={this.state.focused}>
          <Form/>
          <Confirm />
          <Result navigation={navigation}/>
        </MultiStep>
      </View>
    );
  }
}

export default Send;
