import { useContext, useEffect } from 'react';

import { ModalContext } from 'contexts/ModalContext';

export const useModal = (renderComponent, componentDeps = []) => {
  const modal = useContext(ModalContext);

  const open = (componentRendered = renderComponent(modal), showCloseIcon = true) => {
    modal.toggle(true);
    modal.setComponent(componentRendered);
    modal.setShowClose(showCloseIcon);
  };

  const close = () => {
    modal.toggle(false);
    modal.setComponent(null);
  };
  useEffect(() => {
    if (modal.component && renderComponent) {
      modal.setComponent(renderComponent({ ...modal, open, close }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, componentDeps);

  return { ...modal, open, close };
};
