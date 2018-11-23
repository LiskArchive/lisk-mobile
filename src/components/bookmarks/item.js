import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import Avatar from '../avatar';
import { B, Small } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';
import Icon from '../toolBox/icon';
import { themes, colors } from '../../constants/styleGuide';


class Item extends React.Component {
  showDetail = () => {
    const {
      navigate, data,
    } = this.props;

    navigate({ data, step: 2 });
  }

  render() {
    const {
      styles, data, theme,
    } = this.props;

    return (<TouchableOpacity
      style={[styles.itemContainer, styles.theme.itemContainer]}
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

export default withTheme(Item, getStyles());
