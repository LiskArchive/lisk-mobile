/* eslint-disable max-len */
import React from 'react';
import {
  View, TouchableOpacity, Image, FlatList
} from 'react-native';
import { P, H3 } from 'components/shared/toolBox/typography';
import { useTheme } from 'hooks/useTheme';
import { colors, themes } from 'constants/styleGuide';
import CaretSvg from 'assets/svgs/CaretSvg';
import Icon from 'components/shared/toolBox/icon';
import getStyles from './styles';

const SelectNode = ({ application, onPress, closeModal }) => {
  const { styles, theme } = useTheme({ styles: getStyles });

  const {
    name,
    apis,
    images,
  } = application;

  return (
    <View>
      <View style={styles.titleHolder}>
        <View style={styles.row}>
          <Image source={{ uri: images?.logo.png }} style={styles.logo} />
          <H3 style={[styles.title, styles.theme.title]}>{name}</H3>
        </View>
        <TouchableOpacity onPress={closeModal}>
          <Icon
            onPress={closeModal}
            name="cross"
            color={
              theme === themes.light ? colors.light.black : colors.dark.white
            }
            size={24}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={apis}
        keyExtractor={(item) => item.rest}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.urlContainer}
            onPress={() => onPress(item)}
            key={item}
          >
            <P style={styles.url}>{item.rest}</P>
            <CaretSvg direction={'left'} color={colors.light.ultramarineBlue} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default SelectNode;
