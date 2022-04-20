import React, { useState } from 'react';
import {
  View, TouchableOpacity, ScrollView, SafeAreaView
} from 'react-native';
import { translate } from 'react-i18next';
import { colors } from 'constants/styleGuide';
import SearchBarHeader from 'navigation/searchBarHeader';
import Icon from 'components/shared/toolBox/icon';
import withTheme from 'components/shared/withTheme';
import Bookmarks from 'components/shared/bookmarks';
import getStyles from './styles';

const Bookmark = ({
  styles, navigation, theme, t
}) => {
  const [query, setQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const setQueryString = (query) => setQuery(query);

  return <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
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
        <Bookmarks
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
        navigation.navigate({ name: 'AddBookmark', params: { title: t('New bookmark') } })
      }
    >
      <Icon style={[styles.addButtonIcon]} name="cross" color={colors[theme].white} size={30} />
    </TouchableOpacity>
  </SafeAreaView>;
};

export default withTheme(translate()(Bookmark), getStyles());
