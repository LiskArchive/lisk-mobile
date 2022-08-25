import React from 'react';

import { colors } from 'constants/styleGuide';
import ApplicationsSvg from 'assets/svgs/ApplicationsSvg';
import HomeSvg from 'assets/svgs/HomeSvg';
import BookmarksSvg from 'assets/svgs/BookmarksSvg';
import SettingsSvg from 'assets/svgs/SettingsSvg';

export default function TabBarIcon({ name, focused, size = 26 }) {
  const props = {
    height: size,
    width: size,
    color: colors.light.white,
    variant: focused ? 'fill' : 'outline'
  };

  switch (name) {
    case 'Home':
      return <HomeSvg {...props} />;

    case 'Applications':
      return <ApplicationsSvg {...props} />;

    case 'Bookmarks':
      return <BookmarksSvg {...props} />;

    case 'Settings':
      return <SettingsSvg {...props} />;

    default:
      return null;
  }
}
