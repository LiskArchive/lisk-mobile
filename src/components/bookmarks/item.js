import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Interactable from 'react-native-interactable';
import connect from 'redux-connect-decorator';
import {
  accountUnFollowed as accountUnFollowedAction,
} from '../../actions/accounts';
import Avatar from '../avatar';
import { B, Small, P } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import Icon from '../toolBox/icon';
import { themes, colors } from '../../constants/styleGuide';


@connect(state => ({}), {
  accountUnFollowed: accountUnFollowedAction,
})
class Item extends React.Component {
  _deltaX = new Animated.Value(0);
  showDetail = () => {
    const {
      navigate, data,
    } = this.props;

    navigate(data);
  }

  render() {
    const {
      styles, data, theme, navigate, accountUnFollowed, setRef,
    } = this.props;
    const Element = navigate ? TouchableOpacity : View;

    return (<Element
      style={[styles.itemContainer, styles.theme.itemContainer]}
      onPress={this.showDetail}>
      <View style={styles.draggableRow} pointerEvents='box-none'>
          <Animated.View style={
            [styles.editButton, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-155, 0],
                  outputRange: [0, 155],
                }),
              }],
            },
          ]}>
            <TouchableOpacity
              onPress={() => { this.ref.snapTo({ index: 0 }); }}
              style={styles.button}>
              <Icon
                name='back'
                size={21}
                style={styles.icon}
                color={theme === themes.light ? colors.light.black : colors.dark.white}
              />
              <P>edit</P>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={
            [styles.deleteButton, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-155, 0],
                  outputRange: [0, 78],
                }),
              }],
            },
            ]}>
            <TouchableOpacity
              onPress={() => { accountUnFollowed(data.address); }}
              style={styles.button}>
              <Icon
                name='forward'
                size={21}
                style={styles.icon}
                color={theme === themes.light ? colors.light.black : colors.dark.white}
              />
              <P>delete</P>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          ref= {(ref) => { this.ref = ref; }}
          horizontalOnly={true}
          boundaries={{ right: 0 }}
          snapPoints={[
            { x: 0, damping: -0.7, tension: 300 },
            { x: -155, damping: -0.7, tension: 300 },
          ]}
          onDrag={() => setRef(this.ref, data.address)}
          animatedValueX={this._deltaX}>
          <View style={styles.row}>
            <View style={styles.innerContainer}>
              <View style={[styles.itemColumn, styles.avatarContainer]}>
                <Avatar address={data.address} size={50} style={styles.theme.avatar} />
              </View>
              <View style={styles.column}>
                <B style={[styles.address, styles.theme.address]}>
                  {data.label}
                </B>
                <Small style={[styles.label, styles.theme.label]}>
                  {data.address}
                </Small>
              </View>
            </View>
            {
              navigate ? <View style={[styles.column, styles.amountWrapper]}>
                <Icon
                  name='forward'
                  size={21}
                  style={styles.icon}
                  color={theme === themes.light ? colors.light.black : colors.dark.white}
                />
              </View> : null
            }
          </View>
        </Interactable.View>
    </Element>);
  }
}

export default withTheme(Item, getStyles());
