import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import Intro from '../intro';
import SignIn from '../signIn';
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
      this.setState({ initialRoute: this.props.settings.showedIntro ? 'SignIn' : 'Intro' });
    }
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    if (this.state.initialRoute === 'Intro') {
      return <Intro navigation={this.props.navigation} />;
    } else if (this.state.initialRoute === 'SignIn') {
      return <SignIn navigation={this.props.navigation} />;
    }
    return <View></View>;
  }
}

export default Landing;
