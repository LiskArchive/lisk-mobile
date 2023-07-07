import React, { useEffect } from 'react';
import { useModal } from 'hooks/useModal';
import { useNavigation } from '@react-navigation/native';
import NotFound from './NotFound';

const NotFoundScreen = () => {
  const modal = useModal();

  const navigation = useNavigation();

  const onContinue = () => {
    navigation.navigate('AccountsManagerScreen');
    modal.close();
  };

  useEffect(() => {
    modal.open(<NotFound onContinue={onContinue} />, false);
  }, []);

  return null;
};

export default NotFoundScreen;
