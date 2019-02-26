import React from 'react';
import connect from 'redux-connect-decorator';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../../actions/settings';
import withTheme from '../../withTheme';
import { LabelButton } from '../../toolBox/button';
import getStyles from './styles';

@connect(state => ({
  settings: state.settings,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class TokenSwitcher extends React.Component {
  onClick = () => {
    const { settings: { token }, settingsUpdated } = this.props;
    const updatedTokens = {
      list: token.list,
      active: token.active === 'LSK' ? 'BTC' : 'LSK',
    };
    settingsUpdated({
      token: updatedTokens,
    });
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

export default withTheme(TokenSwitcher, getStyles());
