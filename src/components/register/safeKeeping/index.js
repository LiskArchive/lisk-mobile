import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { View } from 'react-native';
import styles from './styles';
import { H1, B, P } from '../../toolBox/typography';
import CopyToClipboard from '../../copyToClipboard';
import { SecondaryButton } from '../../toolBox/button';
import vault from '../../../assets/images/vault.svg';
// import colors from '../../../constants/styleGuide/colors';

class SafeKeeping extends React.Component {
  state = {
    passphrase: '',
  }
  componentDidMount() {
    this.props.navigation.setParams({ action: this.props.prevStep });
  }
  confirm = (status) => {
    this.setState({
      buttonStatus: !status,
    });
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <H1 style={styles.header}>Passphrase, the only way{'\n'}to access your account.</H1>
          <View style={styles.passphraseContainer}>
            <P style={styles.passphraseTitle}>This is your passphrase:</P>
            <B style={styles.passphrase}>
              {this.props.passphrase}
            </B>
          </View>
          <View style={styles.copyContainer}>
            <CopyToClipboard
              style={styles.copy}
              label='Copy to clipboard'
              icon={true}
              value={this.props.passphrase}
              type={B}/>
          </View>
        </View>
        <View style={styles.image} >
          <SvgUri
            width="148"
            height="148"
            source={vault}
          />
        </View>
        <View>
          <SecondaryButton
            style={styles.button}
            onClick={() => {
              this.props.nextStep({
                passphrase: this.props.passphrase,
              });
            }}
            title='I wrote it down' />
        </View>
      </View>);
  }
}

export default SafeKeeping;
