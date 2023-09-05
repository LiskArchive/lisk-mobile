/* eslint-disable max-statements */
import React from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';
import { colors } from 'constants/styleGuide';

import { useAccounts } from 'modules/Accounts/hooks/useAccounts';
import { H3, P, B } from 'components/shared/toolBox/typography';
import InfoComponent from 'components/shared/infoComponent';
import { Button, PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import UrlSvg from 'assets/svgs/UrlSvg';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import { stringShortener } from 'utilities/helpers';
import Avatar from 'components/shared/avatar';

import getStyles from './styles';

export default function ExternalAppSignatureRequestNotification({
  session,
  senderApplicationChainID,
  senderAccountAddress,
  onCancel,
  onSubmit,
  signingAddress,
  switchAccount,
  isCurrentAccount,
  isAccountAdded,
  navigation,
}) {
  const { accounts } = useAccounts();

  const addAccount = () => {
    onCancel();
    navigation.navigate('AuthMethod');
  };

  const senderAccount = accounts.find(
    (account) => account.metadata.address === senderAccountAddress
  );

  const { styles } = useTheme({ styles: getStyles });

  const shouldSwitchAccount = !isCurrentAccount && isAccountAdded;

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

          <P style={[styles.itemSubtitle, styles.theme.description]}>
            {stringShortener(senderAccountAddress, 7, 4)}
          </P>
        </View>
      </View>

      <View style={styles.horizontalLine} />
      {shouldSwitchAccount && (
        <View>
          <InfoComponent
            component={
              <P style={[styles.theme.description]}>
                {i18next.t(
                  'application.externalApplicationSignatureRequest.errors.notCurrentAccount1'
                )}
                <B style={[styles.theme.description]}>{stringShortener(signingAddress, 7, 4)}</B>
                {i18next.t(
                  'application.externalApplicationSignatureRequest.errors.notCurrentAccount2'
                )}
              </P>
            }
            variant="warning"
          />
          <Button style={[styles.switchButton]} onPress={switchAccount}>
            <View style={styles.switchTextContainer}>
              <P style={styles.switchText}>
                {i18next.t('application.externalApplicationSignatureRequest.sign.switchAccount')}
              </P>
              <SwitchSvg color={colors.light.ultramarineBlue} />
            </View>
          </Button>
        </View>
      )}
      {!isAccountAdded && (
        <InfoComponent
          component={
            <P style={[styles.theme.description]}>
              {i18next.t('application.externalApplicationSignatureRequest.errors.accountNotAdded1')}
              <B style={[styles.theme.description]}>{stringShortener(signingAddress, 7, 4)}</B>
              {i18next.t('application.externalApplicationSignatureRequest.errors.accountNotAdded2')}
            </P>
          }
          variant="warning"
        />
      )}

      <View style={[styles.footer]}>
        <Button style={[styles.buttonLeft]} onPress={onCancel}>
          {i18next.t('commons.buttons.reject')}
        </Button>

        {isAccountAdded ? (
          <PrimaryButton
            style={[styles.buttonRight]}
            onPress={onSubmit}
            disabled={!isCurrentAccount || !isAccountAdded}
          >
            {i18next.t('commons.buttons.continue')}
          </PrimaryButton>
        ) : (
          <PrimaryButton style={[styles.buttonRight]} onPress={addAccount}>
            {i18next.t('accounts.accountsManager.addAccountButtonText')}
          </PrimaryButton>
        )}
      </View>
    </View>
  );
}
