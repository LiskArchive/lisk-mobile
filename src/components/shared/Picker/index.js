import React from 'react';

import { useModal } from 'contexts/useModal';
import { PickerContext } from './hooks';
import { PickerItem, PickerLabel, usePickerMenu, PickerToggle } from './components';

export default function Picker({ children, value, error }) {
  const { toggle, isOpen } = useModal();

  return (
    <PickerContext.Provider
      value={{
        showMenu: isOpen,
        setShowMenu: toggle,
        value,
        error,
      }}
    >
      {children}
    </PickerContext.Provider>
  );
}

Picker.usePickerMenu = usePickerMenu;
Picker.Item = PickerItem;
Picker.Label = PickerLabel;
Picker.Toggle = PickerToggle;
