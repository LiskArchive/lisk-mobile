import React, { Fragment } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import {
  settingsUpdated as settingsUpdatedAction,
} from '../../actions/settings';
import { validateAddress } from '../../utilities/validators';
import List from './list';
import Empty from './empty';
import withTheme from '../withTheme';
import { Small } from '../toolBox/typography';
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
      setRef, draggable, t, activeToken,
    } = this.props;
    const showAvatar = activeToken === tokenKeys[0];

    const filterList = list[activeToken].filter((item) => {
      if (query.length === 0) return true;
      return (item.address.indexOf(query) >= 0 ||
        item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0);
    });

    return (<View style={styles.container}>
      {
        (list && list[activeToken].length === 0 && validateAddress(activeToken, query) !== 1) ?
        <Empty usedIn={draggable ? 'bookmarks' : 'send'} /> :
        <Fragment>
          {
            validateAddress(activeToken, query) === 1 ?
              <View style={styles.innerContainer}>
                <Small style={[styles.noResult, styles.theme.noResult]}>
                  {t('Couldn’t recognize the address or label. Please make sure it’s correct.')}
                </Small>
              </View> :
              <List
                draggable={draggable}
                list={filterList}
                showAvatar={showAvatar}
                setRef={setRef}
                navigate={navigate}
              />
          }
        </Fragment>
      }
    </View>);
  }
}
export default withTheme(translate()(Bookmarks), getStyles());
