import React, { useMemo } from 'react';
import { View, Text } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';

import getStyles from './styles';

function StepItem({ step, styles, baseStyles, current, isLast }) {
  const isActive = current >= step;

  return (
    <>
      <View style={[styles.bulletContainer]}>
        <View style={[styles.bullet, styles.theme.bullet, isActive && styles.activeBullet]}>
          {isActive && <Text style={[styles.progressTitle]}>{step + 1}</Text>}
        </View>
      </View>

      {!isLast && (
        <View
          style={[
            styles.rail,
            styles.theme.rail,
            current > step && styles.activeRail,
            baseStyles?.stepContainer,
          ]}
        />
      )}
    </>
  );
}

export default function ProgressBar({ styles: baseStyles, current, length }) {
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
    <View style={[styles.container, styles.theme.container, baseStyles?.wrapper]}>
      {steps.map((_, i) => (
        <StepItem
          key={i}
          step={i}
          current={current}
          styles={styles}
          baseStyles={baseStyles?.item}
          isLast={i === steps.length - 1}
        />
      ))}
    </View>
  );
}
