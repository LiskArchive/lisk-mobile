import React from 'react';
import { Image, View } from 'react-native';
import Src from '../../assets/images/strapes.png';
import styles from './styles';

const Bg = () => (<View>
  <Image
    style={styles.main}
    source={Src}
  />
</View>);

export default Bg;
