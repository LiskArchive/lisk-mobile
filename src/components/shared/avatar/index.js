/* eslint-disable max-statements */
import React from 'react';
import { View, Animated } from 'react-native';
import Svg, { G } from 'react-native-svg';
import { validateAddress } from 'utilities/validators';
import { colors, themes } from 'constants/styleGuide';
import { Gradients, gradientSchemes } from './gradients';
import {
  getShape,
  getBackgroundCircle,
  pickTwo,
  getHashChunks,
  randomId,
  replaceUrlByHashOnScheme,
} from './utils';
import Icon from '../toolBox/icon';
import { useTheme } from 'contexts/ThemeContext';

import getStyles from './styles';

export default function Avatar({ address, size, scale, translate, style }) {
  const { styles, theme } = useTheme({ styles: getStyles() });
  const uniqueSvgUrlHash = randomId();

  let Wrapper = View;
  const scaleAttr = {};

  if (scale) {
    Wrapper = Animated.View;
    scaleAttr.transform = [
      { scaleX: scale },
      { scaleY: scale },
      { translateY: translate },
      { translateX: translate },
    ];
  }

  if (validateAddress(address) !== 0) {
    return (
      <Wrapper style={[styles.figure, style, { width: size, borderRadius: size / 2 }, scaleAttr]}>
        <Icon
          style={[styles.avatar, { width: '100%', height: '100%' }]}
          name="avatar-placeholder"
          size={size}
          color={theme === themes.light ? colors.light.blueGray : colors.dark.mountainMist}
        />
      </Wrapper>
    );
  }

  const canvasSize = 200;
  const addressHashChunks = getHashChunks(address);
  const gradientScheme =
    gradientSchemes[addressHashChunks[0].substring(1, 3) % gradientSchemes.length];

  const gradientsSchemesUrlsHashed = {
    primary: gradientScheme.primary.map((...rest) =>
      replaceUrlByHashOnScheme(uniqueSvgUrlHash, ...rest)
    ),
    secondary: gradientScheme.secondary.map((...rest) =>
      replaceUrlByHashOnScheme(uniqueSvgUrlHash, ...rest)
    ),
  };

  const primaryGradients = pickTwo(addressHashChunks[1], gradientsSchemesUrlsHashed.primary);
  const secondaryGradients = pickTwo(addressHashChunks[2], gradientsSchemesUrlsHashed.secondary);

  const shapes = [
    getBackgroundCircle(canvasSize, primaryGradients[0]),
    getShape(addressHashChunks[1], canvasSize, primaryGradients[1], 1),
    getShape(addressHashChunks[2], canvasSize, secondaryGradients[0], 0.23),
    getShape(addressHashChunks[3], canvasSize, secondaryGradients[1], 0.18),
  ];

  return (
    <Wrapper style={[styles.figure, style, { width: size, borderRadius: size / 2 }, scaleAttr]}>
      <Svg
        viewBox={`0 0 ${canvasSize} ${canvasSize}`}
        preserveAspectRatio="none"
        height={size}
        width={size}
        style={[
          styles.avatar,
          {
            width: '100%',
            height: '100%',
            borderRadius: size / 2,
          },
        ]}
      >
        <Gradients scheme={gradientsSchemesUrlsHashed} />
        <G>
          {shapes.map((shape, i) => (
            <shape.component
              {...shape.props}
              key={`${i}-${shape.component.displayName}-${Math.random()}`}
            />
          ))}
        </G>
      </Svg>
    </Wrapper>
  );
}
