import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';
import { translate } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { settingsUpdated } from 'modules/Settings/actions';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import withTheme from 'components/shared/withTheme';
import IncognitoSvg from 'assets/svgs/IncognitoSvg';
import getStyles from './styles';

const DiscreteSwitch = ({ styles }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const discrete = useSelector(state => state.settings.discrete);
  const dispatch = useDispatch();

  const toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection');
    dispatch(settingsUpdated({
      discrete: !discrete
    }));
  };

  useEffect(() => {
    Animated.spring(translateX, { toValue: discrete ? 31 : 0, useNativeDriver: true }).start();
  }, [discrete]);

  return (
    <TouchableOpacity style={[styles.discreteWrapper]} onPress={toggleIncognito} >
        <Animated.View style={[
          {
            transform: [
              {
                translateX,
              },
            ],
          }]} >
          <View style={styles.discreteIcon} >
            <IncognitoSvg size={1.1} disabled={discrete} />
          </View>
        </Animated.View>
    </TouchableOpacity>
  );
};

export default withTheme(translate()(DiscreteSwitch), getStyles());
