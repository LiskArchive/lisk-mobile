import React from 'react';
import { View } from 'react-native';
// import i18next from 'i18next';

import { P } from 'components/shared/toolBox/typography';
import { Button } from 'components/shared/toolBox/button';
import { useTheme } from 'contexts/ThemeContext';
import WarningSvg from 'assets/svgs/WarningSvg';
import { colors } from 'constants/styleGuide';

import getExternalApplicationSignatureRequestStyles from './styles';

export default function ExternalAppSignatureRequestValidator({
  session,
  recipientApplicationChainID,
  onSubmit,
  isEventValidSchema,
  children,
}) {
  const { styles } = useTheme({ styles: getExternalApplicationSignatureRequestStyles });

  if (!isEventValidSchema) {
    return (
      <View>
        <View style={styles.imageContainer}>
          <WarningSvg color={colors.light.furyRed} height={40} width={40} />
        </View>

        <P style={[styles.description, styles.theme.text]}>
          An external connection named &quot;{session.peer.metadata.name}&quot;, with chain ID:{' '}
          {recipientApplicationChainID} tried to connect, but was blocked since has a non valid
          chain ID.
        </P>

        <View style={[styles.footer]}>
          <Button style={[styles.button]} onPress={onSubmit}>
            Close
          </Button>
        </View>
      </View>
    );
  }

  return children;
}
