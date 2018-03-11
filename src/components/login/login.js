import React from 'react';
import { TextInput, Button, Picker, View } from 'react-native';
import { getNetwork, networks } from '../../utilities/networks';

/**
 * The container component containing login and create account functionality
 * 
 * @todo 
 */
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      passphrase: '',
      address: '',
      network: networks.mainNet,
    };
  }

  trim(passphrase) {
    return passphrase.trim().replace(/\s+/g, ' ');
  }

  /**
   * Will be called when login form submits
   * 
   * @param {String} passphrase - valid mnemonic passphrase
   */
  onLoginSubmission(passphrase) {
    // this.props.activePeerSet({
    //   passphrase: this.trim(passphrase),
    //   network: this.state.network,
    // });
    this.props.navigation.navigate('Main');
  }

  /**
   * General change handler to get bound to react component event listeners
   * 
   * @param {String} key - The key in react component state to be altered
   * @param {any} value - The corresponding value. interface depends on the key
   * 
   * @todo Implement error status/message
   */
  changeHandler(key, value) {
    this.setState({
      [key]: value,
    });
  }

  render() {
    return (<View>
      <Picker
        selectedValue={this.state.network}
        onValueChange={this.changeHandler.bind(this, 'network')}>
        {
          Object.keys(networks).map((item, index) => <Picker.Item 
            key={index}
            label={networks[item].name}
            value={networks[item]} />)
        }
      </Picker>
      <TextInput type='text'
        type='passphrase'
        placeholder='passphrase'
        name='passphrase'
        value={this.state.address}
        onChangeText={this.changeHandler.bind(this, 'address')}/>
      <Button
        onPress={this.onLoginSubmission.bind(this)}
        title="Login"/>
      </View>);
  }
}

export default Login;
