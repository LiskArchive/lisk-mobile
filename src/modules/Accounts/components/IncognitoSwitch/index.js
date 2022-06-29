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

const IncognitoSwitch = ({ styles }) => {
  const translateX = useRef(new Animated.Value(0)).current;
  const incognito = useSelector(state => state.settings.incognito);
  const dispatch = useDispatch();

  const toggleIncognito = () => {
    ReactNativeHapticFeedback.trigger('selection');
    dispatch(settingsUpdated({
      incognito: !incognito
    }));
  };

  useEffect(() => {
    Animated.spring(translateX, { toValue: incognito ? 31 : 0, useNativeDriver: true }).start();
  }, [incognito]);

  return (
    <TouchableOpacity style={[styles.incognitoWrapper]} onPress={toggleIncognito} >
        <Animated.View style={[
          {
            transform: [
              {
                translateX,
              },
            ],
          }]} >
          <View style={styles.incognitoIcon} >
            <IncognitoSvg size={1.2} />
          </View>
        </Animated.View>
    </TouchableOpacity>
  );
};

export default withTheme(translate()(IncognitoSwitch), getStyles());
