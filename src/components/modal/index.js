import React from 'react';
import { View, ScrollView } from 'react-native';
import ModalBox from 'react-native-modalbox';
import { translate } from 'react-i18next';
import { B } from '../shared/toolBox/typography';
import { boxes } from '../../constants/styleGuide';
import withTheme from '../shared/withTheme';
import HeaderBackButton from '../screens/router/headerBackButton';
import { deviceHeight, headerHeight } from '../../utilities/device';
import getStyles from './styles';
import ModalHolder from '../../utilities/modal';

class Modal extends React.Component {
  state = {
    headerStyle: {},
    contentStyle: {},
    Component: View,
    title: '',
    modalCallback: () => true,
  }

  updateModal = (config) => {
    this.setState({
      title: this.props.t(config.title),
      Component: config.component || null,
      modalCallback: config.callback,
    });
  }

  closeModal = () => {
    ModalHolder.close();
  }

  setHeaderHeight = ({ nativeEvent }) => {
    const viewHeight = nativeEvent.layout.height;
    const headerStyle = { height: headerHeight() };
    const contentStyle = { paddingTop: headerHeight() + boxes.boxPadding };
    if (viewHeight >= deviceHeight()) this.setState({ headerStyle, contentStyle });
  }

  render() {
    const {
      styles,
    } = this.props;
    const { contentStyle, headerStyle } = this.state;
    const { title, Component, modalCallback } = this.state;

    return (
      <ModalBox
        position={'bottom'}
        style={styles.modal}
        ref={ref => ModalHolder.initialize(ref, this.updateModal)}
      >
        <View style={styles.wrapper}>
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
                <Component modalCallback={modalCallback} close={this.closeModal} />
              </View>
            </ScrollView>
          </View>
        </View>
      </ModalBox>
    );
  }
}

export default withTheme(translate()(Modal), getStyles());
