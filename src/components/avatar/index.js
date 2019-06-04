import React from 'react';
import { View, Animated } from 'react-native';
import Svg, { G } from 'react-native-svg';
import { Gradients, gradientSchemes } from './gradients';
import {
  getShape, getBackgroundCircle, pickTwo, getHashChunks,
  randomId, replaceUrlByHashOnScheme,
} from './utils';
import { validateAddress } from '../../utilities/validators';
import Icon from '../toolBox/icon';
import { colors } from '../../constants/styleGuide';
import { setColorOpacity } from '../../utilities/helpers';
import withTheme from '../withTheme';
import getStyles from './styles';

class Avatar extends React.Component {
  shouldComponentUpdate(nextProps) {
    return nextProps.address !== this.props.address;
  }

  componentWillMount() {
    this.uniqueSvgUrlHash = randomId();
  }

  render() {
    const {
      styles, address, size, scale, translate, theme,
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
    if (validateAddress('LSK', address) !== 0) {
      return (
        <Wrapper style={[styles.figure, this.props.style,
          { width: size, borderRadius: size / 2 }, scaleAttr,
        ]}>
          <Icon
            style={[
              styles.avatar,
              { width: '100%', height: '100%' },
            ]}
            name='avatar-placeholder'
            size={size}
            color={setColorOpacity(colors[theme].white, 0.24)}
          />
        </Wrapper>
      );
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
          <G>
            {shapes.map((shape, i) => (
              <shape.component {...shape.props} key={`${i}-${shape.component.displayName}-${Math.random()}`}/>
            ))}
          </G>
        </Svg>
      </Wrapper>
    );
  }
}

export default withTheme(Avatar, getStyles());
