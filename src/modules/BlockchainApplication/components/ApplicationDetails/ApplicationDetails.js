/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import { ScrollView, View, ImageBackground, Image } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { H3, P } from 'components/shared/toolBox/typography';
import DataRenderer from 'components/shared/DataRenderer';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { PrimaryButton } from 'components/shared/toolBox/button';
import wavesPattern from 'assets/images/waves_pattern_large.png';
import { colors } from 'constants/styleGuide';
import UrlSvg from 'assets/svgs/UrlSvg';
import PinSvg from 'assets/svgs/PinSvg';
import { SafeAreaView } from 'react-native-safe-area-context';
import Skeleton from 'components/shared/Skeleton/Skeleton';
import { usePinApplications } from '../../hooks/usePinApplications';
import { useApplicationsExplorer } from '../../hooks/useApplicationsExplorer';
import { useApplicationsManagement } from '../../hooks/useApplicationsManagement';

import getStyles from './ApplicationDetails.styles';

/**
 *
 * @param {Object} props
 * @param {'manage' | 'explore'} variant
 * 'manage' -> uses plain app background header and application name by the top
 * 'explore' -> uses app background with patterns
 *
 */
export default function ApplicationDetails({ route }) {
  const navigation = useNavigation();

  const { chainID, variant } = route.params;

  const { styles } = useTheme({ styles: getStyles });

  const { checkPin, togglePin } = usePinApplications();
  const { addApplication } = useApplicationsManagement();
  const applications = useApplicationsExplorer();

  const application = useMemo(
    () => applications.data?.find((app) => app.chainID === chainID),
    [chainID, applications.data]
  );

  const isPinned = checkPin(chainID);

  const handleAddApplicationClick = () => {
    addApplication(application);

    navigation.navigate('AddApplicationSuccess');
  };

  return (
    <View style={[styles.flex, styles.theme.container]}>
      <ScrollView>
        {variant === 'explore' && (
          <ImageBackground
            style={[
              styles.header,
              styles.container,
              application?.backgroundColor && {
                backgroundColor: application.backgroundColor,
              },
            ]}
            source={wavesPattern}
            resizeMode="cover"
          >
            <HeaderBackButton color={colors.dark.white} onPress={navigation.goBack} />
          </ImageBackground>
        )}

        {variant === 'manage' && (
          <View
            style={[
              styles.header,
              styles.container,
              application?.backgroundColor && {
                backgroundColor: application.backgroundColor,
              },
            ]}
            resizeMode="stretch"
          >
            <DataRenderer
              isLoading={applications.isLoading}
              error={applications.isError}
              data={application?.chainName}
              renderData={(data) => <HeaderBackButton title={data} onPress={navigation.goBack} />}
            />
          </View>
        )}

        <DataRenderer
          isLoading={applications.isLoading}
          error={applications.isError}
          data={application?.logo}
          renderData={(data) => (
            <Image
              style={[styles.logoContainer, styles.theme.logoContainer]}
              source={{ uri: data.png }}
            />
          )}
          renderLoading={() => (
            <Skeleton
              variant="circle"
              width={70}
              style={{ container: { marginTop: -32, marginBottom: -32, alignSelf: 'center' } }}
            />
          )}
        />

        <SafeAreaView style={[styles.flex, styles.body]}>
          <View style={styles.titleRow}>
            <DataRenderer
              isLoading={applications.isLoading}
              error={applications.isError}
              data={application?.chainName}
              renderData={(data) => (
                <>
                  <H3 style={[styles.title, styles.theme.title]}>{data}</H3>
                  <TouchableOpacity style={styles.pinIcon} onPress={() => togglePin(chainID)}>
                    <PinSvg variant={isPinned ? 'fill' : 'outline'} width={24} height={24} />
                  </TouchableOpacity>
                </>
              )}
              renderLoading={() => (
                <Skeleton
                  width={96}
                  height={24}
                  style={{ container: [styles.title, styles.theme.title] }}
                />
              )}
            />
          </View>

          <DataRenderer
            isLoading={applications.isLoading}
            error={applications.isError}
            data={application?.address}
            renderData={(data) => <P style={[styles.address, styles.theme.address]}>{data}</P>}
            renderLoading={() => (
              <Skeleton
                width={288}
                height={16}
                style={{
                  container: [styles.address, styles.theme.address, { alignSelf: 'center' }],
                }}
              />
            )}
            style={{ empty: [styles.address, styles.theme.address] }}
          />

          <View style={[styles.row, styles.appLinkContainer]}>
            <DataRenderer
              isLoading={applications.isLoading}
              error={applications.isError}
              data={application?.explorers}
              renderData={(data) => (
                <>
                  <UrlSvg size={1} />

                  <P style={styles.url}>{data[0].url}</P>
                </>
              )}
              renderLoading={() => (
                <Skeleton
                  width={180}
                  height={16}
                  style={{
                    container: [styles.url, { alignSelf: 'center' }],
                  }}
                />
              )}
              style={{ empty: styles.url }}
            />
          </View>

          <View style={[styles.row, styles.depositedContainer]}>
            <P style={styles.deposited}>{i18next.t('application.details.deposited')}:</P>

            <DataRenderer
              isLoading={applications.isLoading}
              error={applications.isError}
              data={application?.deposited}
              renderData={(data) => <P style={styles.amount}>{`${data.toLocaleString()} LSK`}</P>}
              renderLoading={() => (
                <Skeleton
                  width={144}
                  height={16}
                  style={{
                    container: [styles.amount, { alignSelf: 'center' }],
                  }}
                />
              )}
              style={{ empty: styles.amount }}
            />
          </View>

          <View style={styles.stats}>
            <View style={styles.flex}>
              <View style={styles.item}>
                <P style={styles.smallTitle}>{i18next.t('application.details.chainID')}</P>

                <P style={[styles.value, styles.theme.value]}>{chainID}</P>
              </View>

              <View style={styles.item}>
                <P style={styles.smallTitle}>{i18next.t('application.details.status')}</P>

                <DataRenderer
                  isLoading={applications.isLoading}
                  error={applications.isError}
                  data={application?.state}
                  renderData={(data) => (
                    <View style={[styles.stateContainer, styles[`${application?.state}Container`]]}>
                      <P style={[styles.value, styles[data], styles.theme[data]]}>{data}</P>
                    </View>
                  )}
                  renderLoading={() => (
                    <Skeleton
                      width={78}
                      height={28}
                      style={{
                        container: [styles.value, { borderRadius: 16 }],
                      }}
                    />
                  )}
                  style={{
                    empty: [
                      styles.value,
                      styles[application?.state],
                      styles.theme[application?.state],
                    ],
                  }}
                />
              </View>
            </View>

            <View style={styles.flex}>
              <View style={styles.item}>
                <P style={styles.smallTitle}>{i18next.t('application.details.lastUpdated')}</P>

                <DataRenderer
                  isLoading={applications.isLoading}
                  error={applications.isError}
                  data={application?.lastUpdated}
                  renderData={(data) => (
                    <P style={[styles.value, styles.theme.value]}>
                      {moment(data).format('D MMM YYYY')}
                    </P>
                  )}
                  renderLoading={() => (
                    <Skeleton
                      width={80}
                      height={16}
                      style={{
                        container: [styles.value],
                      }}
                    />
                  )}
                  style={{ empty: [styles.value, styles.theme.value] }}
                />
              </View>

              <View style={styles.item}>
                <P style={styles.smallTitle}>
                  {i18next.t('application.details.lastCertificateHeight')}
                </P>

                <DataRenderer
                  isLoading={applications.isLoading}
                  error={applications.isError}
                  data={application?.lastCertificateHeight}
                  renderData={(data) => <P style={[styles.value, styles.theme.value]}>{data}</P>}
                  renderLoading={() => (
                    <Skeleton
                      width={48}
                      height={16}
                      style={{
                        container: [styles.value],
                      }}
                    />
                  )}
                  style={{ empty: [styles.value, styles.theme.value] }}
                />
              </View>
            </View>
          </View>

          {variant === 'manage' && (
            <PrimaryButton onClick={handleAddApplicationClick} noTheme>
              {i18next.t('application.manage.add.confirmButtonText')}
            </PrimaryButton>
          )}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
}
