import React, { createContext, useState } from 'react';

// eslint-disable-next-line import/no-cycle
import {
  PickerItem,
  PickerLabel,
  PickerMenu,
  PickerToggle
} from './components';

export const PickerContext = createContext({});

export default function Picker({
  children,
  value,
  onChange
}) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <PickerContext.Provider
      value={{
        showMenu,
        setShowMenu,
        value,
        onChange
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
