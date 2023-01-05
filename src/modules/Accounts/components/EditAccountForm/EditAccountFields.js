import React from 'react';
import { useController } from 'react-hook-form';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useAccounts } from '../../hooks/useAccounts';

import getEditAccountFormStyles from './styles';

export default function EditAccountFields({ account, form, nextStep, style }) {
  const { updateAccount } = useAccounts();

  const { styles } = useTheme({ styles: getEditAccountFormStyles() });

  const { field: nameField } = useController({
    name: 'name',
    control: form.control,
  });

  const handleSubmit = form.handleSubmit((values) => {
    updateAccount(account.metadata.address, values);

    nextStep();
  });

  return (
    <>
      <View style={[styles.body]}>
        <Input
          label={'Account name'}
          value={nameField.value}
          placeholder="Enter a name"
          onChange={nameField.onChange}
          innerStyles={{
            containerStyle: styles.inputContainer,
          }}
        />
      </View>

      <PrimaryButton onClick={handleSubmit} style={[styles.submitButton, style?.submitButton]}>
        Done
      </PrimaryButton>
    </>
  );
}
