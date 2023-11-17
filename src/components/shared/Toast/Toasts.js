import React, { View } from 'react-native';

import { useTheme } from 'contexts/ThemeContext';
import { H3, P } from 'components/shared/toolBox/typography';
import { colors } from 'constants/styleGuide';
import CircleCheckedSvg from 'assets/svgs/CircleCheckedSvg';
import WarningSvg from 'assets/svgs/WarningSvg';

import getStyles from './Toast.styles';

export function SuccessToast({ text1, text2 }) {
  const { styles } = useTheme({ styles: getStyles() });

  return (
    <View style={styles.container}>
      <View style={[styles.body, styles.theme.successBody]}>
        <CircleCheckedSvg
          variant="fill"
          height={16}
          width={16}
          color={colors.light.ufoGreen}
          style={styles.icon}
        />

        <View style={styles.textContainer}>
          {text1 && <H3 style={[styles.title, styles.theme.successTitle]}>{text1}</H3>}

          {text2 && <P style={[styles.description, styles.theme.successDescription]}>{text2}</P>}
        </View>
      </View>
    </View>
  );
}

export function ErrorToast({ text1, text2 }) {
  const { styles } = useTheme({ styles: getStyles() });

  return (
    <View style={styles.container}>
      <View style={[styles.body, styles.theme.errorBody]}>
        <WarningSvg height={16} width={16} color={colors.light.furyRed} style={styles.icon} />

        <View style={styles.textContainer}>
          {text1 && <H3 style={[styles.title, styles.theme.errorTitle]}>{text1}</H3>}

          {text2 && <P style={[styles.description, styles.theme.errorDescription]}>{text2}</P>}
        </View>
      </View>
    </View>
  );
}
