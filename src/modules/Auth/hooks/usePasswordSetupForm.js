/* eslint-disable max-statements */
import { useCallback, useState } from 'react';
import { useForm, useController } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';

import DropDownHolder from 'utilities/alert';
import { passwordValidationRegex } from 'modules/Auth/validators';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useEncryptAccount } from './useEncryptAccount';

const validationSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('Password must have a value.')
      .matches(passwordValidationRegex, 'Password must match min requirements'),
    confirmPassword: yup
      .string()
      .required('Confirm password must have a value.')
      .matches(passwordValidationRegex, 'Password must match min requirements')
      .oneOf([yup.ref('password'), null], 'Passwords must match'),
  })
  .required();

export function usePasswordSetupForm(passphrase) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [error, setError] = useState();
  const [encryptedAccount, setEncryptedAccount] = useState();

  const { setAccount } = useAccounts();
  const [, setCurrentAccount] = useCurrentAccount();
  const { encryptAccount } = useEncryptAccount();

  const resetState = useCallback(() => {
    if (isSuccess !== undefined) {
      setIsSuccess();
    }
    if (isError !== undefined) {
      setIsError();
    }
    if (error !== undefined) {
      setError();
    }
  }, [error, isError, isSuccess]);

  const { handleSubmit: baseHandleSubmit, ...form } = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
      accountName: '',
      isAgreed: false,
    },
    resolver: yupResolver(validationSchema),
  });

  const handleSubmit = baseHandleSubmit(async (values) => {
    try {
      resetState();

      setIsLoading(true);

      const data = await encryptAccount({
        recoveryPhrase: passphrase,
        password: values.password,
        name: values.accountName,
      });

      setEncryptedAccount(data);
      setAccount(data);
      setCurrentAccount(data);

      setIsLoading(false);
      setIsSuccess(true);
    } catch (_error) {
      setIsLoading(false);
      setIsSuccess(false);
      setError(_error);
      setIsError(true);

      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.decryptPassphraseError'));
    }
  });

  const { field: passwordField } = useController({
    name: 'password',
    control: form.control,
  });

  const { field: confirmPasswordField } = useController({
    name: 'confirmPassword',
    control: form.control,
  });

  const { field: accountNameField } = useController({
    name: 'accountName',
    control: form.control,
  });

  const { field: isAgreedField } = useController({
    name: 'isAgreed',
    control: form.control,
  });

  return [
    {
      ...form,
      handleSubmit,
      passwordField,
      confirmPasswordField,
      accountNameField,
      isAgreedField,
    },
    {
      encryptedAccount,
      isLoading,
      isSuccess,
      isError,
      error,
    },
  ];
}
