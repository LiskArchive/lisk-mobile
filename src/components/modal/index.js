import React from 'react';
import { View, ScrollView, Animated, TouchableHighlight } from 'react-native';
import { translate } from 'react-i18next';
import { B } from '../toolBox/typography';
import { boxes, themes } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import HeaderBackButton from '../router/headerBackButton';
import { deviceHeight, headerHeight } from '../../utilities/device';
import getStyles from './styles';

class Modal extends React.Component {
  state = {
    headerStyle: {},
    contentStyle: {},
  }

  animatedStyles = {
    opacity: new Animated.Value(0),
  }
  closeModal = () => {
    Animated.timing(this.animatedStyles.opacity, {
      toValue: 0,
      duration: 1,
      delay: 0,
    }).start();
    this.props.navigation.pop();
  }
  setHeaderHeight = ({ nativeEvent }) => {
    const viewHeight = nativeEvent.layout.height;
    const headerStyle = { height: headerHeight() };
    const contentStyle = { paddingTop: headerHeight() + boxes.boxPadding };
    if (viewHeight >= deviceHeight()) this.setState({ headerStyle, contentStyle });
  }
  componentDidMount() {
    Animated.timing(this.animatedStyles.opacity, {
      toValue: this.props.theme === themes.light ? 0.35 : 0.55,
      duration: 200,
      delay: 200,
    }).start();
  }
  render() {
    const {
      styles, navigation,
    } = this.props;
    const { contentStyle, headerStyle } = this.state;
    const title = navigation.getParam('title', '');
    const Component = navigation.getParam('component');

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <Animated.View style={[styles.overlay, styles.theme.overlay, this.animatedStyles]} >
          <TouchableHighlight
            onPress={this.closeModal}
            underlayColor='transparent'
            style={[styles.overlay]}
          >
            <View></View>
          </TouchableHighlight>
        </Animated.View>
        <View
          style={[styles.container, styles.theme.container]}
          onLayout={this.setHeaderHeight}
        >
          <View style={[styles.titleContainer, styles.theme.titleContainer, headerStyle]}>
            <View style={{ flexDirection: 'row' }}>
              <HeaderBackButton
                onPress={this.closeModal}
                icon='cross'
                style={styles.closeButton}
              />
              <B style={[styles.title, styles.theme.title]}>{title}</B>
            </View>
          </View>
          <ScrollView>
            <View style={[styles.contentContainer, contentStyle]}>
              <Component navigation={navigation} close={this.closeModal} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(Modal), getStyles());
