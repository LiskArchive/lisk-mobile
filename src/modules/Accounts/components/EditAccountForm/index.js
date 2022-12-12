import React from 'react';
import { View } from 'react-native';
import { useForm, useController } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts/useAccounts';
import { H2 } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { Button, PrimaryButton } from 'components/shared/toolBox/button';

import getEditAccountFormStyles from './styles';

export default function EditAccountForm({ account, onReset, style }) {
  const { updateAccount } = useAccounts();

  const form = useForm({
    defaultValues: {
      name: account.metadata.name,
    },
  });

  const { field: name } = useController({
    name: 'name',
    control: form.control,
  });

  const { styles } = useTheme({ styles: getEditAccountFormStyles() });

  const handleSubmit = form.handleSubmit((values) => {
    updateAccount(account.metadata.address, values);
    onReset();
  });

  return (
    <View style={[styles.container]}>
      <H2 style={[styles.title, styles.theme.title, style?.title]}>Edit account name</H2>

      <Input
        label={'Account name'}
        value={name.value}
        placeholder="Input wallet address or choose a username"
        onChange={name.onChange}
        innerStyles={{
          containerStyle: styles.inputContainer,
        }}
      />

      <View style={[style?.footer]}>
        <PrimaryButton onClick={handleSubmit} style={[styles.submitButton]}>
          Done
        </PrimaryButton>

        <Button onPress={onReset}>Back</Button>
      </View>
    </View>
  );
}
