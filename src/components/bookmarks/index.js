import React, { Fragment } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { DraggableItem, Item } from './item';
import reg from '../../constants/regex';
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
      styles, list, navigate, query,
      setRef, draggable, t,
    } = this.props;

    const filterList = list.filter((item) => {
      if (query.length === 0) return true;
      return (item.address.indexOf(query) >= 0 ||
        item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0);
    });
    const Element = draggable ? DraggableItem : Item;
    const description = !filterList.length && reg.address.test(query) ?
      t('You can add this address to your bookmarks in bookmarks page or through send process.') :
      t('Couldn’t recognize the address or label. Please make sure it’s correct.');

    return (<View style={styles.container}>
      {
        (list && list.length === 0 && query.length >= 0) ?
        <Empty usedIn={draggable ? 'bookmarks' : 'send'} /> :
        <Fragment>
          {
            filterList.length === 0 ?
              <View style={styles.innerContainer}>
                <Small style={[styles.noResult, styles.theme.noResult]}>{description}</Small>
              </View> :
              filterList.map(item =>
                <Element setRef={setRef} navigate={navigate} key={item.address} data={item} />)
          }
        </Fragment>
      }
    </View>);
  }
}
export default withTheme(translate()(Bookmarks), getStyles());
