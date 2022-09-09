import React from 'react';
import { translate } from 'react-i18next';
import { View, Image } from 'react-native';

import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';

import getDeleteBlockchainApplicationStyles from './styles';

function DeleteBlockchainApplication({ t, sharedData: { application }, nextStep }) {
  const { styles } = useTheme({ styles: getDeleteBlockchainApplicationStyles() });

  const { deleteApplicationByChainId } = useBlockchainApplicationManagement();

  const handleDeleteApplicationClick = () => {
    deleteApplicationByChainId(application.chainID);
    nextStep({ application });
  };

  return (
    <View style={[styles.container, styles.theme.container]}>
      <View style={[styles.innerContainer]}>
        <H2 style={[styles.title, styles.theme.title]}>{t('application.manage.delete.title')}</H2>

        <View style={[styles.applicationNameContainer]}>
          <Image
            source={{ uri: application.logo.png }}
            style={[styles.applicationLogoImage]}
          />

          <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
            {application.name}
          </P>
        </View>

        <P style={[styles.descriptionText, styles.theme.descriptionText]}>
          {t('application.manage.delete.descriptionText')}
        </P>
      </View>

      <PrimaryButton
        onClick={handleDeleteApplicationClick}
        title={t('application.manage.delete.confirmButtonText')}
        style={[styles.submitButton]}
      />
    </View>
  );
}

export default translate()(DeleteBlockchainApplication);
