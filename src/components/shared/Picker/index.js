import React, { useState } from 'react';

import { PickerContext } from './hooks';
import {
  PickerItem,
  PickerLabel,
  PickerMenu,
  PickerToggle
} from './components';

export default function Picker({
  children,
  value,
  onChange,
  error
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <PickerContext.Provider
      value={{
        showMenu,
        setShowMenu,
        value,
        onChange,
        error
      }}
    >
      {children}
    </PickerContext.Provider>
  );
}

Picker.Menu = PickerMenu;
Picker.Item = PickerItem;
Picker.Label = PickerLabel;
Picker.Toggle = PickerToggle;
