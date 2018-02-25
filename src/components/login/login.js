import React from 'react';
import { TextInput, Button, Picker, View } from 'react-native';
import { getNetwork, networks } from '../../utilities/networks';

/**
 * The container component containing login
 * and create account functionality
 */
class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      passphrase: '',
      address: '',
      network: networks.mainNet.code,
    };
  }

  componentWillMount() {
    this.network = getNetwork(this.state.network);
  }

  onLoginSubmission(passphrase) {
    this.props.activePeerSet({
      passphrase,
      network: this.state.network,
    });
  }

  changeHandler(name, value) {
    this.setState({
      [name]: value,
    });
  }

  render() {
    return (<View>
      <Picker
        selectedValue={this.state.network}
        onValueChange={this.changeHandler.bind(this, 'network')}>
        {
          Object.keys(networks).map((item, index) => <Picker.Item label={networks[item].name} value={index} />)
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
