import React from 'react';
import { useTheme } from 'hooks/useTheme';
import BottomModal from 'components/shared/BottomModal';
import Stepper from 'components/shared/Stepper';

import ManageApplication from '../ManageApplication';
import getApplicationModalStyles from './styles';
import DeleteApplication from '../DeleteApplication';
import DeleteApplicationSuccess from '../DeleteApplicationSuccess';

export default function ApplicationManagerModal({ show, setShow }) {
  const { styles } = useTheme({ styles: getApplicationModalStyles() });

  const closeModal = () => setShow(false);

  return (
    <BottomModal show={show} toggleShow={setShow} style={{ container: styles.container }}>
      <Stepper
        currentIndex={0}
        finalCallback={closeModal}
        styles={{ container: { width: '100%' } }}
      >
        <ManageApplication closeModal={closeModal} />
        <DeleteApplication />
        <DeleteApplicationSuccess />
      </Stepper>
    </BottomModal>
  );
}
