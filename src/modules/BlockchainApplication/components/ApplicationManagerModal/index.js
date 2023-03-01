import React from 'react';
import Stepper from 'components/shared/Stepper';
import { useModal } from 'contexts/useModal';

import ManageApplication from '../ManageApplication';
import DeleteApplication from '../DeleteApplication';
import DeleteApplicationSuccess from '../DeleteApplicationSuccess';

export default function ApplicationManagerModal({ navigation }) {
  const { toggle } = useModal();
  const closeModal = () => toggle(false);

  return (
    <Stepper currentIndex={0} finalCallback={closeModal}>
      <ManageApplication closeModal={closeModal} navigation={navigation} />
      <DeleteApplication />
      <DeleteApplicationSuccess />
    </Stepper>
  );
}
