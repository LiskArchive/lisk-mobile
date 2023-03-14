import React, { useState } from 'react';

export const ModalContext = React.createContext(false);

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState(null);
  const [showClose, setShowClose] = useState(true);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        toggle: setIsOpen,
        setComponent,
        component,
        showClose,
        setShowClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
