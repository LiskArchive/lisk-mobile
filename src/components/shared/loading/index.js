import React, { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { View } from 'react-native';
import LottieView from 'lottie-react-native';

import progressBar from '../../../assets/animations/progressBar.json';
import withTheme from '../withTheme';
import getStyles from './styles';
import { deviceType } from '../../../utilities/device';

const Loading = ({ styles }) => {
  const [loop, setLoop] = useState(true);
  const animation = useRef(null);
  const loading = useSelector(state => state.loading);
  const osType = deviceType();

  useEffect(() => {
    if (!loop && loading.length) {
      setLoop(true);
      animation.current.play();
    }

    if (loop && !loading.length) {
      setLoop(false);
    }
  }, [loading, loop]);

  const visible = loop ? styles.visible : {};

  return (
    <View style={[styles.wrapper, styles[osType], visible]}>
      <LottieView
        style={styles.animation}
        source={progressBar}
        loop={loop}
        ref={animation}
      />
    </View>
  );
};

export default withTheme(Loading, getStyles());
