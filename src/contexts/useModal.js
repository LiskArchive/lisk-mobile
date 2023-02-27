import { useContext } from 'react';
import { ModalContext } from 'contexts/ModalContext';

export const useModal = () => {
  const { toggle, setComponent, component, isOpen, showClose, setShowClose } =
    useContext(ModalContext);

  const showModal = (componentRendered, showCloseIcon = true) => {
    toggle(true);
    setComponent(componentRendered);
    setShowClose(showCloseIcon);
  };

  const closeModal = () => {
    toggle(false);
    setComponent(null);
  };

  return { isOpen, toggle, showModal, closeModal, component, showClose };
};
