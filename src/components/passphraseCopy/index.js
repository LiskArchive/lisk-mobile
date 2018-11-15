import React from 'react';
import { View, Image } from 'react-native';
import { deviceHeight } from '../../utilities/device';
import { B, P } from '../toolBox/typography';
import CopyToClipboard from '../copyToClipboard';
import { themes } from '../../constants/styleGuide';
import passphraseImg from '../../assets/images/registrationProcess/passphrase3x.png';
import passphraseImgDark from '../../assets/images/registrationProcess/passphrase-dark3x.png';
import withTheme from '../withTheme';
import getStyles from './styles';

const height = deviceHeight();

class PassphraseCopy extends React.Component {
  render() {
    const { theme, styles, passphrase } = this.props;

    return (
      <View style={styles.wrapper}>
        <View style={styles.textContainer}>
          <View style={[styles.passphraseContainer, styles.theme.passphraseContainer]}>
            <P style={styles.theme.passphraseTitle}>
              Store your passphrase:
            </P>
            <B style={[styles.passphrase, styles.theme.passphrase]}>
              {passphrase}
            </B>
          </View>
          <View style={styles.copyContainer}>
            <CopyToClipboard
              style={styles.copyContainer}
              labelStyle={styles.theme.copy}
              iconStyle={styles.theme.copy}
              label='Copy to clipboard'
              showIcon={true}
              iconSize={14}
              value={passphrase}
              type={P}
            />
          </View>
        </View>
        {
          height > 640 &&
          <View style={styles.imageContainer}>
            {
              theme === themes.light ?
              <Image style={styles.image} source={passphraseImg} /> :
              <Image style={styles.image} source={passphraseImgDark} />
            }
            <P style={[styles.caption, styles.theme.caption]}>
              Keep it safe!
            </P>
          </View>
        }
      </View>
    );
  }
}

export default withTheme(PassphraseCopy, getStyles({ height }));
