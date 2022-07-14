import React, { useMemo } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { tokenKeys } from 'constants/tokens';
import { validateAddress } from 'utilities/validators';
import withTheme from 'components/shared/withTheme';
import EmptyState from './EmptyState';
import List from './List';
import getStyles from './styles';

const Repeater = ({
  styles,
  list,
  navigate,
  query,
  setRef,
  draggable,
  activeToken,
  renderEmpty,
  filterAddress
}) => {
  const showAvatar = activeToken === tokenKeys[0];

  const filterList = useMemo(() =>
    list?.filter(item => {
      if (filterAddress && validateAddress(tokenKeys[0], item.address) === 1) {
        return false;
      }
      if (query.length === 0) return true;
      return (
        item.address.indexOf(query) >= 0
        || item.label.toLowerCase().indexOf(query.toLowerCase()) >= 0
      );
    }), [activeToken, list, tokenKeys]);

  return <View style={[!draggable && styles.container]}>
    {list[activeToken]?.length === 0 || filterList?.length === 0 ? (
      renderEmpty && <EmptyState style={styles.emptyView} />
    ) : (
      <List
        draggable={draggable}
        list={filterList}
        showAvatar={showAvatar}
        setRef={setRef}
        navigate={navigate}
      />
    )}
  </View>;
};

const mapStateToProps = state => ({
  list: [],
  activeToken: state.settings.token.active,
});

export default withTheme(translate()(connect(mapStateToProps)(Repeater)), getStyles());
