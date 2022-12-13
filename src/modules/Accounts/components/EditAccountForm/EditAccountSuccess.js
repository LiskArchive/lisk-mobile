import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'hooks/useTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { P } from 'components/shared/toolBox/typography';

import getEditAccountFormStyles from './styles';
import CompletedIllustrationSvg from '../../../../assets/svgs/CompletedIllustrationSvg';
import DownloadFile from '../../../../components/shared/DownloadFile';

export default function EditAccountSuccess({ mode, account, onCompleted, style }) {
  const { styles } = useTheme({ styles: getEditAccountFormStyles() });

  function handleSubmit() {
    console.log({ account });

    if (onCompleted) {
      onCompleted();
    }
  }

  return (
    <>
      <View style={[styles.body]}>
        <CompletedIllustrationSvg style={[styles.illustration]} />

        <P
          style={[
            mode === 'modal' ? styles.modalDescription : styles.screenDescription,
            styles.theme.description,
            style?.description,
          ]}
        >
          You can now download encrypted secret recovery phrase to this effect.
        </P>

        <DownloadFile
          data={account}
          fileName={`encrypted_secret_recovery_phrase_${account.metadata.address}.json`}
        />
      </View>

      <PrimaryButton onClick={handleSubmit} style={[styles.submitButton, style?.submitButton]}>
        Continue to wallet
      </PrimaryButton>
    </>
  );
}
