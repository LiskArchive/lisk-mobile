/* eslint-disable max-statements */
import React, { useContext, useMemo } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';

import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import UrlSvg from 'assets/svgs/UrlSvg';
import { stringShortener } from 'utilities/helpers';
import Avatar from 'components/shared/avatar';
import { useSession } from '../../../../../libs/wcm/hooks/useSession';
import WalletConnectContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';

import getConnectionStyles from './styles';

export default function ApproveConnection({ onFinish, sharedData: { accounts, chains } }) {
  const { approve, reject } = useSession();
  const { events } = useContext(WalletConnectContext);

  const { styles } = useTheme({ styles: getConnectionStyles });

  const connectionEvent =
    events.length &&
    events[events.length - 1].name === EVENTS.SESSION_PROPOSAL &&
    events[events.length - 1];

  const accountsAddresses = accounts.map((account) => account.metadata.address);

  const handleApprove = async () => {
    await approve(accountsAddresses);
    onFinish();
  };

  const handleReject = async () => {
    await reject();
    onFinish();
  };

  const requiredMethods = useMemo(() => {
    const methods = [];
    Object.values(connectionEvent?.meta?.params?.requiredNamespaces ?? {}).forEach((method) =>
      methods.push(...method.methods)
    );
    return methods;
  }, [connectionEvent?.meta?.params?.requiredNamespaces]);

  if (!connectionEvent) {
    return null;
  }

  const { name, url, icons } = connectionEvent.meta.params.proposer.metadata;
  const pairingTopic = connectionEvent.meta.params.pairingTopic;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: icons[0] }} style={styles.image} />
        </View>

        <H3 style={[styles.title, styles.theme.title]}>{name}</H3>

        <View style={styles.urlContainer}>
          <UrlSvg />
          <P style={styles.url}>{url}</P>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <P style={[styles.label, styles.theme.label]}>
        {i18next.t('application.explore.externalApplicationList.approveConnectionChainsTitle')}
      </P>

      <View style={[styles.itemsContainer]}>
        {chains.map((chain, index) => (
          <View key={index} style={[styles.itemContainer]}>
            <Image style={[styles.itemImage]} source={{ uri: chain.logo?.png }} />

            <View style={[styles.itemBody]}>
              <P style={[styles.itemTitle, styles.theme.itemTitle]}>{chain.chainName}</P>

              <P style={[styles.itemSubtitle, styles.theme.itemSubtitle]}>
                Chain ID: {chain.chainID}
              </P>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.horizontalLine} />

      <P style={[styles.description, styles.descriptionLabel]}>
        {i18next.t('application.explore.externalApplicationList.approveConnectionChainsTitle')}
      </P>

      <View style={[styles.itemsContainer]}>
        {accounts.map((account) => (
          <View key={account.metadata.address} style={[styles.itemContainer]}>
            <Avatar address={account.metadata.address} size={24} />

            <View style={[styles.itemBody]}>
              {account.metadata.name && (
                <P style={[styles.itemTitle, styles.theme.itemTitle]}>{account.metadata.name}</P>
              )}

              <P style={[styles.itemSubtitle, styles.theme.itemSubtitle]}>
                {stringShortener(account.metadata.address, 7, 4)}
              </P>
            </View>
          </View>
        ))}
      </View>

      <View style={styles.horizontalLine} />

      <P style={styles.label}>
        {i18next.t('application.explore.externalApplicationList.connectionID')}:
      </P>

      <P style={[styles.description, styles.theme.description]}>{pairingTopic}</P>

      <View style={styles.horizontalLine} />

      <P style={[styles.description, styles.descriptionLabel]}>
        {i18next.t('application.explore.externalApplicationList.sitePermissions')}:
      </P>

      <P style={[styles.itemTitle, styles.theme.itemTitle, { marginBottom: 4 }]}>
        {i18next.t('application.explore.externalApplicationList.methods')}
      </P>

      {requiredMethods.map((method) => (
        <P key={method} style={[styles.label, styles.theme.label, { marginBottom: 2 }]}>
          {method}
        </P>
      ))}

      <View style={styles.horizontalLine} />

      <View style={[styles.footer]}>
        <Button onPress={handleReject} style={[styles.buttonLeft]}>
          Reject
        </Button>

        <PrimaryButton onPress={handleApprove} style={[styles.buttonRight]}>
          Approve
        </PrimaryButton>
      </View>
    </>
  );
}
