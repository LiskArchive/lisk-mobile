import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { P } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import image from '../../../assets/images/registrationProcess/success3x.png';

class Success extends React.Component {
  componentDidMount() {
    this.props.hideNav();
    this.props.navigation.setParams({
      action: false,
      title: 'Perfect! You’re all set',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <P style={styles.subTitle}>
              Great! now you can use your passphrase to sign in to your account.
            </P>
          </View>
          <View style={styles.imageContainer} >
            <Image
              style={styles.image}
              source={image}
            />
          </View>
        </View>
        <View>
          <SecondaryButton
            style={styles.button}
            onClick={this.props.navigation.pop}
            title='Sign in now'
          />
        </View>
      </View>
    );
  }
}

export default Success;
