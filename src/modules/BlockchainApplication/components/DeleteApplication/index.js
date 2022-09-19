import React from 'react';
import { View, Image } from 'react-native';
import i18next from 'i18next';

import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';

import getDeleteBlockchainApplicationStyles from './styles';

export default function DeleteBlockchainApplication({ sharedData: { application }, nextStep }) {
  const { styles } = useTheme({ styles: getDeleteBlockchainApplicationStyles() });

  const { deleteApplicationByChainId } = useBlockchainApplicationManagement();

  const handleDeleteApplicationClick = () => {
    deleteApplicationByChainId(application.chainID);
    nextStep({ application });
  };

  return (
    <View style={[styles.container, styles.theme.container]}>
      <H2 style={[styles.title, styles.theme.title]}>
        {i18next.t('application.manage.delete.title')}
      </H2>

      <View style={[styles.body]}>
        <View style={[styles.applicationNameContainer]}>
          <Image source={{ uri: application.logo.png }} style={[styles.applicationLogoImage]} />

          <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
            {application.chainName}
          </P>
        </View>

        <P style={[styles.descriptionText, styles.theme.descriptionText]}>
          {i18next.t('application.manage.delete.descriptionText')}
        </P>
      </View>

      <PrimaryButton
        onClick={handleDeleteApplicationClick}
        title={i18next.t('application.manage.delete.confirmButtonText')}
        style={[styles.submitButton]}
      />
    </View>
  );
}
