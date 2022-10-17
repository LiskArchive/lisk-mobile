import React, { useContext, useEffect, useState } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';
import { extractAddressFromPublicKey } from 'modules/Wallet/utils/account';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import UrlSvg from 'assets/svgs/UrlSvg';
import { stringShortener } from 'utilities/helpers';
import Avatar from 'components/shared/avatar';
import { rejectLiskRequest } from '../../../../../libs/wcm/utils/requestHandlers';
import ConnectionContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';

import getExternalApplicationSignatureRequestStyles from './styles';

export default function ExternalApplicationSignatureRequest({ session, onFinish }) {
  const [request, setRequest] = useState(null);

  const { events } = useContext(ConnectionContext);

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

  const rejectHandler = () => {
    rejectLiskRequest(request);
    onFinish();
  };

  if (!session) {
    return null;
  }

  const selectedAccountAddress = extractAddressFromPublicKey(session.peer.publicKey);

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
          {i18next.t('application.signing.description', { appName: session.peer.metadata.name })}
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
        <PrimaryButton style={[styles.button, styles.outlineButton]} onPress={rejectHandler}>
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
}
