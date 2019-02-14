import React from 'react';
import { View, Alert, TouchableOpacity, Animated } from 'react-native';
import Interactable from 'react-native-interactable';
import connect from 'redux-connect-decorator';
import { translate } from 'react-i18next';
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
class draggableItem extends React.Component {
  _deltaX = new Animated.Value(0);

  onDelete = () => {
    const { data, accountUnFollowed, t } = this.props;

    Alert.alert(t('Are you sure?'), '', [
      {
        text: t('Cancel'),
        style: 'cancel',
        onPress: () => this.ref.changePosition({ x: 0, y: 0 }),
      },
      {
        text: t('Confirm'),
        onPress: () => accountUnFollowed(data.address),
      },
    ], { cancelable: false });
  }

  render() {
    const {
      styles, data, theme, navigate, setRef, t,
    } = this.props;

    return (<TouchableOpacity
      style={[styles.itemContainer, styles.theme.itemContainer]}
      activeOpacity={1}
      onPress={() => navigate('Wallet', { address: data.address })}>
      <View style={styles.draggableRow} pointerEvents='box-none'>
          <Animated.View style={
            [styles.editButton, styles.theme.editButton, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-155, 0],
                  outputRange: [0, 155],
                }),
              }],
            },
          ]}>
            <TouchableOpacity
              onPress={() => {
                this.ref.snapTo({ index: 0 });
                navigate({
                  routeName: 'AddBookmark',
                  params: {
                    account: data,
                    title: t('Edit bookmark'),
                  },
                });
              }}
              style={styles.button}>
              <Icon
                name='edit-bookmark'
                size={21}
                style={[styles.iconButton, styles.theme.editContent]}
                color={colors[theme].sendBalanceBg}
              />
              <P style={[styles.buttonContent, styles.theme.editContent]}>{t('Edit')}</P>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View style={
            [styles.deleteButton, styles.theme.deleteButton, {
              transform: [{
                translateX: this._deltaX.interpolate({
                  inputRange: [-155, 0],
                  outputRange: [0, 78],
                }),
              }],
            },
            ]}>
            <TouchableOpacity
              onPress={() => {
                setRef(this.ref);
                this.onDelete();
              }}
              style={styles.button}>
              <Icon
                name='delete-bookmark'
                size={21}
                style={styles.iconButton}
                color={colors.light.white}
              />
              <P style={styles.buttonContent}>{t('Delete')}</P>
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
          </View>
        </Interactable.View>
    </TouchableOpacity>);
  }
}

class Item extends React.Component {
  showDetail = () => {
    const {
      navigate, data,
    } = this.props;

    navigate(data);
  }

  render() {
    const {
      styles, data, theme,
    } = this.props;

    return (<TouchableOpacity
      style={[styles.linkedItem, styles.theme.linkedItem]}
      onPress={this.showDetail}>
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
      <View style={[styles.column, styles.amountWrapper]}>
        <Icon
          name='forward'
          size={21}
          style={styles.icon}
          color={theme === themes.light ? colors.light.black : colors.dark.white}
        />
      </View>
    </TouchableOpacity>);
  }
}

const themedDraggableItem = withTheme(translate()(draggableItem), getStyles());
const themedItem = withTheme(translate()(Item), getStyles());

export {
  themedDraggableItem as DraggableItem,
  themedItem as Item,
};
