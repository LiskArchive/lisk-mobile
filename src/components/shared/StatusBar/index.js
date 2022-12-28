import React from 'react';
import { StatusBar as BaseStatusBar } from 'react-native';
import { useSelector } from 'react-redux';

import { themes } from 'constants/styleGuide';

export default function StatusBar() {
  const { theme } = useSelector((state) => state.settings);

  return <BaseStatusBar barStyle={theme === themes.light ? 'dark-content' : 'light-content'} />;
}
