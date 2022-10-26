import React, { useMemo } from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';
import { H3, P } from 'components/shared/toolBox/typography';
import { PrimaryButton, Button } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import UrlSvg from 'assets/svgs/UrlSvg';
import getConnectionStyles from './styles';
import useSession from '../../../../../libs/wcm/hooks/useSession';

const ApproveConnection = ({ event, onFinish, sharedData: { selectedAccounts } }) => {
  const { styles } = useTheme({ styles: getConnectionStyles });
  const { approve, reject } = useSession();

  const connectHandler = async () => {
    await approve(selectedAccounts);
    onFinish();
  };

  const rejectHandler = () => {
    reject();
    onFinish();
  };

  const requiredMethods = useMemo(() => {
    const methods = [];
    Object.values(event?.meta?.params?.requiredNamespaces ?? {}).forEach((method) =>
      methods.push(...method.methods)
    );
    return methods;
  }, [event?.meta?.params?.requiredNamespaces]);

  if (!event) {
    return null;
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: event.meta.params.proposer.metadata.icons[0] }}
            style={styles.image}
          />
        </View>

        <H3 style={[styles.title, styles.theme.title]}>
          {event.meta.params.proposer.metadata.name}
        </H3>

        <View style={styles.urlContainer}>
          <UrlSvg />
          <P style={styles.url}>{event.meta.params.proposer.metadata.url}</P>
        </View>

        <View style={styles.urlContainer}>
          <P style={styles.label}>
            {i18next.t('application.explore.externalApplicationList.chainIDLabel')}:
          </P>
          <P style={[styles.theme.description]}>{event.meta.id}</P>
        </View>
      </View>

      <View style={styles.horizontalLine} />

      <View style={styles.container}>
        <P style={styles.label}>
          {i18next.t('application.explore.externalApplicationList.connectionID')}:
        </P>

        <P style={[styles.theme.description]}>{event.meta.params.pairingTopic}</P>
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

      <View style={[styles.container, styles.buttonContainer]}>
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
