/* eslint-disable max-statements */
import React from 'react';
import { View, Linking, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import DataRenderer from 'components/shared/DataRenderer';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H3, P, A, B } from 'components/shared/toolBox/typography';
import FormattedDate from 'components/shared/formattedDate';
import { Button } from 'components/shared/toolBox/button';
import DisconnectExternalApplicationModal from '../DisconnectExternalApplicationModal/DisconnectExternalApplicationModal';
import Avatar from 'components/shared/avatar';
import Logo from 'components/shared/Logo/Logo';
import WavesPatternSvg from 'assets/svgs/WavesPatternSvg';
import UrlSvg from 'assets/svgs/UrlSvg';
import { stringShortener } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';

import getStyles from './ExternalApplicationDetailsScreen.styles';
import { useExternalApplicationConnectedChains } from '../../hooks/useExternalApplicationConnectedChains';
import { useExternalApplicationConnectedAccounts } from '../../hooks/useExternalApplicationConnectedAccounts';

export default function ExternalApplicationDetailsScreen() {
  const navigation = useNavigation();

  const route = useRoute();

  const disconnectApplicationModal = useModal();

  const { application } = route.params;

  const connectedChains = useExternalApplicationConnectedChains(application.namespaces);
  const connectedAccounts = useExternalApplicationConnectedAccounts(application.namespaces);

  const { styles } = useTheme({ styles: getStyles() });

  const handleUrlPress = () => Linking.openURL(application.peer.metadata.url);

  const handleDisconnectPress = () =>
    disconnectApplicationModal.open(() => (
      <DisconnectExternalApplicationModal
        application={application}
        onSuccess={() => {
          disconnectApplicationModal.close();
          navigation.goBack();
        }}
        onCancel={disconnectApplicationModal.close}
      />
    ));

  return (
    <View style={[styles.container, styles.theme.container]}>
      <LinearGradient
        colors={[colors.light.ultramarineBlue, colors.light.inkBlue]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[[styles.header, styles.theme.header]]}
      >
        <WavesPatternSvg height={280} width="100%" style={styles.headerBg} />

        <HeaderBackButton color={colors.light.white} onPress={navigation.goBack} />
      </LinearGradient>

      <Logo
        src={application.peer.metadata.icons[0]}
        name={application.peer.metadata.name}
        size={70}
        style={[styles.logoContainer, styles.theme.logoContainer]}
      />

      <View style={styles.body}>
        <ScrollView>
          <View style={styles.row}>
            <H3 style={[styles.title, styles.theme.title]}>{application.peer.metadata.name}</H3>
          </View>

          <View style={styles.row}>
            <UrlSvg size={1} />

            <A onPress={handleUrlPress} style={styles.url}>
              {application.peer.metadata.url}
            </A>
          </View>

          <View style={styles.row}>
            <P style={[styles.theme.label]}>
              {i18next.t('application.explore.externalApplicationDetailsScreen.expiryText')}:{' '}
            </P>

            <FormattedDate style={[styles.value, styles.theme.value]}>
              {application.expiry * 1000}
            </FormattedDate>
          </View>

          <View style={[styles.divider, styles.theme.divider]} />

          <View>
            <P style={[styles.label, styles.theme.label]}>
              {i18next.t(
                'application.explore.externalApplicationDetailsScreen.connectedChainsTitle'
              )}
            </P>

            <DataRenderer
              data={connectedChains.chains}
              isLoading={connectedChains.isLoading}
              error={connectedChains.isError}
              renderData={(chains) => (
                <View style={styles.itemsContainer}>
                  {chains.length > 0 &&
                    chains.map((chain, index) => (
                      <View key={index} style={[styles.itemContainer]}>
                        <Logo uri={chain.logo?.png} name={chain.displayName} size={32} />

                        <View style={[styles.itemBody]}>
                          <P style={[styles.itemTitle, styles.theme.itemTitle]}>
                            {chain.displayName}
                          </P>

                          <P style={[styles.itemSubtitle, styles.theme.itemSubtitle]}>
                            {i18next.t(
                              'application.explore.externalApplicationDetailsScreen.chainIDLabel'
                            )}
                            : {chain.chainID}
                          </P>
                        </View>
                      </View>
                    ))}
                </View>
              )}
            />
          </View>

          <View style={[styles.dividerSmall, styles.theme.divider]} />

          <View>
            <P style={[styles.label, styles.theme.label]}>
              {i18next.t(
                'application.explore.externalApplicationDetailsScreen.connectedAccountsTitle'
              )}
            </P>

            <View>
              {connectedAccounts.map((account) => (
                <View key={account.metadata.address} style={styles.itemContainer}>
                  <Avatar address={account.metadata.address} size={32} />

                  <View style={styles.itemBody}>
                    {account.metadata.name && (
                      <P style={[styles.itemTitle, styles.theme.itemTitle]}>
                        {account.metadata.name}
                      </P>
                    )}

                    <P style={[styles.itemSubtitle, styles.theme.itemSubtitle]}>
                      {stringShortener(account.metadata.address, 7, 4)}
                    </P>
                  </View>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.dividerSmall, styles.theme.divider]} />

          <View style={styles.column}>
            <P style={[styles.label, styles.theme.label]}>
              {i18next.t('application.explore.externalApplicationDetailsScreen.connectionIDTitle')}
            </P>

            <P style={[styles.value, styles.theme.value]}>{application.topic}</P>
          </View>

          <View style={[styles.divider, styles.theme.divider]} />

          <View style={styles.column}>
            <P style={[styles.label, styles.theme.label]}>
              {i18next.t('application.explore.externalApplicationDetailsScreen.permissionsTitle')}
            </P>

            <View style={styles.row}>
              <View style={[{ flex: 1 }]}>
                <B style={[styles.itemTitle, styles.label, styles.theme.itemTitle]}>
                  {i18next.t('application.explore.externalApplicationDetailsScreen.methodsTitle')}
                </B>

                {application.namespaces.lisk?.methods.map((method, index) => (
                  <P key={index} style={[styles.label, styles.theme.itemSubtitle]}>
                    {method}
                  </P>
                ))}
              </View>

              {application.namespaces.lisk?.events.length > 0 && (
                <View style={[{ flex: 1 }]}>
                  <B style={[styles.itemTitle, styles.label]}>
                    {i18next.t('application.explore.externalApplicationDetailsScreen.eventsTitle')}
                  </B>

                  {application.namespaces.lisk?.events.map((event, index) => (
                    <P key={index} style={[styles.label, styles.theme.itemSubtitle]}>
                      {event}
                    </P>
                  ))}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button onPress={handleDisconnectPress} textStyle={styles.disconnectButton}>
          {i18next.t('application.explore.externalApplicationDetailsScreen.disconnectButtonText')}
        </Button>
      </View>
    </View>
  );
}
