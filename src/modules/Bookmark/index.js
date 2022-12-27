import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';

import NavigationSafeAreaView from 'components/navigation/NavigationSafeAreaView';
import { colors } from 'constants/styleGuide';
import HeaderSearchBar from 'components/navigation/HeaderSearchBar';
import Icon from 'components/shared/toolBox/icon';

import { useTheme } from 'hooks/useTheme';
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

  const handlePress = (data) => navigation.navigate('Wallet', { address: data.address });

  return (
    <NavigationSafeAreaView>
      <View style={{ flex: 1 }}>
        <HeaderSearchBar
          title={'Bookmarks'}
          noIcon
          onChange={handleSearchTermChange}
          value={search.term}
          isSearchOpen={isSearchOpen}
          setIsSearchOpen={(val) => setIsSearchOpen(val)}
        />

        <BookmarkList draggable query={search.term} renderEmpty onPress={handlePress} />

        <TouchableOpacity
          style={[styles.titleContainer]}
          onPress={() =>
            navigation.navigate({
              name: 'AddBookmark',
              params: { title: i18next.t('New bookmark') },
            })
          }
        >
          <Icon style={[styles.addButtonIcon]} name="cross" color={colors[theme].white} size={30} />
        </TouchableOpacity>
      </View>
    </NavigationSafeAreaView>
  );
}
