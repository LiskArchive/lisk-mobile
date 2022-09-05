import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import i18next from 'i18next';

import Input from 'components/shared/toolBox/input';
import CircularProgress from 'components/shared/circularProgres';
import { P } from 'components/shared/toolBox/typography';
import DeleteSvg from 'assets/svgs/DeleteSvg';
import { colors } from 'constants/styleGuide';
import AddSvg from 'assets/svgs/AddSvg';
import FadeInView from 'components/shared/fadeInView';
import { useTheme } from 'hooks/useTheme';
import InfoToggler from 'components/shared/InfoToggler';

import getStyles from './styles';

export default function MessageInput({
  value, validity, byteCount, onChange
}) {
  const [collapsed, setCollapsed] = useState(true);

  const { styles } = useTheme({ styles: getStyles() });

  return (
    <View>
      {value || !collapsed ? (
        <FadeInView>
          <View style={styles.labelRow}>
            <View style={styles.row}>
              <P style={[styles.label, styles.theme.label]}>
                {i18next.t('Message (optional)')}
              </P>

              <InfoToggler
                title= {i18next.t('sendToken.info.bytesCounter.title')}
                description={[
                  i18next.t('sendToken.info.bytesCounter.description1'),
                  i18next.t('sendToken.info.bytesCounter.description2'),
                ]}
              />
            </View>

            <TouchableOpacity
              style={[styles.optional]}
              onPress={() => {
                setCollapsed(true);
                onChange('');
              }}
            >
              <DeleteSvg color={colors.light.ultramarineBlue} height={16}/>
            </TouchableOpacity>
          </View>

          <View>
            <Input
              autoCorrect={false}
              multiline={true}
              innerStyles={{ containerStyle: styles.inputContainer }}
              onChange={onChange}
              value={value}
              error={validity === 1 ? i18next.t('Maximum length of 64 bytes is exceeded.') : ''}
              accessibilityLabel="message-input"
            />

            <CircularProgress
              style={[styles.circularProgress, validity === 1 && styles.errorProgress]}
              max={64}
              value={byteCount}
            />
          </View>
        </FadeInView>
      ) : (
        <TouchableOpacity onPress={() => setCollapsed(false)} style={[styles.addMessage]} accessibilityLabel="open-message">
          <View style={styles.row}>
            <View style={styles.actionButton} testID='open-message-input' >
              <AddSvg color={colors.light.ultramarineBlue} />
            </View>

            <P style={[styles.title, styles.theme.title]}>{i18next.t('Add Message (optional)')}</P>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
}
