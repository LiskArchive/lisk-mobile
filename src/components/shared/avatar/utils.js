import { Circle, Polygon, Rect } from 'react-native-svg';
import BigNumber from 'bignumber.js';
import crypto from 'crypto';

/*
 * Account Visual
 *
 * The account visual is an svg image generated based on account address.
 *
 * The account visual randomly selects one of 8 color schemes defined in ./gradients
 * Each color scheme consists of
 * - 2 primary colors for the 2 big shapes,
 * - 4 secondary colors for the 2 small shapes
 *
 *
 * It contains 4 shapes (in this order from background to foreground):
 * - Circle of size 1 and random primary color
 * - A random shape of base size 1 of primary color other then previous
 * - A random shape of base size 0.23 and one secondary color
 * - A random shape of base size 0.18 and other secondary color
 *
 * The base size of random shapes is multiplied by a random scale factor
 * from range 1.2, 1.3, ..., 2.0, 2.1
 *
 * Possible shapes are: Square, Triangle, Circle
 *
 * Each shape is randomly rotated around the center of the account visual.
 *
 * Randomness of each step is defined by a part of decimal representation of sha256 hash of address.
 * If there are 10 options to choose from then 1 digit is used.
 * If there are 3 or 4 options to choose from then 2 digits is used
 * to give more even distribution, because e.g. with 1 digit and 3 options
 * the first option has 4/10 chance and each of other two has 3/10 chance.
 */

const computeTriangle = props => ({
  points: [
    {
      x: props.x,
      y: props.y,
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 4,
    },
    {
      x: props.x + props.size / 4,
      y: props.y + props.size,
    },
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(' '),
});

const computePentagon = props => ({
  points: [
    {
      x: props.x + props.size / 2,
      y: props.y,
    },
    {
      x: props.x + props.size,
      y: props.y + props.size / 2.5,
    },
    {
      x: props.x + (props.size - props.size / 5),
      y: props.y + props.size,
    },
    {
      x: props.x + props.size / 5,
      y: props.y + props.size,
    },
    {
      x: props.x,
      y: props.y + props.size / 2.5,
    },
  ]
    .map(({ x, y }) => `${x},${y}`)
    .join(' '),
});

export const getShape = (chunk, size, gradient, sizeScale = 1) => {
  const shapeNames = ['circle', 'triangle', 'square'];

  const sizes = [1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.0, 2.1].map(
    x => x * size * sizeScale
  );

  const coordinates = [5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map(
    x => x * (size / 40)
  );

  const shapes = {
    circle: {
      component: Circle,
      props: {
        cx: coordinates[chunk[1]] + sizes[chunk[3]] / 2,
        cy: coordinates[chunk[2]] + sizes[chunk[3]] / 2,
        r: sizes[chunk[3]] / 2,
      },
    },
    square: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[3]],
      },
    },
    rect: {
      component: Rect,
      props: {
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        height: sizes[chunk[3]],
        width: sizes[chunk[4]],
      },
    },
    triangle: {
      component: Polygon,
      props: computeTriangle({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
    pentagon: {
      component: Polygon,
      props: computePentagon({
        x: coordinates[chunk[1]],
        y: coordinates[chunk[2]],
        size: sizes[chunk[3]],
      }),
    },
  };

  return {
    component:
      shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].component,
    props: {
      ...shapes[shapeNames[chunk.substr(0, 2) % shapeNames.length]].props,
      fill: gradient.url,
      rotation: chunk.substr(1, 2) * 3.6,
      origin: '100, 100',
    },
  };
};

export const getBackgroundCircle = (size, gradient) => ({
  component: Circle,
  props: {
    cx: size / 2,
    cy: size / 2,
    r: size / 2,
    fill: gradient.url,
  },
});

export const pickTwo = (chunk, options) => [
  options[chunk.substr(0, 2) % options.length],
  options[
    (chunk.substr(0, 2) - 0 + 1 + (chunk.substr(2, 2) % (options.length - 1))) %
      options.length
  ],
];

export const getHashChunks = address => {
  const hash = crypto.createHash('sha256');
  const addressHash = new BigNumber(`0x${hash.update(address).digest('hex')}`)
    .toString()
    .substr(3);
  return addressHash.match(/\d{5}/g);
};

export const randomId = () =>
  `avatar-${[1, 2, 3, 4].map(() => Math.random() * 100).join('')}`;

export const replaceUrlByHashOnScheme = (uniqueSvgUrlHash, gradientScheme) => ({
  ...gradientScheme,
  url: gradientScheme.url.replace(/\)/g, `-${uniqueSvgUrlHash})`),
  id: `${gradientScheme.id}-${uniqueSvgUrlHash}`,
});
