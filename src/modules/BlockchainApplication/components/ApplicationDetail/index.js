import React from 'react';
import {
  ScrollView, View, ImageBackground, Image
} from 'react-native';
import { useTheme } from 'hooks/useTheme';
import moment from 'moment';
import { translate } from 'react-i18next';
import { H3, P } from 'components/shared/toolBox/typography';
import { useNavigation } from '@react-navigation/native';
import UrlSvg from 'assets/svgs/UrlSvg';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { PrimaryButton } from 'components/shared/toolBox/button';
import wavesPattern from 'assets/images/waves_pattern_large.png';
import { colors } from 'constants/styleGuide';
import { TouchableOpacity } from 'react-native-gesture-handler';
import getStyles from './styles';
import PinSvg from '../../../../assets/svgs/PinSvg';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
/**
 *
 * @param {Object} props
 * @param {'manage' | 'explore'} variant
 * 'manage' -> uses plain app background header and application name by the top
 * 'explore' -> uses app background with patterns
 *
 */
const ApplicationDetail = ({
  name,
  chainID,
  state,
  lastCertificateHeight,
  serviceURL,
  lastUpdated,
  deposited,
  address,
  backgroundColor,
  variant,
  image,
  t,
}) => {
  const { styles } = useTheme({ styles: getStyles });
  const navigation = useNavigation();

  const { checkPinByChainId, togglePin } = usePinBlockchainApplication();
  const { addApplicationByChainId } = useBlockchainApplicationManagement();

  const isPinned = checkPinByChainId(chainID);

  const addApplication = () => {
    addApplicationByChainId(chainID);
  };

  return (
    <ScrollView contentContainerStyle={[styles.flex, styles.theme.container]}>
      {variant === 'explore' && (
        <ImageBackground
          style={[
            styles.header,
            styles.explore,
            backgroundColor && { backgroundColor },
          ]}
          source={wavesPattern}
          resizeMode="cover"
        >
          <HeaderBackButton
            noIcon
            rightIcon="cross"
            rightColor={colors.dark.white}
            onRightPress={navigation.goBack}
          />
        </ImageBackground>
      )}
      {variant === 'manage' && (
        <View
          style={[styles.header, backgroundColor && { backgroundColor }]}
          resizeMode="stretch"
        >
          <HeaderBackButton title={name} onPress={navigation.goBack} />
        </View>
      )}
      <Image
        style={[styles.logoContainer, styles.theme.logoContainer]}
        source={{ uri: image }}
      ></Image>
      <View style={[styles.flex, styles.body]}>
        <View style={styles.titleRow}>
          <H3 style={[styles.title, styles.theme.title]}>{name}</H3>
          <TouchableOpacity
            style={styles.pinIcon}
            onPress={() => togglePin(chainID)}
          >
            <PinSvg
              variant={isPinned ? 'fill' : 'outline'}
              width={25}
              height={25}
            />
          </TouchableOpacity>
        </View>
        <P style={[styles.address, styles.theme.address]}>{address}</P>
        <View style={[styles.row, styles.appLinkContainer]}>
          <UrlSvg size={1.2} />
          <P style={styles.url}>{serviceURL}</P>
        </View>
        <View style={[styles.row, styles.depositedContainer]}>
          <P style={styles.deposited}>{t('application.details.deposited')}: </P>
          <P
            style={styles.amount}
          >{`${deposited.toLocaleString()} LSK`}</P>
        </View>
        <View style={styles.stats}>
          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>
                {t('application.details.chainID')}{' '}
              </P>
              <P style={[styles.value, styles.theme.value]}>{chainID}</P>
            </View>
            <View style={styles.item}>
              <P style={styles.smallTitle}>
                {t('application.details.status')}{' '}
              </P>
              <View
                style={[styles.stateContainer, styles[`${state}Container`]]}
              >
                <P style={[styles.value, styles[state]]}>{state}</P>
              </View>
            </View>
          </View>
          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>
                {t('application.details.lastUpdated')}{' '}
              </P>
              <P style={[styles.value, styles.theme.value]}>
                {moment(lastUpdated).format('D MMM YYYY')}
              </P>
            </View>
            <View style={styles.item}>
              <P style={styles.smallTitle}>
                {t('application.details.lastCertificateHeight')}
              </P>
              <P style={[styles.value, styles.theme.value]}>
                {lastCertificateHeight}
              </P>
            </View>
          </View>
        </View>
        {variant === 'manage' && (
          <View>
            <PrimaryButton
              onClick={addApplication}
              title={t('application.manage.buttons.addApplication')}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default translate()(ApplicationDetail);
