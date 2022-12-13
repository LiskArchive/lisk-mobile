import React from 'react';
import { View } from 'react-native';
import { useForm, useController } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts/useAccounts';
import { H2 } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { PrimaryButton } from 'components/shared/toolBox/button';

import getEditAccountFormStyles from './styles';

export default function EditAccountForm({ account, mode, onReset, style }) {
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

    if (onReset) {
      onReset();
    }
  });

  return (
    <View style={[styles.container, style?.container]}>
      <View style={[styles.body]}>
        {mode === 'modal' && (
          <H2 style={[styles.title, styles.theme.title, style?.title]}>Edit account name</H2>
        )}

        <Input
          label={'Account name'}
          value={name.value}
          placeholder="Enter a name"
          onChange={name.onChange}
          innerStyles={{
            containerStyle: styles.inputContainer,
          }}
        />
      </View>

      <PrimaryButton onClick={handleSubmit} style={[styles.submitButton, style?.submitButton]}>
        Done
      </PrimaryButton>
    </View>
  );
}
