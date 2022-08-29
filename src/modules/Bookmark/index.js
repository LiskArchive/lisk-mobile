/* eslint-disable no-shadow */
import React, { useState } from 'react';
import {
  View, TouchableOpacity, ScrollView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import { colors } from 'constants/styleGuide';
import SearchBarHeader from 'components/navigation/searchBarHeader';
import Icon from 'components/shared/toolBox/icon';

import { useTheme } from 'hooks/useTheme';
import getStyles from './styles';
import { Repeater } from './components';

export default function Bookmark() {
  const navigation = useNavigation();

  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const tabBarHeight = useBottomTabBarHeight();

  const { styles, theme } = useTheme({
    styles: getStyles(tabBarHeight),
  });

  const setQueryString = (query) => setQuery(query);

  return (
    <NavigationSafeAreaView>
      <SearchBarHeader
        title={'Bookmarks'}
        noIcon={true}
        onChange={setQueryString}
        value={query}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={(val) => setIsSearchOpen(val)}
      />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.form}>
          <Repeater
            navigate={navigation.navigate}
            draggable={true}
            query={query}
            renderEmpty
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        style={[styles.titleContainer]}
        onPress={() =>
          navigation.navigate({ name: 'AddBookmark', params: { title: i18next.t('New bookmark') } })
        }
      >
        <Icon style={[styles.addButtonIcon]} name="cross" color={colors[theme].white} size={30} />
      </TouchableOpacity>
  </NavigationSafeAreaView>
  );
}
