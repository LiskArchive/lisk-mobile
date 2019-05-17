import React from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import List from './list';
import Empty from './empty';
import withTheme from '../withTheme';
import { tokenKeys } from '../../constants/tokens';
import getStyles from './styles';

@connect(state => ({
  list: state.accounts.followed,
  activeToken: state.settings.token.active,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class Bookmarks extends React.Component {
  render() {
    const {
      styles, list, navigate, query,
      setRef, draggable, activeToken,
    } = this.props;
    const showAvatar = activeToken === tokenKeys[0];

    const filterList = list[activeToken].filter((item) => {
      if (query.length === 0) return true;
      return (item.address.indexOf(query) >= 0 ||
        item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0);
    });

    return (<View style={styles.container}>
      {
        list && list[activeToken].length === 0 ?
        <Empty usedIn={draggable ? 'bookmarks' : 'send'} /> :
        <List
          draggable={draggable}
          list={filterList}
          showAvatar={showAvatar}
          setRef={setRef}
          navigate={navigate}
        />
      }
    </View>);
  }
}
export default withTheme(translate()(Bookmarks), getStyles());
