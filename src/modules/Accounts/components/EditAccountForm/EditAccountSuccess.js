import React from 'react';
import { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { P } from 'components/shared/toolBox/typography';
import DownloadFile from 'components/shared/DownloadFile';
import CompletedIllustrationSvg from 'assets/svgs/CompletedIllustrationSvg';
import { getAccountDownloadableFilename } from 'modules/Auth/utils/downloadAccount';

import getEditAccountFormStyles from './styles';

export default function EditAccountSuccess({ account, onCompleted, style }) {
  const { styles } = useTheme({ styles: getEditAccountFormStyles() });

  function handleSubmit() {
    if (onCompleted) {
      onCompleted();
    }
  }

  const accountFilename = getAccountDownloadableFilename(account.metadata.address);

  return (
    <>
      <View style={[styles.body]}>
        <CompletedIllustrationSvg style={[styles.illustration]} />

        <P style={[styles.description, styles.theme.description, style?.description]}>
          You can now download encrypted secret recovery phrase to this effect.
        </P>

        <DownloadFile data={account} fileName={accountFilename} />
      </View>

      <PrimaryButton onClick={handleSubmit} style={[styles.submitButton, style?.submitButton]}>
        Continue to wallet
      </PrimaryButton>
    </>
  );
}
