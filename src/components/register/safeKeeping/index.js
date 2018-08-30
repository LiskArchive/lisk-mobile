import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { View } from 'react-native';
import styles from './styles';
import { H1, B, H4, P } from '../../toolBox/typography';
import CopyToClipboard from '../../copyToClipboard';
import { SecondaryButton } from '../../toolBox/button';
import vault from '../../../assets/images/vault.svg';
// import colors from '../../../constants/styleGuide/colors';

class SafeKeeping extends React.Component {
  state = {
    passphrase: '',
    buttonStatus: false,
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
          <View style={styles.titleContainer}>
            <H1 style={styles.header}>Your passphrase</H1>
            <P style={styles.subtitle}>
              The only way to access your account.
            </P>
          </View>
          <View style={styles.passphraseContainer}>
            <P style={styles.passphraseTitle}>This is your passphrase:</P>
            <B style={styles.passphrase}>
              {this.props.passphrase}
            </B>
          </View>
          <View style={styles.copyContainer}>
            <CopyToClipboard
              style={styles.copyContainer}
              labelStyle={styles.copy}
              iconStyle={styles.copy}
              label='Copy to clipboard'
              showIcon={true}
              iconSize={14}
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
          <H4 style={styles.imageDescription}>Keep it safe!</H4>
        </View>
        <View>
          <SecondaryButton
            disabled={this.state.buttonStatus}
            style={styles.button}
            onClick={() => {
              this.props.nextStep({
                passphrase: this.state.passphrase,
              });
            }}
            title='I wrote it down' />
        </View>
      </View>);
  }
}

export default SafeKeeping;
