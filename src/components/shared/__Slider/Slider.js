/* eslint-disable max-statements */
import React, { useCallback, useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';

import SliderSlide from './components/SliderSlide';
import SliderPagination from './components/SliderPagination';

/**
 * A slideshow component for cycling through elements (slides) sequentially.
 * @typedef {Object} DataItem
 * @property {string} key - Unique key of the item
 * @property {React.ReactNode} item - Data item to be rendered in the slide
 *
 * @typedef {Object} Style
 * @property {Object} container - Style for the container view
 * @property {Object} slide - Style for the slide component
 * @property {Object} pagination - Style for the pagination component
 *
 * @typedef {Object} RenderControllerProps
 * @property {number} index - Index of the currently selected item
 * @property {Function} setIndex - Function to set the index of the selected item
 * @property {Function} handleGoPrevIndex - Function to handle go to previous index
 * @property {Function} handleGoNextIndex - Function to handle go to next index
 * @property {Function} handleGoToLastIndex - Function to handle go to last index
 * @property {number} dataCount - Total count of data items
 *
 * @typedef {Function} RenderController
 * @param {RenderControllerProps} props - Props to be passed to the render controller component
 *
 * @interface SliderProps
 * @property {Array<DataItem>} data - Array of data items to be displayed in the slider
 * @property {RenderController} [renderController] - Render controller component
 * @property {Style} [style] - Style for the slider components
 */
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
