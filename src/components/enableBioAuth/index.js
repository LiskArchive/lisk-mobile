import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import {
  storePassphraseInKeyChain,
} from '../../utilities/passphrase';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { B, Small } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { SecondaryButton } from '../toolBox/button';
import { themes, colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  account: state.accounts,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class EnableBioAuth extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const title = navigation.getParam('title', 'Bio Auth');
    return {
      title: `Enable ${title}`,
    };
  }

  confirm = () => {
    storePassphraseInKeyChain(this.props.account.passphrase);
    this.props.settingsUpdated({ hasStoredPassphrase: true });
    this.props.navigation.pop();
  }

  render() {
    const {
      theme, styles, navigation, t,
    } = this.props;
    const title = navigation.getParam('title', 'Bio Auth');

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <View>
            <B style={[styles.subHeader, styles.theme.subHeader]}>
              {t('Here’s what you need to know:')}
            </B>
            <View style={[styles.row, styles.separator, styles.theme.separator]}>
              <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
                <Icon
                  name='passphrase'
                  color={colors[theme].blue}
                  size={36}
                />
              </View>
              <View style={styles.textWrapper}>
                <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                  {t('Your passphrase is still needed')}
                </B>
                <Small style={[styles.description, styles.theme.description]}>
                  {t('You always need to keep your passphrase safe.')}
                  {t('It will still be required for some actions.')}
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator, styles.theme.separator]}>
              <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
                <Icon
                  name='settings-bg'
                  color={colors[theme].yellow}
                  size={36}
                />
              </View>
              <View style={styles.textWrapper}>
                <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                {t('You can always turn it off')}
                </B>
                <Small style={[styles.description, styles.theme.description]}>
                  {t(`You can disable ${title} at anytime in Settings page then authenticate with passphrase.`)}
                </Small>
              </View>
            </View>
            <View style={[styles.row, styles.separator, styles.theme.separator]}>
              <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
                <Icon
                  name='secure'
                  color={theme === themes.light ? colors.light.gray1 : colors.dark.gray2}
                  size={36}
                />
              </View>
              <View style={styles.textWrapper}>
                <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                  Fast and secure
                </B>
                <Small style={[styles.description, styles.theme.description]}>
                  {t(`${title} offers a secure and faster way to access the Lisk app.`)}
                </Small>
              </View>
            </View>
          </View>
          <SecondaryButton
            style={styles.button}
            onClick={this.confirm}
            title={t(`Enable ${title}`)}
          />
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(EnableBioAuth), getStyles());
