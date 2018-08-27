import React from 'react';
import { Text } from 'react-native';
import theme from './styles';

Text.defaultProps.allowFontScaling = false;

export const H1 = ({ children, style, onPress }) =>
  <Text style={[theme.h1, style]} onPress={onPress}>{ children }</Text>;

export const H2 = ({ children, style, onPress }) =>
  <Text style={[theme.h2, style]} onPress={onPress}>{ children }</Text>;

export const H3 = ({ children, style, onPress }) =>
  <Text style={[theme.h3, style]} onPress={onPress}>{ children }</Text>;

export const H4 = ({ children, style, onPress }) =>
  <Text style={[theme.h4, style]} onPress={onPress}>{ children }</Text>;

export const P = ({ children, style, onPress }) =>
  <Text style={[theme.p, style]} onPress={onPress}>{ children }</Text>;

export const B = ({ children, style, onPress }) =>
  <Text style={[theme.B, style]} onPress={onPress}>{ children }</Text>;

export const Span = ({ children, style, onPress }) =>
  <Text style={[theme.span, style]} onPress={onPress}>{ children }</Text>;

export const Small = ({ children, style, onPress }) =>
  <Text style={[theme.small, style]} onPress={onPress}>{ children }</Text>;

export const A = ({ children, style, onPress }) =>
  <Text style={[theme.a, style]} onPress={onPress}>{ children }</Text>;
