import React from 'react';
import SvgUri from 'react-native-svg-uri';
import { View } from 'react-native';
import styles from './styles';
import { H1, P } from '../../toolBox/typography';
import { SecondaryButton } from '../../toolBox/button';
import image from '../../../assets/images/success.svg';

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
          <View style={styles.image} >
            <SvgUri
              width="198"
              height="198"
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
