/* eslint-disable max-statements */
import React, { useContext, useMemo } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import UrlSvg from 'assets/svgs/UrlSvg';
import getConnectionStyles from './styles';
import useWalletConnectSession from '../../../../../libs/wcm/hooks/useSession';
import WalletConnectContext from '../../../../../libs/wcm/context/connectionContext';
import { EVENTS } from '../../../../../libs/wcm/constants/lifeCycle';

const ApproveConnection = ({ onFinish, sharedData: { selectedAccounts } }) => {
  const { approve, reject } = useWalletConnectSession();
  const { events } = useContext(WalletConnectContext);

  const { styles } = useTheme({ styles: getConnectionStyles });

  const connectionEvent =
    events.length &&
    events[events.length - 1].name === EVENTS.SESSION_PROPOSAL &&
    events[events.length - 1];

  const connectHandler = async () => {
    await approve(selectedAccounts);
    onFinish();
  };

  const rejectHandler = async () => {
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

  const chainID = connectionEvent.meta.params.requiredNamespaces.lisk.chains[0].replace(
    'lisk:',
    ''
  );
  const iconUri = connectionEvent.meta.params.proposer.metadata.icons[0];
  const name = connectionEvent.meta.params.proposer.metadata.name;
  const url = connectionEvent.meta.params.proposer.metadata.url;
  const pairingTopic = connectionEvent.meta.params.pairingTopic;

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: iconUri }} style={styles.image} />
        </View>

        <H3 style={[styles.title, styles.theme.title]}>{name}</H3>

        <View style={styles.urlContainer}>
          <UrlSvg />
          <P style={styles.url}>{url}</P>
        </View>

        <View style={styles.urlContainer}>
          <P style={styles.label}>
            {i18next.t('application.explore.externalApplicationList.chainIDLabel')}:
          </P>
          <P style={[styles.theme.description]}>{chainID}</P>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.container}>
        <P style={styles.label}>
          {i18next.t('application.explore.externalApplicationList.connectionID')}:
        </P>

        <P style={[styles.theme.description]}>{pairingTopic}</P>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.container}>
        <P style={styles.label}>
          {i18next.t('application.explore.externalApplicationList.sitePermissions')}:
        </P>

        <P style={[styles.subTitle, styles.theme.subTitle]}>
          {i18next.t('application.explore.externalApplicationList.methods')}
        </P>

        {requiredMethods.map((method) => (
          <P key={method} style={[styles.value, styles.permissions]}>
            {method}
          </P>
        ))}
      </View>

      <View style={styles.horizontalLine} />

      <View style={[styles.footer, styles.buttonContainer]}>
        <Button style={[styles.button]} onPress={rejectHandler}>
          Reject
        </Button>

        <PrimaryButton style={styles.button} onPress={connectHandler}>
          Approve
        </PrimaryButton>
      </View>
    </>
  );
};

export default ApproveConnection;
