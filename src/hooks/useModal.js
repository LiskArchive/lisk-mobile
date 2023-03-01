import { useContext } from 'react';
import { ModalContext } from 'contexts/ModalContext';

export const useModal = () => {
  const { toggle, setComponent, component, isOpen, showClose, setShowClose } =
    useContext(ModalContext);

  const open = (componentRendered, showCloseIcon = true) => {
    toggle(true);
    setComponent(componentRendered);
    setShowClose(showCloseIcon);
  };

  const close = () => {
    toggle(false);
    setComponent(null);
  };

  return { isOpen, toggle, open, close, component, showClose };
};
