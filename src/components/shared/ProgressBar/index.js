import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import getStyles from './styles';

const StepItem = ({
  step, styles, baseStyles, current, isLast
}) => <>
    <View style={[styles.progressTitleContainer]} >
      <Text style={[styles.progressTitle]} >{step + 1}</Text>
    </View>
    {!isLast && <View
      style={[styles.progressStepContainer,
        styles.theme.progressStepContainer,
        current > step && styles.activeStep,
        baseStyles?.stepContainer,
      ]}
    />}
  </>;

export default function ProgressBar({
  styles: baseStyles,
  current,
  length
}) {
  const { styles } = useTheme({
    styles: getStyles(),
  });

  const steps = useMemo(() => {
    const res = [];
    for (let i = 0; i < length; i++) {
      res.push(i + 1);
    }
    return res;
  }, [length]);

  return (
    <View
      style={[
        styles.progressContainer,
        styles.theme.progressContainer,
        baseStyles?.wrapper,
      ]}
    >
      {steps.map((_, i) => (
        <StepItem
          key={i}
          step={i}
          current={current}
          styles={styles}
          baseStyles={baseStyles}
          isLast={i === steps.length - 1}
        />
      ))}
    </View>
  );
}
