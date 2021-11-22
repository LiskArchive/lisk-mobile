import React from 'react';
import {
  View, TouchableOpacity, ScrollView
} from 'react-native';
import { translate } from 'react-i18next';
import Icon from '../../shared/toolBox/icon';
import Input from '../../shared/toolBox/input';
import { colors } from '../../../constants/styleGuide';
import { SCREEN_HEIGHTS, deviceHeight } from '../../../utilities/device';
import withTheme from '../../shared/withTheme';
import getStyles from './styles';
import Bookmarks from '../../shared/bookmarks';

class Bookmark extends React.Component {
  activeInputRef = null;

  scannedData = {};

  state = {
    header: true,
    query: '',
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
    const isSmallScreen = deviceHeight() < SCREEN_HEIGHTS.SM;

    return (
      <View style={[styles.wrapper, styles.theme.wrapper]}>
        <ScrollView style={styles.container} >
          <View style={styles.innerContainer}>
            <View style={styles.form}>
              <View style={styles.addressContainer}>
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={18}
                  color={colors.light.blueGray}
                />
                <Input
                  label={isSmallScreen ? '' : t('Search')}
                  placeholder={isSmallScreen ? t('Search for a bookmark') : ''}
                  autoCorrect={false}
                  reference={input => {
                    this.input = input;
                  }}
                  innerStyles={{
                    errorMessage: styles.errorMessage,
                    input: [styles.input, styles.addressInput],
                    containerStyle: styles.addressInputContainer,
                  }}
                  onChange={this.setQuery}
                  value={query}
                />
              </View>
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
            size={25}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default withTheme(translate()(Bookmark), getStyles());
