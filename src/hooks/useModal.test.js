import React from 'react';
import { View } from 'react-native';
import { renderHook, act } from '@testing-library/react-hooks';

import { ModalProvider } from '../contexts/ModalContext';
import { useModal } from './useModal';

const renderComponent = jest.fn(() => <View testID="modal-content" />);

describe('useModal hook', () => {
  it('should initialize modal context and return open and close functions', () => {
    const { result } = renderHook(() => useModal(renderComponent), {
      wrapper: ModalProvider,
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        isOpen: false,
        component: null,
        showClose: true,
        open: expect.any(Function),
        close: expect.any(Function),
      })
    );
  });

  it('should open the modal dialog with the provided component', () => {
    const { result } = renderHook(() => useModal(renderComponent), {
      wrapper: ModalProvider,
    });

    act(() => {
      result.current.open(<View testID="custom-modal-content">Custom modal content</View>);
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        isOpen: true,
        component: <View testID="custom-modal-content">Custom modal content</View>,
        showClose: true,
      })
    );
  });

  it('should close the modal dialog', () => {
    const { result } = renderHook(() => useModal(renderComponent), {
      wrapper: ModalProvider,
    });

    act(() => {
      result.current.open();
      result.current.close();
    });

    expect(result.current).toEqual(
      expect.objectContaining({
        isOpen: false,
        component: null,
        showClose: true,
      })
    );
  });

  it('should render the modal when open is called', () => {
    const { result } = renderHook(() => useModal(renderComponent), {
      wrapper: ModalProvider,
    });

    act(() => {
      result.current.open();
    });

    const modalContent = result.current.component;

    expect(modalContent).toEqual(<View testID="modal-content" />);
  });

  it('should not render the modal when it is closed', () => {
    const { result } = renderHook(() => useModal(renderComponent), {
      wrapper: ModalProvider,
    });

    act(() => {
      result.current.open();
      result.current.close();
    });

    expect(result.current.component).toBeNull();
  });
});
