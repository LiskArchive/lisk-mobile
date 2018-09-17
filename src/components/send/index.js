import React from 'react';
import MultiStep from '../multiStep';
import Form from './form';
import Overview from './overview';
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
    const { navigation } = this.props;
    this.subs = [
      navigation.addListener('didFocus', () => this.didFocus()),
    ];
    navigation.setParams({ showButtonLeft: false });
  }

  componentWillUnmount() {
    this.subs.forEach(sub => sub.remove());
  }

  didFocus() {
    const { navigation } = this.props;
    if (navigation.getParam('initialize', false)) this.nav.move({ to: 1 });
    else this.nav.reset();
  }

  render() {
    const { navigation } = this.props;
    return (<MultiStep
        finalCallback={() => {
          navigation.navigate({ routeName: 'OwnWallet' });
        }}
        navStyles={{ multiStepWrapper: styles.multiStepWrapper }}
        ref={(el) => { this.nav = el; }}>
        <Form title='form' navigation={this.props.navigation}/>
        <Confirm title='confirm' navigation={this.props.navigation} />
        <Overview title='overview' navigation={this.props.navigation} />
        <Result title='result' navigation={this.props.navigation}/>
      </MultiStep>);
  }
}

export default Send;
