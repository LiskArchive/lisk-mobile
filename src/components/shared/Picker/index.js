import React, { createContext, useState, useRef } from 'react';

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
  options,
  value,
  onChange
}) {
  const [showMenu, setShowMenu] = useState(false);

  const menuContainerRef = useRef(null);

  return (
    <PickerContext.Provider
      value={
        {
          showMenu,
          setShowMenu,
          menuContainerRef,
          options,
          value,
          onChange
        }
      }
    >
      {children}
    </PickerContext.Provider>
  );
}

Picker.Menu = PickerMenu;
Picker.Item = PickerItem;
Picker.Label = PickerLabel;
Picker.Toggle = PickerToggle;
