/* eslint-disable max-statements */
import React, { useState, useContext } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';

import DataRenderer from 'components/shared/DataRenderer';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import Checkbox from 'components/shared/Checkbox';
import { useTheme } from 'contexts/ThemeContext';
import { stringShortener } from 'utilities/helpers';
import UrlSvg from 'assets/svgs/UrlSvg';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import Avatar from 'components/shared/avatar';
import { useApplicationsMetaQuery } from '../../api/useApplicationsMetaQuery';
import WalletConnectContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';

import getConnectionStyles from './styles';

export default function InitiateConnection({ nextStep, onFinish }) {
  const [selectedAccounts, setSelectedAccounts] = useState([]);
  const [chains, setChains] = useState([]);

  const { accounts } = useAccounts();
  const { events } = useContext(WalletConnectContext);

  const { styles } = useTheme({ styles: getConnectionStyles });

  const connectionEvent =
    events.length &&
    events[events.length - 1].name === EVENTS.SESSION_PROPOSAL &&
    events[events.length - 1];

  const connectingChainIDs = connectionEvent?.meta.params.requiredNamespaces.lisk.chains.map(
    (chain) => chain.replace('lisk:', '')
  );

  const selectedAccountsPubKeys = selectedAccounts.map(
    (selectedAccount) => selectedAccount.metadata.pubkey
  );

  const {
    data: connectingAppsMetadata,
    isLoading: isLoadingConnectingAppsMetadata,
    isError: isErrorConnectingAppsMetadata,
  } = useApplicationsMetaQuery({
    options: {
      enabled: !!connectingChainIDs,
      onSuccess: ({ data }) => {
        const chainsData = connectingChainIDs.map((chainID) => ({
          ...(data.find((app) => app.chainID === chainID) || []),
          chainID,
        }));

        setChains(chainsData);
      },
    },
    config: {
      params: { chainID: connectingChainIDs?.join(','), network: undefined, limit: undefined },
    },
  });

  const handleSelectAccount = (account) => {
    const isExist = selectedAccountsPubKeys.includes(account.metadata.pubkey);

    if (isExist) {
      setSelectedAccounts(
        selectedAccounts.filter(
          (selectedAccount) => selectedAccount.metadata.pubkey !== account.metadata.pubkey
        )
      );
    } else {
      setSelectedAccounts([...selectedAccounts, account]);
    }
  };

  const handleSelectAllAccounts = () => {
    if (selectedAccounts.length === accounts.length) {
      return setSelectedAccounts([]);
    }

    return setSelectedAccounts(accounts);
  };

  const handleSubmit = () => nextStep({ accounts: selectedAccounts, chains });

  if (!connectionEvent) {
    return null;
  }

  const isAllAccountsSelected = selectedAccounts.length === accounts.length;

  const iconUri = connectionEvent.meta.params.proposer.metadata.icons[0];
  const name = connectionEvent.meta.params.proposer.metadata.name;
  const url = connectionEvent.meta.params.proposer.metadata.url;

  return (
    <View style={[styles.container]}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: iconUri }} style={styles.image} />
      </View>

      <H3 style={[styles.title, styles.theme.title]}>{name}</H3>

      <View style={styles.urlContainer}>
        <UrlSvg />
        <P style={styles.url}>{url}</P>
      </View>

      <View style={styles.horizontalLine} />

      <P style={[styles.description, styles.theme.description]}>
        {i18next.t('application.explore.externalApplicationList.connectionDescription')}
      </P>

      <View style={styles.horizontalLine} />

      <P style={[styles.description, styles.descriptionLabel]}>
        {i18next.t('application.explore.externalApplicationList.chainsTitle')}
      </P>

      <DataRenderer
        data={connectingAppsMetadata?.data}
        isLoading={isLoadingConnectingAppsMetadata}
        error={isErrorConnectingAppsMetadata}
        renderData={() => (
          <View style={[styles.itemsContainer]}>
            {chains.length > 0 &&
              chains.map((chain, index) => (
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
        )}
      />

      <View style={styles.horizontalLine} />

      <P style={[styles.description, styles.descriptionLabel]}>
        {i18next.t('application.explore.externalApplicationList.accountsTitle')}
      </P>

      <Checkbox onPress={handleSelectAllAccounts} selected={isAllAccountsSelected}>
        <P style={[styles.label, styles.theme.label]}>{i18next.t('commons.buttons.selectAll')}</P>
      </Checkbox>

      <View style={[styles.itemsContainer]}>
        {accounts.map((account) => (
          <Checkbox
            key={account.metadata.address}
            selected={selectedAccountsPubKeys.includes(account.metadata.pubkey)}
            onPress={() => handleSelectAccount(account)}
            style={{ children: styles.itemContainer }}
          >
            <Avatar address={account.metadata.address} size={24} />

            <View style={[styles.itemBody]}>
              {account.metadata.name && (
                <P style={[styles.itemTitle, styles.theme.itemTitle]}>{account.metadata.name}</P>
              )}

              <P style={[styles.itemSubtitle, styles.theme.itemSubtitle]}>
                {stringShortener(account.metadata.address, 7, 4)}
              </P>
            </View>
          </Checkbox>
        ))}
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.footer}>
        <Button onPress={onFinish} style={[styles.buttonLeft]}>
          {i18next.t('commons.buttons.cancel')}
        </Button>

        <PrimaryButton
          onPress={handleSubmit}
          style={[styles.buttonRight]}
          disabled={!selectedAccounts.length}
        >
          {i18next.t('commons.buttons.continue')}
        </PrimaryButton>
      </View>
    </View>
  );
}
