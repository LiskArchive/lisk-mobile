/* eslint-disable max-statements */
import React from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';

import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { H3, P } from 'components/shared/toolBox/typography';
import { Button, PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import UrlSvg from 'assets/svgs/UrlSvg';
import { stringShortener } from 'utilities/helpers';
import Avatar from 'components/shared/avatar';

import getStyles from './styles';

export default function ExternalAppSignatureRequestNotification({
  session,
  senderApplicationChainID,
  senderAccountAddress,
  onCancel,
  onSubmit,
}) {
  const { accounts } = useAccounts();

  const senderAccount = accounts.find(
    (account) => account.metadata.address === senderAccountAddress
  );

  const { styles } = useTheme({ styles: getStyles });

  return (
    <View style={styles.container}>
      <View>
        <H3 style={[styles.title, styles.theme.title]}>Signature request</H3>

        <View style={styles.imageContainer}>
          <Image
            source={{ uri: session.peer.metadata.icons[0] }}
            style={styles.applicationLogoImage}
          />
        </View>

        <H3 style={[styles.applicationTitle, styles.theme.text]}>{session.peer.metadata.name}</H3>

        <View style={styles.urlContainer}>
          <UrlSvg />
          <P style={styles.url}>{session.peer.metadata.url}</P>
        </View>

        <View style={styles.applicationChainIDContainer}>
          <P style={[styles.chainIDLabel, styles.theme.chainIDLabel]}>
            {i18next.t('application.externalApplicationSignatureRequest.notification.chainIDLabel')}
            :
          </P>

          <P style={[styles.description, styles.theme.description]}>{senderApplicationChainID}</P>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <P style={[styles.label, styles.theme.label]}>
        {i18next.t('application.externalApplicationSignatureRequest.notification.descriptionLabel')}
      </P>

      <P style={[styles.description, styles.theme.description]}>
        {i18next.t('application.externalApplicationSignatureRequest.notification.description')}
      </P>

      <View style={styles.horizontalLine} />

      <P style={[styles.label, styles.theme.label]}>
        {i18next.t('application.externalApplicationSignatureRequest.notification.accountLabel')}
      </P>

      <View style={[styles.itemContainer]}>
        <Avatar address={senderAccountAddress} size={24} />

        <View style={[styles.itemBody]}>
          {senderAccount?.metadata.name && (
            <P style={[styles.itemTitle, styles.theme.itemTitle]}>{senderAccount.metadata.name}</P>
          )}

          <P style={[styles.itemSubtitle, styles.theme.itemSubtitle]}>
            {stringShortener(senderAccountAddress, 7, 4)}
          </P>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={[styles.footer]}>
        <Button style={[styles.buttonLeft]} onPress={onCancel}>
          {i18next.t('commons.buttons.reject')}
        </Button>

        <PrimaryButton style={[styles.buttonRight]} onPress={onSubmit}>
          {i18next.t('commons.buttons.continue')}
        </PrimaryButton>
      </View>
    </View>
  );
}
