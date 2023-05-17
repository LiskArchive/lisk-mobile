/* eslint-disable max-statements */
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useForm, useController } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import i18next from 'i18next';

import DropDownHolder from 'utilities/alert';
import { passwordValidationRegex } from 'modules/Auth/validators';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useEncryptAccount } from 'modules/Accounts/hooks/useEncryptAccount';
import { settingsUpdated } from 'modules/Settings/store/actions';
import { storeAccountPasswordInKeyChain } from '../utils/recoveryPhrase';

const validationSchema = yup
  .object()
  .shape({
    password: yup
      .string()
      .required('auth.form.errors.noEmptyPasswordError')
      .matches(passwordValidationRegex, 'auth.form.errors.passwordRequirementsError'),
    confirmPassword: yup
      .string()
      .required('auth.form.errors.noEmptyConfirmPasswordError')
      .matches(passwordValidationRegex, 'auth.form.errors.passwordRequirementsError')
      .oneOf([yup.ref('password'), null], 'auth.form.errors.passwordsDontMatchError'),
    accountName: yup.string().nullable().notRequired(),
  })
  .required();

/**
 * Provides a stateful form to handle users passwords setup process.
 * @param {String} recoveryPhrase - Generated recoveryPhrase to consider on the submit.
 * @param {String} derivationPath - optional derivation path to be used to generate address
 * @returns - The form fields, error state, submit callback and other handlers.
 * Also, the encrypt process state (isLoading, isError, isSuccess, among others).
 */
export function usePasswordSetupForm(recoveryPhrase, derivationPath) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState();
  const [isError, setIsError] = useState();
  const [error, setError] = useState();
  const [encryptedAccount, setEncryptedAccount] = useState();

  const { setAccount } = useAccounts();
  const [, setCurrentAccount] = useCurrentAccount();
  const { encryptAccount } = useEncryptAccount();

  const dispatch = useDispatch();

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
      isBiometricsEnabled: false,
    },
    resolver: yupResolver(validationSchema),
    mode: 'onTouched',
  });

  const handleSubmit = baseHandleSubmit(async (values) => {
    try {
      resetState();

      setIsLoading(true);

      const data = await encryptAccount({
        recoveryPhrase,
        password: values.password,
        name: values.accountName,
        derivationPath,
      });

      const address = data?.metadata.address;

      if (values.isBiometricsEnabled) {
        await storeAccountPasswordInKeyChain(address, values.password);
        dispatch(settingsUpdated({ biometricsEnabled: true }));
      }

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

      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.encryptRecoveryPhraseError'));
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

  const { field: isBiometricsEnabled } = useController({
    name: 'isBiometricsEnabled',
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
      isBiometricsEnabled,
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
