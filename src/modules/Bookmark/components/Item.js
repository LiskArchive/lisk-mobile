import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import { themes, colors } from 'constants/styleGuide';
import { stringShortener } from 'utilities/helpers';
import Avatar from 'components/shared/avatar';
import { P, B } from 'components/shared/toolBox/typography';
import withTheme from 'components/shared/withTheme';
import Icon from 'components/shared/toolBox/icon';
import DraggableItem from './DraggableItem';
import getStyles from './styles';

class Item extends React.Component {
  showDetail = () => {
    const { onPress, data } = this.props;

    onPress(data);
  };

  render() {
    const { styles, data, theme, showAvatar } = this.props;

    return (
      <TouchableOpacity
        style={[styles.linkedItem, styles.theme.linkedItem]}
        onPress={this.showDetail}
      >
        <View style={[styles.innerContainer]}>
          {showAvatar && (
            <Avatar
              address={data.address}
              size={40}
              style={[styles.avatarContainer, styles.theme.avatar]}
            />
          )}

          <View style={styles.column}>
            <B style={[styles.address, styles.theme.address]}>{data.label}</B>
            <P style={[styles.label, styles.theme.label]} numberOfLines={1}>
              {stringShortener(data.address, 6, 5)}
            </P>
          </View>
        </View>

        <View style={[styles.amountWrapper]}>
          <Icon
            name="forward"
            size={21}
            style={styles.icon}
            color={theme === themes.light ? colors.light.black : colors.dark.white}
          />
        </View>
      </TouchableOpacity>
    );
  }
}

const themedDraggableItem = withTheme(translate()(DraggableItem), getStyles());
const themedItem = withTheme(translate()(Item), getStyles());

export { themedDraggableItem as DraggableItem, themedItem as Item };
