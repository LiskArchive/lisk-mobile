import React, { useMemo } from 'react';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'hooks/useTheme';
import List from './List';
import getStyles from './styles';
import { selectBookmarkList } from '../store/selectors';
import ResultScreen from '../../../components/screens/ResultScreen';
import EmptyIllustrationSvg from '../../../assets/svgs/EmptyIllustrationSvg';

const BookmarkList = ({
  onPress,
  query = '',
  setRef,
  draggable,
  renderEmpty,
  filterAddress,
  Component,
}) => {
  const styles = useTheme({ styles: getStyles() });
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

  return (
    <View style={[!draggable && styles.container]}>
      {filterList?.length === 0 ? (
        renderEmpty && (
          <ResultScreen
            illustration={<EmptyIllustrationSvg />}
            description="You do not have any bookmarks yet."
            styles={{
              wrapper: { height: 4 },
              container: { height: 4 },
            }}
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
      )}
    </View>
  );
};

export default BookmarkList;
