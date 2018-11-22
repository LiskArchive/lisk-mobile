import React, { Fragment } from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import Item from './item';
import Empty from './empty';
import { Small } from '../toolBox/typography';
import withTheme from '../withTheme';
import getStyles from './styles';

/**
 * This component is a HOC to decide which state to show:
 * Loading, Empty (No transactions) or the List view.
 *
 * It performs the initial animation after the user logged in.
 *
 */
@connect(state => ({
  incognito: state.settings.incognito,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class Bookmarks extends React.Component {
  render() {
    const {
      styles, list, navigate, query,
    } = this.props;

    const filterList = list.filter((item) => {
      if (query.length === 0) return true;
      return (item.address.indexOf(query) >= 0 ||
        item.label.indexOf(query) >= 0);
    });

    return (<View style={styles.container}>
      {
        (list && list.length === 0 && query.length > 0) ?
        <Empty /> :
          <Fragment>
            <View style={styles.innerContainer}>
              <Small style={[styles.title, styles.theme.title]}>BOOKMARKS</Small>
            </View>
            {
              filterList.map(item => <Item navigate={navigate} key={item.address} data={item} />)
            }
          </Fragment>
      }
    </View>);
  }
}
export default withTheme(Bookmarks, getStyles());
