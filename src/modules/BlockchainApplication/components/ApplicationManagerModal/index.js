import React from 'react';
import BottomModal from 'components/shared/BottomModal';
import Stepper from 'components/shared/Stepper';

import ManageApplication from '../ManageApplication';
import DeleteApplication from '../DeleteApplication';
import DeleteApplicationSuccess from '../DeleteApplicationSuccess';

export default function ApplicationManagerModal({ show, setShow }) {
  const closeModal = () => setShow(false);

  return (
    <BottomModal show={show} toggleShow={setShow}>
      <Stepper currentIndex={0} finalCallback={closeModal}>
        <ManageApplication closeModal={closeModal} />
        <DeleteApplication />
        <DeleteApplicationSuccess />
      </Stepper>
    </BottomModal>
  );
}
