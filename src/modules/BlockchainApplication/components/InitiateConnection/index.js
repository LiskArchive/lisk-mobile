/* eslint-disable max-statements */
import React, { useState, useMemo } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import Checkbox from 'components/shared/Checkbox';
import { useTheme } from 'hooks/useTheme';
import { stringShortener } from 'utilities/helpers';
import UrlSvg from 'assets/svgs/UrlSvg';
import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import Avatar from 'components/shared/avatar';
import getConnectionStyles from './styles';

const InitiateConnection = ({ event, nextStep }) => {
  const { styles } = useTheme({ styles: getConnectionStyles });
  const { accounts } = useAccounts();
  const [selectedAccounts, setSelectedAccounts] = useState([]);

  const onSelectAccount = (account) => {
    const isExist = selectedAccounts.includes(account.metadata.pubkey);
    if (isExist) {
      setSelectedAccounts(selectedAccounts.filter((pubkey) => pubkey !== account.metadata.pubkey));
    } else {
      setSelectedAccounts([...selectedAccounts, account.metadata.pubkey]);
    }
  };

  const selectAll = useMemo(
    () => selectedAccounts.length === accounts.length,
    [selectedAccounts, accounts]
  );

  const onSelectAll = () => {
    setSelectedAccounts(accounts.map((acc) => acc.metadata.pubkey));
  };

  const onSubmit = () => {
    nextStep({ selectedAccounts });
  };

  if (!event) {
    return null;
  }

  return (
    <View style={styles.content}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.meta.params.proposer.metadata.icons[0] }}
            style={styles.image}
          />
        </View>
        <H3 style={styles.title}>{event.meta.params.proposer.metadata.name}</H3>
        <View style={styles.urlContainer}>
          <UrlSvg />
          <P style={styles.url}>{event.meta.params.proposer.metadata.url}</P>
        </View>
        <View style={styles.urlContainer}>
          <P style={styles.label}>
            {i18next.t('application.explore.externalApplicationList.chainIDLabel')}:
          </P>
          <P>{event.meta.id}</P>
        </View>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.container}>
        <P>{i18next.t('application.explore.externalApplicationList.connectionDescription')}</P>
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.container}>
        <P style={[styles.label, styles.accountsLabel]}>
          {i18next.t('application.explore.externalApplicationList.accountsTitle')}:
        </P>
        <Checkbox onPress={onSelectAll} selected={selectAll}>
          <P>Select All</P>
        </Checkbox>
        {accounts.map((account) => (
          <Checkbox
            key={account.metadata.address}
            selected={selectedAccounts.includes(account.metadata.pubkey)}
            onPress={() => onSelectAccount(account)}
          >
            <View style={styles.accountItem}>
              <Avatar address={account.metadata.address} size={35} />
              <View style={styles.accountContent}>
                {account.metadata.name ? <P>{account.metadata.name}</P> : null}
                <P style={styles.address}>{stringShortener(account.metadata.address, 7, 4)}</P>
              </View>
            </View>
          </Checkbox>
        ))}
      </View>
      <View style={styles.horizontalLine} />
      <View style={styles.container}>
        <View style={styles.buttonContainer}>
          <PrimaryButton style={[styles.button, styles.outlineButton]}>
            <P style={[styles.buttonText, styles.outlineButtonText]}>
              {i18next.t('commons.buttons.cancel')}
            </P>
          </PrimaryButton>
          <PrimaryButton
            style={styles.button}
            onPress={onSubmit}
            disabled={!selectedAccounts.length}
          >
            <P style={[styles.buttonText]}>{i18next.t('commons.buttons.continue')}</P>
          </PrimaryButton>
        </View>
      </View>
    </View>
  );
};

export default InitiateConnection;
