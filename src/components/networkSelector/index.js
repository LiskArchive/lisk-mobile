import React, { Fragment } from 'react';
import { Picker } from 'react-native';
import { FormLabel } from 'react-native-elements';
import { networks } from '../../utilities/networks';

class NetworkSelector extends React.Component {
  constructor() {
    super();

    this.state = {
      network: networks.mainNet,
      address: '',
    };
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
    return <Fragment>
      <FormLabel>Network</FormLabel>
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
    </Fragment>;
  }
}

export default NetworkSelector;
