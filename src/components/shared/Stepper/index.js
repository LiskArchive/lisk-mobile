import React, { useState } from 'react';
import { View } from 'react-native';
import ProgressBar from 'components/shared/ProgressBar';

import { useTheme } from 'hooks/useTheme';

import getStyles from './styles';

// eslint-disable-next-line max-statements
export default function Stepper({
  children,
  finalCallback,
  showProgressBar,
  styles: baseStyles,
  customProgressLength,
}) {
  const [key, setKey] = useState(0);
  const [data, setData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

  const { styles } = useTheme({
    styles: getStyles(),
  });

  const keepTargetInRange = (target, moves, index, totalSteps) => {
    if (typeof target === 'number') {
      return Math.max(Math.min(target, totalSteps - 1), 0);
    }
    return moves > 0 ? Math.min(index + moves, totalSteps - 1) : Math.max(0, index + moves);
  };

  const move = ({ moves, to, data: sharedData, reset = false }) => {
    const next = keepTargetInRange(to, moves, currentIndex, children.length);

    setCurrentIndex(next);
    setData(sharedData);
    setKey(reset ? key + 1 : key);
  };

  const next = (sharedData) => {
    move({ moves: 1, data: sharedData });
  };

  const prev = (moves = -1) => {
    const stepsBack = typeof moves === 'number' ? moves : -1;
    move({ moves: stepsBack });
  };

  const reset = (sharedData = {}) => {
    move({ to: 0, data: sharedData, reset: true });
  };

  const extraProps = {
    nextStep: next,
    move,
    prevStep: prev,
    sharedData: data,
    reset,
  };

  if (currentIndex === children.length - 1) {
    if (typeof finalCallback === 'function') {
      extraProps.finalCallback = finalCallback;
    }
  }

  const currentChild = React.Children.toArray(children)[currentIndex];

  return (
    <View style={[styles.flex, baseStyles?.container]}>
      {showProgressBar && (
        <ProgressBar
          current={currentIndex}
          length={customProgressLength || children.length}
          styles={baseStyles?.progressBar}
        />
      )}
      {React.cloneElement(currentChild, extraProps)}
    </View>
  );
}
