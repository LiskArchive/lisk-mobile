import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import i18next from 'i18next';

import EmptyIllustrationSvg from 'assets/svgs/EmptyIllustrationSvg';
import ResultScreen from 'components/screens/ResultScreen';

import List from './List';
import { selectBookmarkList } from '../store/selectors';

const BookmarkList = ({
  onPress,
  query = '',
  setRef,
  draggable,
  renderEmpty,
  filterAddress,
  Component,
}) => {
  const list = useSelector(selectBookmarkList);

  const filterList = useMemo(
    () =>
      list?.filter((item) => {
        if (filterAddress) {
          return false;
        }
        if (query?.length === 0) return true;
        return (
          item.address.indexOf(query) >= 0 ||
          item.label.toLowerCase().indexOf(query?.toLowerCase()) >= 0
        );
      }),
    [list, filterAddress, query]
  );

  return filterList?.length === 0 ? (
    renderEmpty && (
      <ResultScreen
        illustration={<EmptyIllustrationSvg />}
        description={i18next.t('bookmarks.emptyText')}
      />
    )
  ) : (
    <List
      draggable={draggable}
      list={filterList}
      showAvatar
      setRef={setRef}
      onPress={onPress}
      Component={Component}
    />
  );
};

export default BookmarkList;
