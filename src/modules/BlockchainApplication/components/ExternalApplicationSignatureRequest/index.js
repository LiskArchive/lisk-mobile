/* eslint-disable max-statements */
import React, { useContext, useMemo, useState } from 'react';
import { View } from 'react-native';
import i18next from 'i18next';

import { extractAddressFromPublicKey } from 'modules/Auth/utils/accountKeys';
import { useCreateTransaction } from 'modules/Transactions/hooks/useCreateTransaction';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { decryptAccount } from 'modules/Auth/utils/decryptAccount';
import { usePasswordForm } from 'modules/Auth/hooks/usePasswordForm';
import { useTheme } from 'contexts/ThemeContext';
import DataRenderer from 'components/shared/DataRenderer';
import { H2, P } from 'components/shared/toolBox/typography';
import DropDownHolder from 'utilities/alert';
import CircleCrossedSvg from 'assets/svgs/CircleCrossedSvg';
import WalletConnectContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS, STATUS } from '../../../../../libs/wcm/constants/lifeCycle';
import { useSession } from '../../../../../libs/wcm/hooks/useSession';

import ExternalAppSignatureRequestSummary from './ExternalAppSignatureRequestSummary';
import ExternalAppSignatureRequestNotification from './ExternalAppSignatureRequestNotification';
import ExternalAppSignatureRequestSignTransaction from './ExternalAppSignatureRequestSignTransaction';
import { validateConnectionSchema } from '../../../../../libs/wcm/utils/eventValidators';

import getStyles from './styles';

export default function ExternalApplicationSignatureRequest({ onClose, onCancel }) {
  const [status, setStatus] = useState({});
  const [activeStep, setActiveStep] = useState('notification');
  // const [isEventSchemaValid, setIsEventSchemaValid] = useState()

  const [passwordForm, passwordFormController] = usePasswordForm();
  const [currentAccount] = useCurrentAccount();
  const { respond, sessionRequest } = useSession();
  const { events } = useContext(WalletConnectContext);

  const { styles } = useTheme({ styles: getStyles });

  const event = events.find((e) => e.name === EVENTS.SESSION_REQUEST);

  let isEventSchemaValid;
  let invalidEventSchemaError;

  try {
    isEventSchemaValid = validateConnectionSchema(event);
  } catch (error) {
    invalidEventSchemaError = error;
  }

  const createTransactionOptions = useMemo(
    () => ({
      encodedTransaction: event.meta.params.request.params.payload,
    }),
    [event.meta.params.request.params.payload]
  );

  const transaction = useCreateTransaction(createTransactionOptions);

  const senderAccountAddress = extractAddressFromPublicKey(sessionRequest.peer.publicKey);

  const senderApplicationChainID = event.meta.params.chainId.replace('lisk:', '');

  const handleRespond = async (payload) => {
    setStatus({ ...sessionRequest, isLoading: true });

    const response = await respond({ payload });

    if (response.status === STATUS.FAILURE) {
      setStatus({ ...response, error: new Error(response.message) });
    } else if (response.status === STATUS.SUCCESS) {
      setStatus({ ...response, isSuccess: true });
    }
  };

  const handleSubmit = passwordForm.handleSubmit(async (values) => {
    let privateKey;

    try {
      const decryptedAccount = await decryptAccount(currentAccount.crypto, values.password);

      privateKey = decryptedAccount.privateKey;
    } catch (error) {
      DropDownHolder.error(i18next.t('Error'), i18next.t('auth.setup.decryptRecoveryPhraseError'));
    }

    if (privateKey) {
      try {
        const signedTransaction = await transaction.data.sign(privateKey);

        const encodedTransaction = transaction.data.encode(signedTransaction).toString('hex');

        if (!encodedTransaction)
          throw new Error(
            i18next.t(
              'application.externalApplicationSignatureRequest.noEncodedTransactionErrorText'
            )
          );

        handleRespond(encodedTransaction);
      } catch (error) {
        DropDownHolder.error(
          i18next.t('Error'),
          i18next.t('application.externalApplicationSignatureRequest.errorOnSignTransactionText')
        );
      }
    }
  });

  const renderStep = (_transaction) => {
    switch (activeStep) {
      case 'notification':
        return (
          <ExternalAppSignatureRequestNotification
            session={sessionRequest}
            senderApplicationChainID={senderApplicationChainID}
            senderAccountAddress={senderAccountAddress}
            onCancel={onCancel}
            onSubmit={() => setActiveStep('summary')}
          />
        );

      case 'summary':
        return (
          <ExternalAppSignatureRequestSummary
            session={sessionRequest}
            transaction={_transaction.transaction}
            senderApplicationChainID={senderApplicationChainID}
            onCancel={() => setActiveStep('notification')}
            onSubmit={() => setActiveStep('sign')}
          />
        );

      case 'sign':
        return (
          <ExternalAppSignatureRequestSignTransaction
            session={sessionRequest}
            transaction={_transaction}
            onSubmit={handleSubmit}
            onClose={onClose}
            userPassword={passwordFormController.field.value}
            onUserPasswordChange={passwordFormController.field.onChange}
            isValidationError={Object.keys(passwordForm.formState.errors).length > 0}
            isSuccess={status.isSuccess}
            isLoading={status.isLoading}
            error={status.error}
          />
        );

      default:
        return;
    }
  };

  return (
    <DataRenderer
      data={transaction.data}
      isLoading={transaction.isLoading}
      error={transaction.error || !isEventSchemaValid}
      renderData={renderStep}
      renderError={() => (
        <View>
          <View style={styles.imageContainer}>
            <CircleCrossedSvg height={56} width={56} />
          </View>

          <H2 style={[styles.title, styles.theme.title]}>
            {i18next.t(
              'application.externalApplicationSignatureRequest.sign.invalidConnectionTitle'
            )}
          </H2>

          <P style={[styles.description, styles.theme.text]}>
            {invalidEventSchemaError &&
              i18next.t(
                'application.externalApplicationSignatureRequest.sign.invalidConnectionDescription',
                { appName: sessionRequest.peer.metadata.name }
              )}
          </P>
        </View>
      )}
    />
  );
}
