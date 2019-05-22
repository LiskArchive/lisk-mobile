import React from 'react';
import { View, Animated, ScrollView, Keyboard } from 'react-native';
import { translate } from 'react-i18next';
import { P } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import Input from '../toolBox/input';
import { colors } from '../../constants/styleGuide';
import { SCREEN_HEIGHTS, deviceHeight } from '../../utilities/device';
import AddButton from './addButton';
import withTheme from '../withTheme';
import getStyles from './styles';
import Bookmarks from '../bookmarks';

class Bookmark extends React.Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      tabBarVisible: params.tabBar,
      headerLeft: <AddButton onPress={params.action} style={params.styles} />,
    };
  };
  activeInputRef = null;
  scannedData = {};
  state = {
    header: true,
    query: '',
  };
  animatedStyles = {
    height: new Animated.Value(45),
    paddingTop: new Animated.Value(20),
  }

  componentDidMount() {
    const {
      navigation, styles, theme, t,
    } = this.props;
    navigation.setParams({
      styles,
      theme,
      action: () => {
        navigation.navigate('AddBookmark', {
          title: t('New bookmark'),
        });
      },
    });
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.onKeyboardOpen);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.onKeyboardClose);
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  setQuery = (query) => {
    this.setState({
      query,
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

  hideHeadingElements = (showHeader) => {
    const { height, paddingTop } = this.animatedStyles;
    this.closeCurrent();
    if (showHeader) {
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
          toValue: 45,
          duration: 400,
          delay: 0,
        }),
        Animated.timing(paddingTop, {
          toValue: 20,
          duration: 400,
          delay: 0,
        }),
      ]).start();
    }
  }

  onKeyboardChanged = (showHeader) => {
    this.hideHeadingElements(showHeader);
  }

  componentDidUpdate() {
    this.current = null;
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
    const {
      styles, navigation, theme, t,
    } = this.props;
    const { query } = this.state;
    const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <ScrollView style={styles.container}>
          <View style={styles.innerContainer}>
            {!isSmallScreen ? (
              <Animated.View style={[styles.titleContainer, this.animatedStyles]}>
                <P style={[styles.subtitle, styles.theme.subtitle]}>
                  {t('Manage your bookmarks.')}
                </P>
              </Animated.View>
            ) : null}
            <View style={styles.form}>
              <View style={styles.addressContainer}>
                <Icon
                  style={styles.searchIcon}
                  name='search'
                  size={18}
                  color={colors[theme].gray2}
                />
                <Input
                  label={isSmallScreen ? '' : t('Search')}
                  placeholder={isSmallScreen ? t('Search for a bookmark') : ''}
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
                  onChange={this.setQuery}
                  value={query}
                />
              </View>
              <Bookmarks
                navigate={navigation.navigate}
                draggable={true} setRef={this.setRef} query={query}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default withTheme(translate()(Bookmark), getStyles());
