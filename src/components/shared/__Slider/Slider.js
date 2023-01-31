import React, { useRef, useState } from 'react';
import { Animated, FlatList, View } from 'react-native';

import SliderSlide from './components/SliderSlide';
import SliderPagination from './components/SliderPagination';

export default function Slider({ data, style }) {
  const [index, setIndex] = useState(0);

  const scrollX = useRef(new Animated.Value(0)).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  const handleOnViewableItemsChanged = useRef(({ viewableItems }) => {
    if (viewableItems[0]) {
      setIndex(viewableItems[0]?.index);
    }
  }).current;

  const handleOnScroll = (event) => {
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
  };

  return (
    <View style={style?.container}>
      <FlatList
        data={data}
        renderItem={({ item }) => <SliderSlide item={item} />}
        horizontal
        pagingEnabled
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        onScroll={handleOnScroll}
        onViewableItemsChanged={handleOnViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
      />

      <SliderPagination data={data} scrollX={scrollX} index={index} />
    </View>
  );
}
