import React from 'react';
import connect from 'redux-connect-decorator';
import { withNavigation } from 'react-navigation';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../../actions/settings';
import withTheme from '../../withTheme';
import { LabelButton } from '../../toolBox/button';
import getStyles from './styles';
import AssetSelection from '../../assetSelection';

@connect(state => ({
  settings: state.settings,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class TokenSwitcher extends React.Component {
  onClick = () => {
    this.props.navigation.navigate('Modal', { title: 'Your assets', component: AssetSelection });
  }

  render() {
    const { styles, settings: { token } } = this.props;

    return (
      <LabelButton
        title={token.active}
        onClick={this.onClick}
        style={styles.button}
      />
    );
  }
}

export default withTheme(withNavigation(TokenSwitcher), getStyles());
