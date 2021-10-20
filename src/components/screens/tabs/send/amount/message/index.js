import React, { useState } from 'react';
import { View } from 'react-native';
import { translate } from 'react-i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Input from '../../../../../shared/toolBox/input';
import withTheme from '../../../../../shared/withTheme';
import getStyles from './styles';
import CircularProgress from '../../../../../shared/circularProgres';
import { P } from '../../../../../shared/toolBox/typography';
import InfoSvg from '../../../../../../assets/svgs/InfoSvg';
import DeleteSvg from '../../../../../../assets/svgs/DeleteSvg';
import { colors } from '../../../../../../constants/styleGuide';
import AddSvg from '../../../../../../assets/svgs/AddSvg';
import FadeInView from '../../../../../shared/fadeInView';
import ModalHolder from '../../../../../../utilities/modal';

const svgcolor = { dark: colors.light.whiteSmoke, light: colors.light.zodiacBlue };

const MessageInfo = ({ t, styles }) => (
  <View>
    <P style={[styles.modalText, styles.theme.modalText]}>
      {t(
        'Lisk counts your message in bytes, so keep in mind that the length of your message may vary in different languages.'
      )}
    </P>
    <P style={[styles.modalText, styles.theme.modalText]}>{t('Different characters may consume a varying amount of bytes.')}</P>
  </View>
);

const Message = ({
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
      {collapsed ? (
        <TouchableOpacity onPress={() => setCollapsed(false)} style={[styles.addMessage]}>
          <View style={styles.row}>
            <TouchableOpacity style={styles.actionButton}>
              <AddSvg color={colors.light.ultramarineBlue} />
            </TouchableOpacity>
            <P style={[styles.title, styles.theme.title]}>{t('Add Message (optional)')}</P>
          </View>
        </TouchableOpacity>
      ) : (
        <FadeInView>
          <View style={styles.labelRow}>
            <View style={styles.row}>
              <P style={[styles.label, styles.theme.label]}>{t('Message (optional)')}</P>
              <TouchableOpacity style={styles.actionButton} onPress={openModal}>
                <InfoSvg color={svgcolor[theme]} />
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => {
                setCollapsed(true);
                onChange('');
              }}
            >
              <DeleteSvg color={colors.light.ultramarineBlue} />
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <Input
              autoCorrect={false}
              multiline={true}
              onChange={onChange}
              value={value}
              error={validity === 1 ? t('Maximum length of 64 bytes is exceeded.') : ''}
            />
            <CircularProgress style={styles.circularProgress} max={64} value={byteCount} />
          </View>
        </FadeInView>
      )}
    </View>
  );
};

export default withTheme(translate()(Message), getStyles());
