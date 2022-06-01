import React from 'react';
import { View, Text } from 'react-native';
import withTheme from 'components/shared/withTheme';
import { PrimaryButton } from 'components/shared/toolBox/button';
import getStyles from './styles';

const SuccessScreen = ({
  illustration, title, description, styles, onContinue, buttonText, children
}) => <View style={[styles.wrapper, styles.theme.wrapper]} >
    <View style={[styles.container]} >
      <View style={styles.illustration} >
        {illustration}
      </View>
      <Text style={[styles.title, styles.theme.title]} >{title}</Text>
      <Text style={[styles.description, styles.theme.description]} >{description}</Text>
      {children}
    </View>
    <PrimaryButton
      noTheme
      title={buttonText}
      style={styles.continueButton}
      onPress={onContinue}
    />
  </View>;

export default withTheme(SuccessScreen, getStyles());
