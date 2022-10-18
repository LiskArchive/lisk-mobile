/* eslint-disable max-statements */
import React, { useContext, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';

import { extractAddressFromPublicKey } from 'modules/Wallet/utils/account';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import { useCurrentAccount } from 'modules/Accounts/hooks/useAccounts/useCurrentAccount';
import TransactionSummary from 'modules/Transactions/components/TransactionSummary';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import UrlSvg from 'assets/svgs/UrlSvg';
import { stringShortener } from 'utilities/helpers';
import Avatar from 'components/shared/avatar';
// import { rejectLiskRequest } from '../../../../../libs/wcm/utils/requestHandlers';
import ConnectionContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';
import { useCurrentBlockchainApplication } from '../../hooks/useCurrentBlockchainApplication';

import getExternalApplicationSignatureRequestStyles from './styles';

export default function ExternalApplicationSignatureRequest({ session, onFinish }) {
  const [activeStep, setActiveStep] = useState('notification');
  const [
    ,
    // request
    setRequest,
  ] = useState(null);

  const [currentApplication] = useCurrentBlockchainApplication();
  const [currentAccount] = useCurrentAccount();

  const { events } = useContext(ConnectionContext);

  const {
    data: supportedTokensData,
    // isLoading: isLoadingSupportedTokens,
    // isError: isSupportedTokensError,
  } = useApplicationSupportedTokensQuery(currentApplication);

  // console.log({ session });

  console.log({ supportedTokensData });

  const { styles } = useTheme({ styles: getExternalApplicationSignatureRequestStyles });

  useEffect(() => {
    const event = events.find((e) => e.name === EVENTS.SESSION_REQUEST);
    if (event) {
      setRequest(event.meta);
    }
  }, [events]);

  const connectHandler = async () => {
    onFinish();
  };

  // const rejectHandler = () => {
  //   rejectLiskRequest(request);
  //   onFinish();
  // };

  const selectedAccountAddress = extractAddressFromPublicKey(session.peer.publicKey);

  function renderStep() {
    switch (activeStep) {
      case 'notification':
        return (
          <>
            <View style={styles.container}>
              <View style={styles.imageContainer}>
                <Image source={{ uri: session.peer.metadata.icons[0] }} style={styles.image} />
              </View>
              <H3 style={styles.title}>{session.peer.metadata.name}</H3>
              <View style={styles.urlContainer}>
                <UrlSvg />
                <P style={styles.url}>{session.peer.metadata.url}</P>
              </View>
            </View>
            <View style={styles.horizontalLine} />

            <View style={styles.container}>
              <P style={styles.label}>{i18next.t('application.signing.information')}:</P>
              <P style={styles.description}>
                {i18next.t('application.signing.description', {
                  appName: session.peer.metadata.name,
                })}
              </P>
            </View>
            <View style={styles.horizontalLine} />
            <View style={styles.container}>
              <View style={styles.accountItem}>
                <Avatar address={selectedAccountAddress} size={35} />
                <View style={styles.accountContent}>
                  <P style={styles.address}>{stringShortener(selectedAccountAddress, 7, 4)}</P>
                </View>
              </View>
            </View>
            <View style={styles.horizontalLine} />
            <View style={[styles.container, styles.buttonContainer]}>
              <PrimaryButton
                style={[styles.button, styles.outlineButton]}
                onPress={() => setActiveStep('summary')}
              >
                <P style={[styles.buttonText, styles.outlineButtonText]}>
                  {i18next.t('commons.buttons.cancel')}
                </P>
              </PrimaryButton>
              <PrimaryButton style={styles.button} onPress={connectHandler}>
                <P style={[styles.buttonText]}>{i18next.t('commons.buttons.continue')}</P>
              </PrimaryButton>
            </View>
          </>
        );

      case 'summary':
        return (
          <TransactionSummary
            recipientApplication={currentApplication}
            senderApplication={{
              chainName: session.peer.metadata.name,
              logo: { png: session.peer.metadata.icons[0] },
              address: selectedAccountAddress,
            }}
            recipientAccount={currentAccount.metadata}
            token={supportedTokensData[0] || {}}
            amount={300}
          />
        );

      default:
        return null;
    }
  }

  if (!session) {
    return null;
  }

  return renderStep();
}
