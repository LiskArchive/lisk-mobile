import React from 'react';
import {
  View, TouchableOpacity, ScrollView, SafeAreaView
} from 'react-native';
import { translate } from 'react-i18next';
import Icon from '../../shared/toolBox/icon';
import { colors } from '../../../constants/styleGuide';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import Bookmarks from '../../shared/bookmarks';
import SearchBarHeader from '../router/searchBarHeader';

class Bookmark extends React.Component {
  activeInputRef = null;

  scannedData = {};

  state = {
    header: true,
    query: '',
    isSearchOpen: false
  };

  setQuery = query => {
    this.setState({
      query,
    });
  };

  closeCurrent() {
    if (this.current) this.current.snapTo({ index: 0 });
  }

  componentDidUpdate() {
    this.current = null;
  }

  resetPrev(ref, next, address) {
    this.prev = ref;
    this.prev.snapTo({ index: 0 });
    this.address = address;
    this.current = next;
  }

  setRef = (ref, address) => {
    if (!address) {
      this.prev = null;
      this.current = null;
    } else if (!this.current) {
      this.current = ref;
    } else if (address !== this.address) {
      this.resetPrev(this.current, ref, address);
    }
  };

  render() {
    const {
      styles, navigation, theme, t
    } = this.props;
    const { query } = this.state;

    return (
      <SafeAreaView style={[styles.wrapper, styles.theme.wrapper]}>
        <SearchBarHeader
          title={'Bookmarks'}
          noIcon={true}
          onChange={this.setQuery}
          value={query}
          isSearchOpen={this.state.isSearchOpen}
          setIsSearchOpen={val => this.setState({ isSearchOpen: val })}
        />
        <ScrollView style={styles.container} >
          <View style={styles.innerContainer}>
            <View style={styles.form}>
              <Bookmarks
                navigate={navigation.navigate}
                draggable={true}
                setRef={this.setRef}
                query={query}
              />
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={[styles.titleContainer]}
          onPress={() =>
            navigation.navigate({ name: 'AddBookmark', params: { title: t('New bookmark') } })
          }
        >
          <Icon
            style={[styles.addButtonIcon]}
            name="cross"
            color={colors[theme].white}
            size={35}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

export default withTheme(translate()(Bookmark), getStyles());
