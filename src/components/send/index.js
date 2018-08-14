import React from 'react';
import { View } from 'react-native';
import MultiStep from '../multiStep';
import Form from './form';
import Confirm from './confirm';
import Result from './result';
import styles from './styles';
import { IconButton } from '../toolBox/button';
import colors from '../../constants/styleGuide/colors';

class Send extends React.Component {
  state = { focused: 1 };
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerLeft: (params && params.showButtonLeft) ? <IconButton
      icon='back'
      title=''
      onPress={() => {
        params.action();
      }}
      style={styles.iconButton}
      color={colors.white} /> : null,
    };
  };
  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('didFocus', () => this.didFocus()),
    ];
    this.props.navigation.setParams({ showButtonLeft: false });
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
          <Form navigation={this.props.navigation}/>
          <Confirm navigation={this.props.navigation} />
          <Result navigation={this.props.navigation}/>
        </MultiStep>
      </View>
    );
  }
}

export default Send;
