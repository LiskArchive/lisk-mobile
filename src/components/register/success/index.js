import React from 'react';
import { View, Image } from 'react-native';
import styles from './styles';
import { H1, P } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import image from '../../../assets/images/registrationProcess/success3x.png';

class Success extends React.Component {
  componentDidMount() {
    this.props.hideNav();
    this.props.navigation.setParams({ action: false });
  }
  render() {
    return (
      <View style={styles.container}>
        <View>
          <View style={styles.titleContainer}>
            <H1 style={styles.header}>Perfect! You’re all set.</H1>
            <P style={styles.subtitle}>
              All the steps needed for creating an ID are{'\n'}
              complete. You can now start sending and{'\n'}
              receiving LSK tokens.
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
            onClick={() => this.props.navigation.navigate('Login')}
            title='Sign in now' />
        </View>
      </View>);
  }
}

export default Success;
