import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import Avatar from '../avatar';
import { B, Small } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import Icon from '../toolBox/icon';
import { themes, colors } from '../../../constants/styleGuide';
import DraggableItem from './draggableItem';

class Item extends React.Component {
  showDetail = () => {
    const { navigate, data } = this.props;

    navigate(data);
  };

  render() {
    const {
      styles, data, theme, showAvatar
    } = this.props;

    return (
      <TouchableOpacity
        style={[styles.linkedItem, styles.theme.linkedItem]}
        onPress={this.showDetail}
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
            <B style={[styles.address, styles.theme.address]}>{data.label}</B>
            <Small style={[styles.label, styles.theme.label]} numberOfLines={1}>
              {data.address}
            </Small>
          </View>
        </View>
        <View style={[styles.column, styles.amountWrapper]}>
          <Icon
            name="forward"
            size={21}
            style={styles.icon}
            color={
              theme === themes.light ? colors.light.black : colors.dark.white
            }
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const themedDraggableItem = withTheme(translate()(DraggableItem), getStyles());
const themedItem = withTheme(translate()(Item), getStyles());

export { themedDraggableItem as DraggableItem, themedItem as Item };
