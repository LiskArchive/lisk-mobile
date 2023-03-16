import React, { useState } from 'react';

export const ModalContext = React.createContext(false);

/**
 * @typedef {object} ModalContextValues
 * @property {boolean} isOpen - Flag that indicates if a modal instance is open or not.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} toggle - Callback to set the isOpen value.
 * @property {React.Node} component - Component to render inside the modal
 * @property {React.Dispatch<React.SetStateAction<React.Node>>} setComponent - Callback to set the component value.
 * @property {boolean} showClose - Flag that indicates if the modal should render or not the close button.
 * @property {React.Dispatch<React.SetStateAction<boolean>>} setShowClose - Callback to set the showClose value.
 */

/**
 * Provides a context for managing in a single point the rendering of content over a modal.
 * @param {object} props
 * @param {React.ReactNode} props.children - Children to inject the context to.
 * @returns {React.Context<ModalContextValues>} Provided children wrapped on the context provider.
 */
export function ModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [component, setComponent] = useState(null);
  const [showClose, setShowClose] = useState(true);

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        toggle: setIsOpen,
        component,
        setComponent,
        showClose,
        setShowClose,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
}
