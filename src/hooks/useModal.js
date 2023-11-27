import { useContext, useEffect } from 'react';

import { ModalContext } from 'contexts/ModalContext';

/**
 * @typedef {object} UseModalHookValues
 * @property {function} open - Callback to open the modal.
 * @property {function} close - Callback to close the modal.
 */

/**
 * @callback UseModalRenderComponentParam - Render function for useModal hook.
 * @param {ModalContextValues} modal - Modal context instance.
 * @returns {React.Node} - The component to render inside the modal.
 */

/**
 * Custom hook that provides functionality to show and close a modal dialog.
 * @param {UseModalRenderComponentParam | undefined} renderComponent - A function that renders the modal content.
 * @param {React.DependencyList | undefined} componentDeps - An optional array of dependencies to pass to the useEffect hook.
 * @returns {ModalContextValues & UseModalHookValues} - An object containing the modal context and open and close functions.
 */
export function useModal(renderComponent, componentDeps = []) {
  const modal = useContext(ModalContext);

  const close = () => {
    modal.toggle(false);
    modal.setComponent(null);
  };

  const open = (componentRendered = renderComponent({ ...modal, close }), showCloseIcon = true) => {
    modal.setComponent(componentRendered);
    modal.setShowClose(showCloseIcon);
    modal.toggle(true);
  };

  useEffect(() => {
    if (modal.component && renderComponent) {
      modal.setComponent(renderComponent({ ...modal, open, close }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, componentDeps);

  return { ...modal, open, close };
}
