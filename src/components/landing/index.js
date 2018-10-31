import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import Intro from '../intro';
import Login from '../login';
import {
  settingsRetrieved as settingsRetrievedAction,
} from '../../actions/settings';

@connect(state => ({
  settings: state.settings,
}), {
  settingsRetrieved: settingsRetrievedAction,
})
class Landing extends React.Component {
  state = {};

  componentWillMount() {
    this.props.settingsRetrieved();
  }

  componentDidUpdate() {
    if (this.props.settings.validated && !this.state.initialRoute) {
      this.setState({
        initialRoute: this.props.settings.showedIntro ? 'Login' : 'Intro',
      });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    if (this.state.initialRoute === 'Intro') {
      return <Intro navigation={this.props.navigation} />;
    } else if (this.state.initialRoute === 'Login') {
      return <Login navigation={this.props.navigation} />;
    }
    return <View></View>;
  }
}

export default Landing;
