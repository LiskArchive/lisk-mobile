import { useContext } from 'react';
import { ModalContext } from 'contexts/ModalContext';

export const useModal = () => {
  const { toggle } = useContext(ModalContext);

  return { toggle };
};
