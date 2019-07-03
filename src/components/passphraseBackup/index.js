import React from 'react';
import connect from 'redux-connect-decorator';
import { View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import PassphraseCopy from '../passphraseCopy';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  passphrase: state.accounts.passphrase,
}))
class PassphraseBackup extends React.Component {
  render() {
    const { styles, passphrase } = this.props;

    return (
      <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <View style={styles.container}>
          <PassphraseCopy passphrase={passphrase} />
        </View>
      </SafeAreaView>
    );
  }
}

export default withTheme(PassphraseBackup, getStyles());
