import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { P } from '../toolBox/typography';
import PassphraseCopy from '../passphraseCopy';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  account: state.accounts.active,
}), {})
class PassphraseBackup extends React.Component {
  render() {
    const { styles, account: { passphrase } } = this.props;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <P style={[styles.subHeader, styles.theme.subHeader]}>
            Carefully write it down or copy to the clipboard.
          </P>
          <PassphraseCopy passphrase={passphrase} />
        </View>
      </View>
    );
  }
}

export default withTheme(PassphraseBackup, getStyles());
