import React from 'react';

import { useModal } from 'hooks/useModal';
import { PickerContext } from './hooks';
import { PickerItem, PickerLabel, usePickerMenu, PickerToggle } from './components';

export default function Picker({ children, value, error }) {
  const modal = useModal();

  return (
    <PickerContext.Provider
      value={{
        showMenu: modal.isOpen,
        setShowMenu: modal.toggle,
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
