import { View } from 'react-native';
import React from 'react';

import { useDownloadFile } from 'hooks/useDownloadFile';
import { useTheme } from 'contexts/ThemeContext';
import { LabelButton } from 'components/shared/toolBox/button';
import { P } from 'components/shared/toolBox/typography';
import DownloadSvg from 'assets/svgs/DownloadSvg';
import FileSvg from 'assets/svgs/FileSvg';

import getDeleteAccountFormStyles from './styles';

export default function DownloadFile({
  data,
  fileName,
  onCompleted,
  onError,
  downloadFile: baseDownloadFile,
  isLoading: baseIsLoading,
  style,
}) {
  const [downloadFile, { isLoading }] = useDownloadFile({
    data,
    fileName,
    onCompleted,
    onError,
  });

  const { styles } = useTheme({ styles: getDeleteAccountFormStyles() });

  return (
    <View style={[styles.container, style?.container]}>
      <View style={[styles.row, styles.filenameContainer, style?.filenameContainer]}>
        <FileSvg />

        <P style={[styles.text, styles.theme.text, style?.fileName]}>{fileName}</P>
      </View>

      <LabelButton
        onPress={baseDownloadFile || downloadFile}
        style={[styles.row, style?.submitButton]}
        adornments={{
          right: <DownloadSvg height={18} width={18} style={[styles.downloadFileIcon]} />,
        }}
        disabled={baseIsLoading || isLoading}
        isLoading={isLoading}
        testID="download-file-button"
      >
        Download
      </LabelButton>
    </View>
  );
}
