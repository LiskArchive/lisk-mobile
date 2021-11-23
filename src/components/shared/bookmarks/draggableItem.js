import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import Interactable from 'react-native-interactable';
import connect from 'redux-connect-decorator';
import { accountUnFollowed as accountUnFollowedAction } from '../../../actions/accounts';
import Avatar from '../avatar';
import { B, Small, P } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { colors } from '../../../constants/styleGuide';
import DeleteBookmarkModal from './deleteBookmarkModal';
import ModalHolder from '../../../utilities/modal';
import { stringShortener } from '../../../utilities/helpers';

@connect(
  () => ({}),
  {
    accountUnFollowed: accountUnFollowedAction,
  }
)
class DraggableItem extends React.Component {
  _deltaX = new Animated.Value(0);

  _deltaY = new Animated.Value(0);

  onDelete = () => {
    const { data, accountUnFollowed } = this.props;
    this.ref.changePosition({ x: 0, y: 0 });
    ModalHolder.open({
      title: 'Delete bookmark',
      component: DeleteBookmarkModal,
      callback: () => accountUnFollowed(data.address),
    });
  };

  render() {
    const {
      styles, data, theme, navigate, setRef, t, showAvatar
    } = this.props;

    return (
      <View
        style={[styles.itemContainer, styles.theme.itemContainer]}
      >
        <View style={styles.draggableRow} pointerEvents="box-none">
          <Animated.View
            style={[
              styles.editButton,
              styles.theme.editButton,
              {
                transform: [
                  {
                    translateX: this._deltaX.interpolate({
                      inputRange: [-50, 0],
                      outputRange: [0, 180],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                this.ref.snapTo({ index: 0 });
                navigate({
                  name: 'AddBookmark',
                  params: {
                    account: data,
                    title: t('Edit bookmark'),
                  },
                });
              }}
              style={styles.button}
            >
              <Icon
                name="edit-bookmark"
                size={21}
                style={[styles.iconButton, styles.theme.editContent]}
                color={colors[theme].white}
              />
              <P style={[styles.buttonContent, styles.theme.editContent]}>
                {t('Edit')}
              </P>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View
            style={[
              styles.deleteButton,
              styles.theme.deleteButton,
              {
                transform: [
                  {
                    translateX: this._deltaX.interpolate({
                      inputRange: [-50, 0],
                      outputRange: [0, 100],
                    }),
                  },
                ],
              },
            ]}
          >
            <TouchableOpacity
              onPress={() => {
                setRef(this.ref);
                this.onDelete();
              }}
              style={styles.button}
            >
              <Icon
                name="delete-bookmark"
                size={21}
                style={styles.iconButton}
                color={colors.light.white}
              />
              <P style={styles.buttonContent}>{t('Delete')}</P>
            </TouchableOpacity>
          </Animated.View>
        </View>

        <Interactable.View
          ref={ref => {
            this.ref = ref;
          }}
          horizontalOnly={true}
          boundaries={{ right: 0 }}
          snapPoints={[
            { x: 0, damping: -0.7, tension: 300 },
            { x: -50, damping: -0.7, tension: 300 },
          ]}
          onDrag={() => setRef(this.ref, data.address)}
          animatedValueX={this._deltaX}
          animatedValueY={this._deltaY}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => navigate('Wallet', { address: data.address })}
            style={styles.row}
          >
            <View style={styles.innerContainer}>
              {showAvatar ? (
                <View style={[styles.itemColumn, styles.avatarContainer]}>
                  <Avatar
                    address={data.address}
                    size={43}
                    style={styles.theme.avatar}
                  />
                </View>
              ) : null}
              <View style={styles.column}>
                <B style={[styles.address, styles.theme.address]}>
                  {data.label}
                </B>
                <Small style={[styles.label, styles.theme.label]}>
                  {stringShortener(data.address, 6, 4)}
                </Small>
              </View>
            </View>
          </TouchableOpacity>
        </Interactable.View>
      </View>
    );
  }
}

export default DraggableItem;
