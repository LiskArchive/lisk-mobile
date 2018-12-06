import React from 'react';
import { View, Animated, ScrollView, Keyboard } from 'react-native';
import { B } from '../toolBox/typography';
import reg from '../../constants/regex';
import Input from '../toolBox/input';
import { IconButton } from '../toolBox/button';
import AddButton from './addButton';
import withTheme from '../withTheme';
import getStyles from './styles';
import Bookmarks from '../bookmarks';

class Bookmark extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarVisible: params.tabBar,
      headerRight: <AddButton onPress={params.action} style={params.styles} />,
      headerLeft: (
        <IconButton
          color='transparent'
          icon='back'
        />
      ),
    };
  };
  activeInputRef = null;
  validator = (str) => {
    if (str === '') return -1;
    return reg.address.test(str) ? 0 : 1;
  };
  scannedData = {};
  state = {
    header: true,
    address: {
      value: '',
      validity: -1,
    },
    avatarPreview: false,
  };
  animatedStyles = {
    height: new Animated.Value(80),
    paddingTop: new Animated.Value(24),
  }

  componentDidMount() {
    const { navigation, styles, theme } = this.props;
    navigation.setParams({ styles, theme });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardOpen);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardClose);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  setAddress = (value) => {
    clearTimeout(this.avatarPreviewTimeout);
    if (this.validator(value) === 0) {
      this.setAvatarPreviewTimeout();
    }
    this.setState({
      address: {
        value,
      },
      avatarPreview: false,
    });
  }

  onKeyboardOpen = () => {
    this.onKeyboardChanged(true);
  }

  onKeyboardClose = () => {
    this.onKeyboardChanged(false);
  }
  closeCurrent() {
    if (this.current) this.current.snapTo({ index: 0 });
  }

  onKeyboardChanged = (header) => {
    const { height, paddingTop } = this.animatedStyles;
    this.closeCurrent();
    if (header) {
      Animated.parallel([
        Animated.timing(paddingTop, {
          toValue: 0,
          duration: 400,
          delay: 0,
        }),
        Animated.timing(height, {
          toValue: 0,
          duration: 400,
          delay: 0,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(height, {
          toValue: 80,
          duration: 400,
          delay: 0,
        }),
        Animated.timing(paddingTop, {
          toValue: 24,
          duration: 400,
          delay: 0,
        }),
      ]).start();
    }
  }


  resetPrev(ref, next, address) {
    this.prev = ref;
    this.prev.snapTo({ index: 0 });
    this.address = address;
    this.current = next;
  }

  setRef = (ref, address) => {
    if (!address) {
      this.prev = null;
      this.current = null;
    } else if (!this.current) {
      this.current = ref;
    } else if (address !== this.address) {
      this.resetPrev(this.current, ref, address);
    }
  }

  render() {
    const { styles } = this.props;
    const {
      address,
    } = this.state;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <ScrollView style={styles.container}>
          <Animated.View style={[styles.titleContainer, this.animatedStyles]}>
            <View style={styles.headings}>
              <B style={[styles.subtitle, styles.theme.subtitle]}>
              Simply add, search, delete and edit addresses that are important to you.
              </B>
            </View>
          </Animated.View>
          <View style={styles.form}>
            <View style={styles.addressContainer}>
              <Input
                label='Search'
                autoCorrect={false}
                reference={(input) => { this.input = input; }}
                innerStyles={{
                  errorMessage: styles.errorMessage,
                  input: [
                    styles.input,
                    styles.addressInput,
                  ],
                  containerStyle: styles.addressInputContainer,
                }}
                onChange={this.setAddress}
                value={address.value}
                error={
                  address.validity === 1 ?
                    'Invalid address' : ''
                }
              />
            </View>
            <Bookmarks draggable={true} setRef={this.setRef} query={this.state.address.value} />
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(Bookmark, getStyles());
