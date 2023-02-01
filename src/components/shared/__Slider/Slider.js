/* eslint-disable max-statements */
import React, { useCallback, useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';

import SliderSlide from './components/SliderSlide';
import SliderPagination from './components/SliderPagination';

export default function Slider({ data, renderController, style }) {
  const [index, setIndex] = useState(0);

  const flatListRef = useRef(FlatList);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setIndex(viewableItems[0]?.index);
    }
  }).current;

  const handleOnScroll = useCallback(
    (event) => {
      Animated.event(
        [
          {
            nativeEvent: {
              contentOffset: {
                x: scrollX,
              },
            },
          },
        ],
        {
          useNativeDriver: false,
        }
      )(event);
    },
    [scrollX]
  );

  const handleGoPrevIndex = useCallback(() => {
    if (index > 0) {
      const updatedIndex = index - 1;

      setIndex(updatedIndex);

      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: updatedIndex,
      });
    }
  }, [index]);

  const handleGoNextIndex = useCallback(() => {
    if (index < data.length - 1) {
      const updatedIndex = index + 1;

      setIndex(updatedIndex);

      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: updatedIndex,
      });
    }
  }, [data, index]);

  const handleGoToLastIndex = useCallback(() => {
    if (index < data.length - 1) {
      const updatedIndex = data.length - 1;

      setIndex(updatedIndex);

      flatListRef?.current?.scrollToIndex({
        animated: true,
        index: updatedIndex,
      });
    }
  }, [index, data]);

  const dataCount = data.length;

  return (
    <>
      <View style={style?.container}>
        <FlatList
          ref={flatListRef}
          data={data}
          renderItem={({ item }) => <SliderSlide item={item} style={style?.slide} />}
          horizontal
          pagingEnabled
          snapToAlignment="center"
          showsHorizontalScrollIndicator={false}
          onScroll={handleOnScroll}
          onViewableItemsChanged={handleOnViewableItemsChanged}
          viewabilityConfig={viewabilityConfig}
        />

        <SliderPagination style={style?.pagination} data={data} scrollX={scrollX} />
      </View>

      {renderController &&
        renderController({
          index,
          setIndex,
          handleGoPrevIndex,
          handleGoNextIndex,
          handleGoToLastIndex,
          dataCount,
        })}
    </>
  );
}
