import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import PassphraseCopy from '../../passphraseCopy';
import withTheme from '../../withTheme';
import getStyles from './styles';

@connect(state => ({
  passphrase: state.accounts.passphrase,
}))
class PassphraseBackup extends React.Component {
  render() {
    const { styles, passphrase } = this.props;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <PassphraseCopy passphrase={passphrase} />
      </View>
    );
  }
}

export default withTheme(PassphraseBackup, getStyles());
