import React from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
import { storePassphraseInKeyChain } from 'utilities/passphrase';
import { themes, colors } from 'constants/styleGuide';
import { B, P, Small } from 'components/shared/toolBox/typography';
import Icon from 'components/shared/toolBox/icon';
import { PrimaryButton } from 'components/shared/toolBox/button';
import withTheme from 'components/shared/withTheme';
import HeaderBackButton from 'navigation/headerBackButton';
import { settingsUpdated as settingsUpdatedAction } from 'actions/settings';
import getStyles from './styles';

@connect(
  state => ({
    passphrase: state.accounts.passphrase,
  }),
  {
    settingsUpdated: settingsUpdatedAction,
  }
)
class EnableBioAuth extends React.Component {
  confirm = () => {
    storePassphraseInKeyChain(this.props.passphrase);
    this.props.settingsUpdated({ hasStoredPassphrase: true });
    this.props.navigation.pop();
  };

  componentDidMount() {
    const title = this.props.route.params?.title ?? 'Bio Auth';
    this.props.navigation.setOptions({
      title: null,
      headerLeft: (props) => <HeaderBackButton title={`Enable ${title}`} onPress={this.props.navigation.goBack} {...props} />
    });
  }

  render() {
    const {
      theme, styles, route, t
    } = this.props;

    const title = route.params?.title ?? 'Bio Auth';

    return (
      <View style={styles.wrapper}>
        <View style={[styles.container, styles.theme.container]}>
          <View>
            <P style={[styles.subHeader, styles.theme.subHeader]}>
              {t('Here’s what you need to know:')}
            </P>
            <View
              style={[styles.row, styles.separator, styles.theme.separator]}
            >
              <View style={styles.iconWrapper}>
                <Icon
                  name="passphrase"
                  color={
                    theme === themes.light
                      ? colors.light.ultramarineBlue
                      : colors.dark.ultramarineBlue
                  }
                  size={30}
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
            <View
              style={[styles.row, styles.separator, styles.theme.separator]}
            >
              <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
                <Icon
                  name="settings-bg"
                  color={
                    theme === themes.light
                      ? colors.light.ultramarineBlue
                      : colors.dark.ultramarineBlue
                  }
                  size={30}
                />
              </View>
              <View style={styles.textWrapper}>
                <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                  {t('You can always deactivate it')}
                </B>
                <Small style={[styles.description, styles.theme.description]}>
                  {t(
                    `You can disable ${title} at anytime in Settings page then authenticate with passphrase.`
                  )}
                </Small>
              </View>
            </View>
            <View
              style={[styles.row, styles.separator, styles.theme.separator]}
            >
              <View style={[styles.iconWrapper, styles.theme.iconWrapper]}>
                <Icon
                  name="secure"
                  color={
                    theme === themes.light
                      ? colors.light.ultramarineBlue
                      : colors.dark.ultramarineBlue
                  }
                  size={30}
                />
              </View>
              <View style={styles.textWrapper}>
                <B style={[styles.rowTitle, styles.theme.rowTitle]}>
                  Fast and secure
                </B>
                <Small style={[styles.description, styles.theme.description]}>
                  {t(
                    `${title} offers a secure and faster way to access the Lisk app.`
                  )}
                </Small>
              </View>
            </View>
          </View>
          <PrimaryButton
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
