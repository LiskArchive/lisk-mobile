import React, { Fragment } from 'react';
import { View } from 'react-native';
import connect from 'redux-connect-decorator';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { DraggableItem, Item } from './item';
import Empty from './empty';
import withTheme from '../withTheme';
import { Small } from '../toolBox/typography';
import getStyles from './styles';

@connect(state => ({
  list: state.accounts.followed,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class Bookmarks extends React.Component {
  render() {
    const {
      styles, list, navigate, query, setRef, draggable,
    } = this.props;

    const filterList = list.filter((item) => {
      if (query.length === 0) return true;
      return (item.address.toLowerCase().indexOf(query) >= 0 ||
        item.label.toLowerCase().indexOf(query) >= 0);
    });
    const Element = draggable ? DraggableItem : Item;

    return (<View style={styles.container}>
      {
        (list && list.length === 0 && query.length >= 0) ?
        <Empty /> :
        <Fragment>
            {
              !draggable ?
              <View style={styles.innerContainer}>
                <Small style={[styles.title, styles.theme.title]}>BOOKMARKS</Small>
              </View> :
              null
            }
          {
            filterList.length === 0 ?
              <View style={styles.innerContainer}>
                <Small style={[styles.noResult, styles.theme.noResult]}>
                  This address is not part of your bookmarks, you can add it in the next step.
                </Small>
              </View> :
              filterList.map(item =>
                <Element setRef={setRef} navigate={navigate} key={item.address} data={item} />)
          }
        </Fragment>
      }
    </View>);
  }
}
export default withTheme(Bookmarks, getStyles());
