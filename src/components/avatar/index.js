import React from 'react';
import { View, Animated } from 'react-native';
import Svg from 'react-native-svg';
import { Gradients, gradientSchemes } from './gradients';
import {
  getShape, getBackgroundCircle, pickTwo, getHashChunks,
  randomId, replaceUrlByHashOnScheme,
} from './utils';
import styles from './styles';

class Avatar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.address !== this.props.address;
  }

  componentWillMount() {
    this.uniqueSvgUrlHash = randomId();
  }

  render() {
    const {
      address, size, scale, translate,
    } = this.props;
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
    const canvasSize = 200;

    const addressHashChunks = getHashChunks(address);
    const gradientScheme = gradientSchemes[
      addressHashChunks[0].substr(1, 2) % gradientSchemes.length];

    const gradientsSchemesUrlsHashed = {
      primary: gradientScheme.primary.map((...rest) =>
        replaceUrlByHashOnScheme(this.uniqueSvgUrlHash, ...rest)),
      secondary: gradientScheme.secondary.map((...rest) =>
        replaceUrlByHashOnScheme(this.uniqueSvgUrlHash, ...rest)),
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
      <Wrapper style={[styles.figure, this.props.style,
        { width: size, borderRadius: size / 2 }, scaleAttr,
      ]}>
        <Svg viewBox={`0 0 ${canvasSize} ${canvasSize}`}
          preserveAspectRatio="none"
          height={size}
          width={size}
          style={[styles.avatar, {
            width: '100%',
            height: '100%',
            borderRadius: size / 2,
            }]}>
          <Gradients scheme={gradientsSchemesUrlsHashed}/>
          {shapes.map((shape, i) => (
            <shape.component {...shape.props} key={`${i}-${shape.component.displayName}-${Math.random()}`}/>
          ))}
        </Svg>
      </Wrapper>
    );
  }
}

export default Avatar;
