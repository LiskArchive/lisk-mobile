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
import { useEncryptAccount } from 'modules/Accounts/hooks/useEncryptAccount';

const validationSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required(i18next.t('auth.form.errors.noEmptyPasswordError'))
      .matches(passwordValidationRegex, i18next.t('auth.form.errors.passwordRequirementsError')),
    confirmPassword: yup
      .string()
      .required(i18next.t('auth.form.errors.noEmptyConfirmPasswordError'))
      .matches(passwordValidationRegex, i18next.t('auth.form.errors.passwordRequirementsError'))
      .oneOf([yup.ref('password'), null], i18next.t('auth.form.errors.passwordsDontMatchError')),
  })
  .required();

/**
 * Provides a stateful form to handle users passwords setup process.
 * @param {String} passphrase - Generated passphrase to consider on the submit.
 * @param {String} derivationPath - optional derivation path to be used to generate address
 * @returns - The form fields, error state, submit callback and other handlers.
 * Also, the encrypt process state (isLoading, isError, isSuccess, among others).
 */
export function usePasswordSetupForm(passphrase, derivationPath) {
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
    mode: 'all',
  });

  const handleSubmit = baseHandleSubmit(async (values) => {
    try {
      resetState();

      setIsLoading(true);

      const data = await encryptAccount({
        recoveryPhrase: passphrase,
        password: values.password,
        name: values.accountName,
        derivationPath,
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

      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.encryptPassphraseError'));
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
