import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { Small } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import Icon from '../../toolBox/icon';
import { settingsUpdated as settingsUpdatedAction } from '../../../actions/settings';
import withTheme from '../../withTheme';
import getStyles from './styles';
import { tokenMap } from '../../../constants/tokens';
import { colors } from '../../../constants/styleGuide';

@connect(null, {
  settingsUpdated: settingsUpdatedAction,
})
class IntroModal extends React.Component {
  onConfirm = () => {
    this.props.settingsUpdated({ btcIntroShown: true });
    this.props.close();
  }

  render() {
    const {
      styles, t, theme,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={[styles.tokenLogoWrapper, styles.theme.tokenLogoWrapper]}>
          <Icon
            style={styles.logo}
            name={tokenMap.BTC.icon}
            size={30}
            color={colors[theme].white}
          />
        </View>
        <Small style={[styles.text, styles.theme.text]}>
          {t('Lisk Mobile now supports Bitcoin (BTC).')}
        </Small>
        <SecondaryButton
          style={styles.actionButton}
          onClick={this.onConfirm}
          title={t('Got it!')}
        />
      </View>
    );
  }
}

export default withTheme(translate()(IntroModal), getStyles());
