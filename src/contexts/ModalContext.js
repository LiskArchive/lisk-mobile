import React, { useState } from 'react';

export const ModalContext = React.createContext(false);

export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        toggle: setIsOpen,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
