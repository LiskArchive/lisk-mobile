import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { translate } from 'react-i18next';
import Input from 'components/shared/toolBox/input';
import withTheme from 'components/shared/withTheme';
import CircularProgress from 'components/shared/circularProgres';
import { P } from 'components/shared/toolBox/typography';
import InfoSvg from 'assets/svgs/InfoSvg';
import DeleteSvg from 'assets/svgs/DeleteSvg';
import { colors } from 'constants/styleGuide';
import AddSvg from 'assets/svgs/AddSvg';
import FadeInView from 'components/shared/fadeInView';
import ModalHolder from 'utilities/modal';
import getStyles from './styles';

const svgcolor = { dark: colors.light.whiteSmoke, light: colors.light.zodiacBlue };

const MessageInfo = ({ t, styles }) => (
  <View>
    <P style={[styles.modalText, styles.theme.modalText]}>
      {t(
        'Lisk counts your message in bytes, so keep in mind that the length of your message may vary in different languages.'
      )}
    </P>
    <P style={[styles.modalText, styles.theme.modalText]}>
      {t('Different characters may consume a varying amount of bytes.')}
    </P>
  </View>
);

const MessageInput = ({
  styles, value, validity, byteCount, t, onChange, theme
}) => {
  const [collapsed, setCollapsed] = useState(true);
  const openModal = () =>
    ModalHolder.open({
      title: 'Bytes Counter',
      component: () => <MessageInfo t={t} styles={styles} />
    });
  return (
    <View>
      {value || !collapsed ? (
        <FadeInView>
          <View style={styles.labelRow}>
            <View style={styles.row}>
              <P style={[styles.label, styles.theme.label]}>{t('Message (optional)')}</P>
              <TouchableOpacity style={styles.optional} onPress={openModal} >
                <InfoSvg color={svgcolor[theme]} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={[styles.optional]}
              onPress={() => {
                setCollapsed(true);
                onChange('');
              }}
            >
              <DeleteSvg color={colors.light.ultramarineBlue} />
            </TouchableOpacity>
          </View>
          <View>
            <Input
              autoCorrect={false}
              multiline={true}
              innerStyles={{ containerStyle: styles.inputContainer }}
              onChange={onChange}
              value={value}
              error={validity === 1 ? t('Maximum length of 64 bytes is exceeded.') : ''}
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
            <P style={[styles.title, styles.theme.title]}>{t('Add Message (optional)')}</P>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default withTheme(translate()(MessageInput), getStyles());
