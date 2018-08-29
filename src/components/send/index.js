import React from 'react';
import { View } from 'react-native';
import MultiStep from '../multiStep';
import Form from './form';
import Confirm from './confirm';
import Result from './result';
import styles from './styles';
import { IconButton } from '../toolBox/button';
import { colors } from '../../constants/styleGuide';

class Send extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarVisible: !(params && params.tabBar),
      headerLeft: (params && params.showButtonLeft) ? <IconButton
      icon='back'
      title=''
      onPress={() => {
        params.action();
      }}
      style={styles.back}
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
    this.nav.reset();
  }

  render() {
    const { navigation } = this.props;
    return (<View style={styles.wrapper}>
      <MultiStep
        finalCallback={() => {
          navigation.navigate({ routeName: 'OwnWallet' });
        }}
        navStyles={{ multiStepWrapper: styles.multiStepWrapper }}
        ref={(el) => { this.nav = el; }}>
        <Form title='form' navigation={this.props.navigation}/>
        <Confirm title='confirm' navigation={this.props.navigation} />
        <Result title='result' navigation={this.props.navigation}/>
      </MultiStep>
    </View>);
  }
}

export default Send;
