import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import { colors } from 'constants/styleGuide';
import HeaderSearchBar from 'components/navigation/HeaderSearchBar';
import Icon from 'components/shared/toolBox/icon';

import { useTheme } from 'contexts/ThemeContext';
import getStyles from './styles';
import { BookmarkList } from './components';
import { useSearch } from '../../hooks/useSearch';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

export default function Bookmarks() {
  const navigation = useNavigation();

  const search = useSearch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { styles, theme } = useTheme({
    styles: getStyles(),
  });

  const handleSearchTermChange = (term) => search.setTerm(term);

  const handlePress = (data) => navigation.navigate('AccountDetails', { address: data.address });

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <NavigationSafeAreaView>
      <HeaderSearchBar
        title={i18next.t('bookmarks.title')}
        noIcon
        onChange={handleSearchTermChange}
        value={search.term}
        isSearchOpen={isSearchOpen}
        setIsSearchOpen={(val) => setIsSearchOpen(val)}
      />

      <View style={[styles.body]}>
        <BookmarkList draggable query={search.term} renderEmpty onPress={handlePress} />
      </View>

      <TouchableOpacity
        style={[styles.titleContainer, { bottom: tabBarHeight + 50 }]}
        testID="add-bookmark"
        onPress={() => navigation.navigate('AddBookmark')}
      >
        <Icon style={[styles.addButtonIcon]} name="cross" color={colors[theme].white} size={24} />
      </TouchableOpacity>
    </NavigationSafeAreaView>
  );
}
