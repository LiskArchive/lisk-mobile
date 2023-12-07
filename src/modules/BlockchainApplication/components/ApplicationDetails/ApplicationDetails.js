/* eslint-disable max-lines */
/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import { ScrollView, View, Image, Linking } from 'react-native';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from 'contexts/ThemeContext';
import { useModal } from 'hooks/useModal';
import DataRenderer from 'components/shared/DataRenderer';
import ResultScreen from 'components/screens/ResultScreen';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { H3, P, A } from 'components/shared/toolBox/typography';
import InfoToggler from 'components/shared/InfoToggler';
import { PrimaryButton } from 'components/shared/toolBox/button';
import ErrorIllustrationSvg from 'assets/svgs/ErrorIllustrationSvg';
import WavesPatternSvg from 'assets/svgs/WavesPatternSvg';
import UrlSvg from 'assets/svgs/UrlSvg';
import PinSvg from 'assets/svgs/PinSvg';
import { colors } from 'constants/styleGuide';
import { fromBeddowsToLsk } from 'utilities/conversions.utils';

import { usePinApplications } from '../../hooks/usePinApplications';
import { useApplicationsExplorer } from '../../hooks/useApplicationsExplorer';
import { useApplicationsManagement } from '../../hooks/useApplicationsManagement';

import getStyles from './ApplicationDetails.styles';
import ApplicationDetailsSkeleton from '../ApplicationDetailsSkeleton/ApplicationDetailsSkeleton';
import AddApplicationSuccessModal from '../AddApplicationSuccessModal/AddApplicationSuccessModal';
import AddApplicationErrorModal from '../AddApplicationErrorModal/AddApplicationErrorModal';

/**
 * Renders the details of a given application in exploring or manage mode.
 * @param {RouteProp} route - Navigation route (optional).
 */
export default function ApplicationDetails({ route }) {
  const navigation = useNavigation();

  const { chainID, variant } = route.params;

  const resultModal = useModal();

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
    addApplication(application, {
      onSuccess: () => resultModal.open(<AddApplicationSuccessModal navigation={navigation} />),
      onError: () =>
        resultModal.open(
          <AddApplicationErrorModal navigation={navigation} chainName={application?.displayName} />
        ),
    });
  };

  const handleUrlPress = (url) => Linking.openURL(url);

  return (
    <View style={[styles.flex, styles.theme.container]}>
      <DataRenderer
        data={application}
        isLoading={applications.isLoading}
        error={applications.isError}
        renderData={(data) => (
          <>
            <ScrollView>
              <LinearGradient
                colors={[colors.light.ultramarineBlue, colors.light.inkBlue]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={[[styles.header, styles.theme.header]]}
              >
                <WavesPatternSvg height={280} width={400} style={styles.headerBg} />

                <HeaderBackButton color={colors.light.white} onPress={navigation.goBack} />
              </LinearGradient>

              <DataRenderer
                data={data.logo}
                renderData={(logo) => (
                  <Image
                    style={[styles.logoContainer, styles.theme.logoContainer]}
                    source={{ uri: logo.png }}
                  />
                )}
                hideOnEmpty
              />

              <View style={[styles.flex, styles.body]}>
                <View style={styles.titleRow}>
                  <DataRenderer
                    data={data.displayName}
                    renderData={(displayName) => (
                      <>
                        <H3 style={[styles.title, styles.theme.title]}>{displayName}</H3>
                        <TouchableOpacity style={styles.pinIcon} onPress={() => togglePin(chainID)}>
                          <PinSvg
                            color={colors.light.ultramarineBlue}
                            variant={isPinned ? 'fill' : 'outline'}
                            width={22}
                            height={22}
                          />
                        </TouchableOpacity>
                      </>
                    )}
                    hideOnEmpty
                  />
                </View>

                <View style={[styles.row, styles.projectPageContainer]}>
                  <DataRenderer
                    data={data.projectPage}
                    renderData={(projectPage) => (
                      <>
                        <UrlSvg size={1} />

                        <A onPress={() => handleUrlPress(projectPage)} style={[styles.url]}>
                          {projectPage}
                        </A>
                      </>
                    )}
                    hideOnEmpty
                    style={{ empty: styles.url }}
                  />
                </View>

                <DataRenderer
                  data={data.escrowedLSK}
                  renderData={(deposited) => (
                    <View style={[styles.row, styles.depositedContainer]}>
                      <P style={styles.deposited}>{i18next.t('application.details.deposited')}:</P>
                      <P style={styles.amount}>{`${fromBeddowsToLsk(deposited).toLocaleString(
                        'en-US'
                      )} LSK`}</P>
                    </View>
                  )}
                  hideOnEmpty
                  style={{ empty: styles.amount }}
                />

                <View style={[styles.divider, styles.theme.divider]} />

                <View style={styles.stats}>
                  <View style={styles.flex}>
                    <View style={styles.item}>
                      <View style={[styles.labelContainer]}>
                        <P style={styles.label}>{i18next.t('application.details.chainID')}</P>

                        <InfoToggler
                          title={i18next.t('application.details.chainID')}
                          description={i18next.t('application.details.chainIDDescription')}
                          style={{ toggleButtonIcon: { width: 16, marginLeft: 4 } }}
                        />
                      </View>

                      <P style={[styles.value, styles.theme.value]}>{chainID}</P>
                    </View>

                    <View style={styles.item}>
                      <View style={[styles.labelContainer]}>
                        <P style={styles.label}>{i18next.t('application.details.status')}</P>
                      </View>

                      <DataRenderer
                        data={data.status}
                        renderData={(status) => (
                          <View style={[styles.stateContainer, styles[`${status}Container`]]}>
                            <P style={[styles.value, styles[status], styles.theme[status]]}>
                              {status}
                            </P>
                          </View>
                        )}
                        hideOnEmpty
                        style={{
                          empty: [styles.value, styles[data.status], styles.theme[data.status]],
                        }}
                      />
                    </View>
                  </View>

                  <View style={styles.flex}>
                    <DataRenderer
                      data={data.lastUpdated}
                      renderData={(lastUpdated) => (
                        <View style={styles.item}>
                          <View style={[styles.labelContainer]}>
                            <P style={styles.label}>
                              {i18next.t('application.details.lastUpdated')}
                            </P>
                          </View>

                          <P style={[styles.value, styles.theme.value]}>
                            {moment(lastUpdated * 1000).format('D MMM YYYY')}
                          </P>
                        </View>
                      )}
                      hideOnEmpty
                      style={{ empty: [styles.value, styles.theme.value] }}
                    />

                    <DataRenderer
                      data={data.lastCertificateHeight}
                      renderData={(lastCertificateHeight) => (
                        <View style={styles.item}>
                          <View style={[styles.labelContainer]}>
                            <P style={styles.label}>
                              {i18next.t('application.details.lastCertificateHeight')}
                            </P>
                          </View>

                          <P style={[styles.value, styles.theme.value]}>{lastCertificateHeight}</P>
                        </View>
                      )}
                      hideOnEmpty
                      style={{ empty: [styles.value, styles.theme.value] }}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>

            {variant === 'manage' && (
              <SafeAreaView style={[styles.footer]}>
                <PrimaryButton onPress={handleAddApplicationClick}>
                  {i18next.t('application.manage.add.confirmButtonText')}
                </PrimaryButton>
              </SafeAreaView>
            )}
          </>
        )}
        renderLoading={() => (
          <>
            <View style={[styles.container]} resizeMode="stretch">
              <HeaderBackButton onPress={navigation.goBack} />
            </View>

            <ApplicationDetailsSkeleton />
          </>
        )}
        renderError={() => (
          <>
            <View style={[styles.container]} resizeMode="stretch">
              <HeaderBackButton onPress={navigation.goBack} />
            </View>

            <ResultScreen
              illustration={<ErrorIllustrationSvg />}
              title={i18next.t('fallbackScreens.error.title')}
              description={i18next.t('application.details.errorDescription')}
              styles={{ container: styles.resultScreenContainer }}
            />
          </>
        )}
      />
    </View>
  );
}
