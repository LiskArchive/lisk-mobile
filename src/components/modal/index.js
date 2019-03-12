import React from 'react';
import { View, ScrollView } from 'react-native';
import { translate } from 'react-i18next';
import { B } from '../toolBox/typography';
import { boxes } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import HeaderBackButton from '../router/headerBackButton';
import { deviceHeight, headerHeight } from '../../utilities/device';
import getStyles from './styles';

class Modal extends React.Component {
  state = {
    headerStyle: {},
    contentStyle: {},
  }
  closeModal = () => {
    this.props.navigation.pop();
  }
  setHeaderHeight = ({ nativeEvent }) => {
    const viewHeight = nativeEvent.layout.height;
    const headerStyle = { height: headerHeight() };
    const contentStyle = { paddingTop: headerHeight() + boxes.boxPadding };
    if (viewHeight >= deviceHeight()) this.setState({ headerStyle, contentStyle });
  }
  // this.props.navigation.navigate('Modal', { title: 'yashar', component: About });
  render() {
    const {
      styles, navigation,
    } = this.props;
    const { contentStyle, headerStyle } = this.state;
    const title = navigation.getParam('title', '');
    const Component = navigation.getParam('component');

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
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
              <Component close={this.closeModal} />
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default withTheme(translate()(Modal), getStyles());
