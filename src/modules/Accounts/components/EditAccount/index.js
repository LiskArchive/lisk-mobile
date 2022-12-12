import React from 'react';
import { View } from 'react-native';
import { useForm, useController } from 'react-hook-form';

import { useTheme } from 'hooks/useTheme';
import { H2 } from 'components/shared/toolBox/typography';
import Input from 'components/shared/toolBox/input';
import { Button, PrimaryButton } from 'components/shared/toolBox/button';

import getEditAccountStyles from './styles';

export default function EditAccount({ account, onReset, style }) {
  const form = useForm({
    defaultValues: {
      name: account.metadata.name,
    },
  });

  const { field: usernameField } = useController({
    name: 'name',
    control: form.control,
  });

  const { styles } = useTheme({ styles: getEditAccountStyles() });

  const handleSubmit = form.handleSubmit(async (values) => {
    console.log({ values });
  });

  return (
    <View style={[styles.container]}>
      <H2 style={[styles.title, styles.theme.title, style?.title]}>Edit account name</H2>

      <Input
        label={'Account name'}
        value={usernameField.value}
        placeholder="Input wallet address or choose a username"
        onChange={usernameField.onChange}
        innerStyles={{
          containerStyle: styles.inputContainer,
        }}
      />

      <View style={[style?.footer]}>
        <PrimaryButton onPress={handleSubmit} style={[styles.submitButton]}>
          Done
        </PrimaryButton>

        <Button onPress={onReset}>Back</Button>
      </View>
    </View>
  );
}
