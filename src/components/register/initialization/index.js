import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { B, P } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import image from '../../../assets/images/registrationProcess/initialize3x.png';

class Initialization extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      action: this.props.prevStep,
      title: 'Security reminder!',
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <B style={styles.subHeader}>
              It’s extremely important!
            </B>
            <P style={styles.subTitle}>
              Initialize your account immediately after you received tokens for the first time.
            </P>
            <P style={styles.subTitle}>
              You will be on-boarded about this when you received tokens.
            </P>
          </View>
          <View style={styles.imageContainer}>
            <Image
              style={styles.image}
              source={image}
            />
          </View>
        </View>
        <View style={styles.buttonWrapper}>
          <SecondaryButton
            style={styles.button}
            onClick={() => {
              this.props.nextStep({
                passphrase: this.props.sharedData.passphrase,
              });
            }}
            title='Continue'
          />
        </View>
      </View>
    );
  }
}

export default Initialization;
