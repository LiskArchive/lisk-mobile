import React from 'react';
import { useTheme } from 'hooks/useTheme';
import BottomModal from 'components/shared/BottomModal';

import ManageApplication from '../ManageApplication';
import getApplicationModalStyles from './styles';

export default function ApplicationManagerModal({ show, setShow }) {
  const { styles } = useTheme({ styles: getApplicationModalStyles() });

  return (
    <BottomModal
      show={show}
      toggleShow={setShow}
      style={{ container: styles.container }}
    >
      <ManageApplication
        closeModal={() => setShow(false)}
      />
    </BottomModal>
  );
}
