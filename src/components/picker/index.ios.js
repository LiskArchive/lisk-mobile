import React from 'react';
import { TouchableOpacity, Text, ActionSheetIOS } from 'react-native';

class PickerIOS extends React.Component {
  onPress = () => {
    const { options, onChange } = this.props;

    ActionSheetIOS.showActionSheetWithOptions({
      options: ['Cancel', ...this.props.options],
      destructiveButtonIndex: -1,
      cancelButtonIndex: 0,
    }, (buttonIndex) => {
      if (buttonIndex !== 0) {
        onChange(options[buttonIndex - 1]);
      }
    });
  }

  render() {
    const ValueWrapper = this.props.valueWrapper || Text;

    return (
      <TouchableOpacity onPress={this.onPress}>
        <ValueWrapper style={this.props.valueStyle}>
          {this.props.value}
        </ValueWrapper>
      </TouchableOpacity>
    );
  }
}

export default PickerIOS;
