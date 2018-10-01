import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { H1, B, P } from '../../toolBox/typography';
import CopyToClipboard from '../../copyToClipboard';
import { SecondaryButton } from '../../toolBox/button';
import image from '../../../assets/images/registrationProcess/passphrase3x.png';

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
          <View style={styles.titleContainer}>
            <H1 style={styles.header}>Your passphrase</H1>
            <P style={styles.subHeader}>
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
              type={P}/>
          </View>
        </View>
        <View style={styles.imageContainer} >
          <Image
            style={styles.image}
            source={image}
          />
          <P style={styles.caption}>Keep it safe!</P>
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
