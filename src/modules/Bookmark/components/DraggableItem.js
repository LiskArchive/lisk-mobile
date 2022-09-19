import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { colors, themes } from 'constants/styleGuide';
import ModalHolder from 'utilities/modal';
import { stringShortener } from 'utilities/helpers';
import WarningSvg from 'assets/svgs/WarningSvg';
import Avatar from 'components/shared/avatar';
import { B, Small, P } from 'components/shared/toolBox/typography';
import Icon from 'components/shared/toolBox/icon';
import SwipeableRow from 'components/shared/Swipeable';
import { useNavigation } from '@react-navigation/native';
import DeleteBookmarkModal from './DeleteBookmark';
import { deleteBookmark } from '../store/actions';

const DraggableItem = ({ styles, data, theme, onPress, showAvatar, isInvalidAddress, t }) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const onDelete = () => {
    ModalHolder.open({
      title: 'Delete bookmark',
      component: DeleteBookmarkModal,
      callback: () => dispatch(deleteBookmark(data)),
    });
  };

  const openDisabledModal = () => {
    ModalHolder.open({
      title: t('bookmarks.disabled.title'),
      component: () => (
        <View>
          <P style={[styles.text, styles.theme.text]}>{t('bookmarks.disabled.description')}</P>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => ModalHolder.close()}>
            <B style={styles.buttonText}>{t('bookmarks.disabled.buttons.close')}</B>
          </TouchableOpacity>
        </View>
      ),
    });
  };

  return (
    <SwipeableRow
      style={[styles.itemContainer, styles.theme.itemContainer]}
      leftActions={
        !isInvalidAddress && [
          {
            title: 'Edit',
            color: colors.dark.blueGray,
            icon: () => (
              <Icon
                name="edit-bookmark"
                size={20}
                style={[isInvalidAddress && { opacity: 0.5 }]}
                color={colors[theme].white}
              />
            ),
            onPress: () =>
              navigation.navigate({
                name: 'AddBookmark',
                params: {
                  account: data,
                  title: t('Edit bookmark'),
                },
              }),
          },
        ]
      }
      rightActions={[
        {
          title: 'Delete',
          color: colors.light.burntSieanna,
          icon: () => (
            <Icon
              name="delete-bookmark"
              size={21}
              style={styles.iconButton}
              color={colors.light.white}
            />
          ),
          onPress: onDelete,
        },
      ]}
    >
      <TouchableOpacity
        activeOpacity={1}
        onPress={() => !isInvalidAddress && onPress(data)}
        style={[styles.row, styles.swipeBookmark]}
      >
        <View style={[styles.innerContainer]}>
          {showAvatar ? (
            <View
              style={[
                styles.itemColumn,
                styles.avatarContainer,
                isInvalidAddress && styles.lightOpacity,
              ]}
            >
              <Avatar address={data.address} size={43} style={styles.theme.avatar} />
            </View>
          ) : null}
          <View style={[styles.column, isInvalidAddress && styles.lightOpacity]}>
            <B style={[styles.address, styles.theme.address]}>{data.label}</B>
            <Small style={[styles.label, styles.theme.label]}>
              {stringShortener(data.address, 6, 5)}
            </Small>
          </View>
          {isInvalidAddress && (
            <View>
              <TouchableOpacity style={styles.infoButton} onPress={openDisabledModal}>
                <WarningSvg
                  color={
                    theme === themes.light ? colors.light.zodiacBlue : colors.dark.mountainMist
                  }
                />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </TouchableOpacity>
    </SwipeableRow>
  );
};

export default translate()(DraggableItem);
