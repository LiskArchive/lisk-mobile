import React from 'react';
import { View } from 'react-native';
import { useForm } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import { H2 } from 'components/shared/toolBox/typography';
import Stepper from 'components/shared/Stepper';

import EditAccountSuccess from './EditAccountSuccess';
import EditAccountFields from './EditAccountFields';
import getEditAccountFormStyles from './styles';

export default function EditAccountForm({ account, mode, onCompleted, style }) {
  const form = useForm({
    defaultValues: {
      name: account.metadata.name,
    },
  });

  const { styles } = useTheme({ styles: getEditAccountFormStyles() });

  return (
    <View style={[styles.container, style?.container]}>
      {mode === 'modal' && (
        <H2 style={[styles.title, styles.theme.title, style?.title]}>Edit account name</H2>
      )}

      <Stepper currentIndex={0}>
        <EditAccountFields account={account} form={form} style={style} />
        <EditAccountSuccess account={account} onCompleted={onCompleted} style={style} />
      </Stepper>
    </View>
  );
}
