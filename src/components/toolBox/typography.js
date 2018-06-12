import React from 'react';
import { Text } from 'react-native';
import theme from './styles';

export const H1 = ({ children, style }) =>
  <Text style={[theme.h1, style]}>{ children }</Text>;

export const H2 = ({ children, style }) =>
  <Text style={[theme.h2, style]}>{ children }</Text>;

export const H3 = ({ children, style }) =>
  <Text style={[theme.h3, style]}>{ children }</Text>;

export const H4 = ({ children, style }) =>
  <Text style={[theme.h4, style]}>{ children }</Text>;

export const P = ({ children, style }) =>
  <Text style={[theme.p, style]}>{ children }</Text>;

export const Span = ({ children, style }) =>
  <Text style={[theme.span, style]}>{ children }</Text>;

export const Small = ({ children, style }) =>
  <Text style={[theme.small, style]}>{ children }</Text>;

export const A = ({ children, style }) =>
  <Text style={[theme.a, style]}>{ children }</Text>;
