/* eslint-disable max-statements */
import React from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';

import { H3, P } from 'components/shared/toolBox/typography';
import { Button, PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import UrlSvg from 'assets/svgs/UrlSvg';
import { stringShortener } from 'utilities/helpers';
import Avatar from 'components/shared/avatar';

import getExternalApplicationSignatureRequestStyles from './styles';

export default function ExternalAppSignatureRequestNotification({
  session,
  recipientApplicationChainID,
  senderAccountAddress,
  onCancel,
  onSubmit,
}) {
  const { styles } = useTheme({ styles: getExternalApplicationSignatureRequestStyles });

  return (
    <>
      <View>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: session.peer.metadata.icons[0] }}
            style={styles.applicationLogoImage}
          />
        </View>

        <H3 style={styles.applicationTitle}>{session.peer.metadata.name}</H3>

        <View style={styles.applicationUrlContainer}>
          <UrlSvg />
          <P style={styles.applicationUrl}>{session.peer.metadata.url}</P>
        </View>

        <View style={styles.applicationChainIDContainer}>
          <P style={styles.label}>Chain ID:</P>

          <P style={styles.description}>{stringShortener(recipientApplicationChainID, 20, 4)}</P>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View>
        <P style={[styles.labelContainer, styles.label]}>
          {i18next.t('application.signing.information')}
        </P>

        <P style={styles.description}>
          {i18next.t('application.signing.description', {
            appName: session.peer.metadata.name,
          })}
        </P>
      </View>

      <View style={styles.horizontalLine} />

      <P style={[styles.labelContainer, styles.label]}>Selected account</P>

      <View style={styles.accountItem}>
        <Avatar address={senderAccountAddress} size={35} />

        <View style={styles.accountContent}>
          <P style={styles.address}>{stringShortener(senderAccountAddress, 7, 4)}</P>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={[styles.buttonContainer]}>
        <Button style={[styles.button]} onPress={onCancel}>
          {i18next.t('commons.buttons.cancel')}
        </Button>

        <PrimaryButton style={[styles.button]} onPress={onSubmit}>
          {i18next.t('commons.buttons.continue')}
        </PrimaryButton>
      </View>
    </>
  );
}
