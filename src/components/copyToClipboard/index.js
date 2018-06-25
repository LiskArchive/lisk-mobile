import React from 'react';
import { View, Text, Clipboard } from 'react-native';
import { Icon } from 'react-native-elements';

class CopyToClipBoard extends React.Component {
  state = { copied: false };
  copy = () => {
    this.setState({ copied: !this.state.copied });
    Clipboard.setString(this.props.value);
    setTimeout(() => {
      this.setState({ copied: !this.state.copied });
    }, 4000);
  }
  render() {
    const { icon, value, style } = this.props;
    return (<View style={{
        minWidth: '20%',
        flexDirection: 'row',
      }}
    >
     <Text
      style={style}
      onPress={this.copy}>
        {this.state.copied ? `${value} is copied to your clipBoard` : value} 
      </Text>
     {(icon && !this.state.copied) ?
        <Icon
          onPress={this.copy}
          type='font-awesome' name='copy' size={18} /> : null }
    </View>);
  }
}

export default CopyToClipBoard;
