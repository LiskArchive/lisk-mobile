/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import {
  ScrollView, View, ImageBackground, Image, Text
} from 'react-native';
import { useTheme } from 'hooks/useTheme';
import moment from 'moment';
import { translate } from 'react-i18next';
import { H3, P } from 'components/shared/toolBox/typography';
import UrlSvg from 'assets/svgs/UrlSvg';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { PrimaryButton } from 'components/shared/toolBox/button';
import wavesPattern from 'assets/images/waves_pattern_large.png';
import { colors } from 'constants/styleGuide';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PinSvg from 'assets/svgs/PinSvg';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import getStyles from './styles';
import { useBlockchainApplicationExplorer } from '../../hooks/useBlockchainApplicationExplorer';
/**
 *
 * @param {Object} props
 * @param {'manage' | 'explore'} variant
 * 'manage' -> uses plain app background header and application name by the top
 * 'explore' -> uses app background with patterns
 *
 */
const ApplicationDetail = ({ t, route, navigation }) => {
  const { styles } = useTheme({ styles: getStyles });

  const { checkPinByChainId, togglePin } = usePinBlockchainApplication();
  const { addApplication } = useBlockchainApplicationManagement();
  const { applications } = useBlockchainApplicationExplorer();
  const { chainID, variant } = route.params;

  const application = useMemo(
    () => applications.data?.filter((app) => app.chainID === chainID) ?? [],
    [chainID, applications]
  )[0];

  const isPinned = checkPinByChainId(chainID);

  const handleAddApplicationClick = () => {
    addApplication(application);
    navigation.navigate('AddApplicationSuccess');
  };

  if (applications.isLoading) {
    return (
      <ScrollView contentContainerStyle={[styles.flex, styles.theme.container]}>
        <Text>Loading applications...</Text>
      </ScrollView>
    );
  }

  const {
    name,
    state,
    lastCertificateHeight,
    lastUpdated,
    deposited,
    address,
    backgroundColor,
    explorers,
    image,
  } = application;

  return (
    <ScrollView contentContainerStyle={[styles.flex, styles.theme.container]}>
      {variant === 'explore' && (
        <ImageBackground
          style={[
            styles.header,
            styles.explore,
            styles.container,
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
          style={[styles.header, styles.container, backgroundColor && { backgroundColor }]}
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
          <TouchableOpacity style={styles.pinIcon} onPress={() => togglePin(chainID)}>
            <PinSvg variant={isPinned ? 'fill' : 'outline'} width={25} height={25} />
          </TouchableOpacity>
        </View>
        <P style={[styles.address, styles.theme.address]}>{address}</P>
        <View style={[styles.row, styles.appLinkContainer]}>
          <UrlSvg size={1.2} />
          <P style={styles.url}>{explorers[0]}</P>
        </View>
        <View style={[styles.row, styles.depositedContainer]}>
          <P style={styles.deposited}>{t('application.details.deposited')}: </P>
          <P style={styles.amount}>{`${deposited.toLocaleString()} LSK`}</P>
        </View>
        <View style={styles.stats}>
          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>{t('application.details.chainID')} </P>
              <P style={[styles.value, styles.theme.value]}>{chainID}</P>
            </View>
            <View style={styles.item}>
              <P style={styles.smallTitle}>{t('application.details.status')} </P>
              <View style={[styles.stateContainer, styles[`${state}Container`]]}>
                <P style={[styles.value, styles[state], styles.theme[state]]}>{state}</P>
              </View>
            </View>
          </View>
          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>{t('application.details.lastUpdated')} </P>
              <P style={[styles.value, styles.theme.value]}>
                {moment(lastUpdated).format('D MMM YYYY')}
              </P>
            </View>
            <View style={styles.item}>
              <P style={styles.smallTitle}>{t('application.details.lastCertificateHeight')}</P>
              <P style={[styles.value, styles.theme.value]}>{lastCertificateHeight}</P>
            </View>
          </View>
        </View>
        {variant === 'manage' && (
          <View>
            <PrimaryButton
              onClick={handleAddApplicationClick}
              title={t('application.manage.add.confirmButtonText')}
            />
          </View>
        )}
      </View>
    </ScrollView>
  );
};

export default translate()(ApplicationDetail);
