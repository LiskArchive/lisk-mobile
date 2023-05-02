/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import { ScrollView, View, ImageBackground, Image, Linking } from 'react-native';
import { useTheme } from 'contexts/ThemeContext';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { H3, P, A } from 'components/shared/toolBox/typography';
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
import { isColorBright } from '../../../../utilities/colors.utils';

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
  const applications = useApplicationsExplorer('explore');

  const application = useMemo(
    () => applications.data?.find((app) => app.chainID === chainID),
    [chainID, applications.data]
  );

  const isPinned = checkPin(chainID);

  const handleAddApplicationClick = () => {
    addApplication(application);

    navigation.navigate('AddApplicationSuccess');
  };

  const handleUrlPress = (url) => Linking.openURL(url);

  const buttonColor = isColorBright(application?.backgroundColor)
    ? colors.dark.headerBg
    : colors.light.white;

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
            <HeaderBackButton color={buttonColor} onPress={navigation.goBack} />
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
          data={application?.logo}
          isLoading={applications.isLoading}
          error={applications.isError}
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
              data={application?.chainName}
              isLoading={applications.isLoading}
              error={applications.isError}
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

          <View style={[styles.row, styles.projectPageContainer]}>
            <DataRenderer
              data={application?.projectPage}
              isLoading={applications.isLoading}
              error={applications.isError}
              renderData={(data) => (
                <>
                  <UrlSvg size={1} />

                  <A onPress={() => handleUrlPress(data)} style={[styles.url]}>
                    {data}
                  </A>
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

          <DataRenderer
            data={application?.deposited}
            isLoading={applications.isLoading}
            error={applications.isError}
            hideOnEmpty
            renderData={(data) => (
              <View style={[styles.row, styles.depositedContainer]}>
                <P style={styles.deposited}>{i18next.t('application.details.deposited')}:</P>
                <P style={styles.amount}>{`${data.toLocaleString()} LSK`}</P>
              </View>
            )}
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

          <View style={styles.stats}>
            <View style={styles.flex}>
              <View style={styles.item}>
                <P style={styles.smallTitle}>{i18next.t('application.details.chainID')}</P>

                <P style={[styles.value, styles.theme.value]}>{chainID}</P>
              </View>

              <View style={styles.item}>
                <P style={styles.smallTitle}>{i18next.t('application.details.status')}</P>

                <DataRenderer
                  data={application?.status}
                  isLoading={applications.isLoading}
                  error={applications.isError}
                  renderData={(data) => (
                    <View
                      style={[styles.stateContainer, styles[`${application?.status}Container`]]}
                    >
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
              <DataRenderer
                data={application?.lastUpdated}
                isLoading={applications.isLoading}
                error={applications.isError}
                hideOnEmpty
                renderData={(data) => (
                  <View style={styles.item}>
                    <P style={styles.smallTitle}>{i18next.t('application.details.lastUpdated')}</P>

                    <P style={[styles.value, styles.theme.value]}>
                      {moment(data * 1000).format('D MMM YYYY')}
                    </P>
                  </View>
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

              <DataRenderer
                data={application?.lastCertificateHeight}
                isLoading={applications.isLoading}
                error={applications.isError}
                hideOnEmpty
                renderData={(data) => (
                  <View style={styles.item}>
                    <P style={styles.smallTitle}>
                      {i18next.t('application.details.lastCertificateHeight')}
                    </P>

                    <P style={[styles.value, styles.theme.value]}>{data}</P>
                  </View>
                )}
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
