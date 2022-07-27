import React from 'react';
import { translate } from 'react-i18next';
import { View, Image } from 'react-native';

import HeaderBackButton from 'components/navigation/headerBackButton';
import { H2, P } from 'components/shared/toolBox/typography';
import { PrimaryButton } from 'components/shared/toolBox/button';
import { useTheme } from 'hooks/useTheme';
import { colors, themes } from 'constants/styleGuide';

import getDeleteBlockchainApplicationStyles from './styles';

function DeleteBlockchainApplication({ navigation, route }) {
  const { theme, styles } = useTheme({ styles: getDeleteBlockchainApplicationStyles() });

  const { application } = route.params;

  return (
    <View style={[styles.container, styles.theme.container]}>
      <HeaderBackButton
        noIcon
        onPress={navigation.goBack}
        rightIcon="cross"
        rightColor={theme === themes.dark ? colors.dark.white : colors.light.ultramarineBlue}
        onRightPress={navigation.goBack}
      />

      <View style={[styles.innerContainer]}>
        <H2 style={[styles.title]}>Remove application?</H2>

        <View style={[styles.applicationNameContainer]}>
          <Image
            source={{ uri: application.images.logo.png }}
            style={[styles.applicationLogoImage]}
          />

          <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
            {application.name}
          </P>
        </View>

        <P style={[styles.descriptionText]}>
          This application will no longer be in your application list.
        </P>
      </View>

      <PrimaryButton
        onClick={() => console.log('on delete app...')}
        title={'Remove now'}
        style={[styles.submitButton]}
      />
    </View>
  );
}

export default translate()(DeleteBlockchainApplication);
