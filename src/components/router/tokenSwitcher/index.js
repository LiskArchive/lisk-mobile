import React from 'react';
import connect from 'redux-connect-decorator';
import { withNavigation } from 'react-navigation';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../../actions/settings';
import withTheme from '../../withTheme';
import { IconButton } from '../../toolBox/button';
import getStyles from './styles';
import AssetSelection from '../../assetSelection';
import { tokenKeys, tokenMap } from '../../../constants/tokens';
import { colors } from '../../../constants/styleGuide';


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
    const { styles, settings: { token }, theme } = this.props;
    const style = token.active === tokenKeys[0] ?
      { backgroundColor: colors[theme].blue } :
      { backgroundColor: colors[theme].BTC };
    const profiles = tokenKeys.filter(key => token.list[key]);

    return (
      profiles.length > 1 ?
        <IconButton
          color={colors[theme].white }
          iconSize={13}
          title=''
          icon={tokenMap[token.active].icon}
          onClick={this.onClick}
          style={[styles.button, style]}
        /> : null
    );
  }
}

export default withTheme(withNavigation(TokenSwitcher), getStyles());
