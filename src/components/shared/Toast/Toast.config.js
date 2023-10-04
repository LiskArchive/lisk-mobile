import React from 'react-native';

import { SuccessToast, ErrorToast } from './Toasts';

export const toastConfig = {
  success: (props) => <SuccessToast {...props} />,
  error: (props) => <ErrorToast {...props} />,
};
