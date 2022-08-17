import React from 'react';
import { View, Dimensions } from 'react-native';

import { useTheme } from 'hooks/useTheme';

import getStyles from './styles';

export default function ProgressBar({
  styles: baseStyles,
  current,
  total
}) {
  const { styles } = useTheme({
    styles: getStyles(),
  });

  const steps = [];
  for (let i = 0; i < total - 1; i++) {
    steps.push(i + 1);
  }

  const deviceWidth = Dimensions.get('window').width;
  const marginBetweenSteps = 3;
  const stepWidth = deviceWidth / (total - 1) - marginBetweenSteps;

  return (
      <View
        style={[
          styles.progressContainer,
          styles.theme.progressContainer,
          { opacity: current === total ? 0 : 1 },
          baseStyles?.wrapper,
        ]}
      >
        {steps.map(step => (
          <View
            key={step}
            style={[
              styles.theme.progressStepContainer,
              { width: stepWidth },
              baseStyles?.stepContainer
            ]}
          >
            <View
              style={[
                styles.progressStep,
                { width: step <= current ? '100%' : 0 },
                baseStyles?.step,
              ]}
            />
          </View>
        ))}
      </View>
  );
}
