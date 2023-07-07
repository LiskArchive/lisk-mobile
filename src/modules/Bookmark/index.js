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

export default function Bookmarks() {
  const navigation = useNavigation();

  const search = useSearch();

  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const { styles, theme } = useTheme({
    styles: getStyles(),
  });

  const handleSearchTermChange = (term) => search.setTerm(term);

  const handlePress = (data) => navigation.navigate('AccountDetails', { address: data.address });

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

        <TouchableOpacity
          style={[styles.titleContainer]}
          testID="add-bookmark"
          onPress={() =>
            navigation.navigate({
              name: 'AddBookmark',
              params: { title: i18next.t('New bookmark') },
            })
          }
        >
          <Icon style={[styles.addButtonIcon]} name="cross" color={colors[theme].white} size={20} />
        </TouchableOpacity>
      </View>
    </NavigationSafeAreaView>
  );
}
