import { useForm, useController } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { passwordValidationRegex } from 'modules/Auth/validators';

const validationSchema = yup
  .object()
  .shape({
    password: yup.string().required('Password must have a value.').matches(passwordValidationRegex),
  })
  .required();

export function usePasswordForm(props = {}) {
  const form = useForm({
    defaultValues: {
      password: '',
    },
    resolver: yupResolver(validationSchema),
    ...props,
  });

  const controller = useController({
    name: 'password',
    control: form.control,
  });

  return [form, controller];
}
