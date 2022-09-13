/* eslint-disable max-statements */
import React, { useMemo } from 'react';
import {
  ScrollView, View, ImageBackground, Image
} from 'react-native';
import { useTheme } from 'hooks/useTheme';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import i18next from 'i18next';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { H3, P } from 'components/shared/toolBox/typography';
import UrlSvg from 'assets/svgs/UrlSvg';
import HeaderBackButton from 'components/navigation/headerBackButton';
import { PrimaryButton } from 'components/shared/toolBox/button';
import wavesPattern from 'assets/images/waves_pattern_large.png';
import { colors } from 'constants/styleGuide';
import PinSvg from 'assets/svgs/PinSvg';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import { useBlockchainApplicationExplorer } from '../../hooks/useBlockchainApplicationExplorer';

import getStyles from './styles';
import DataRenderer from '../../../../components/shared/DataRenderer';

/**
 *
 * @param {Object} props
 * @param {'manage' | 'explore'} variant
 * 'manage' -> uses plain app background header and application name by the top
 * 'explore' -> uses app background with patterns
 *
 */
export default function ApplicationDetail({ route }) {
  const navigation = useNavigation();
  const { chainID, variant } = route.params;

  const { styles } = useTheme({ styles: getStyles });

  const { checkPinByChainId, togglePin } = usePinBlockchainApplication();
  const { addApplication } = useBlockchainApplicationManagement();
  const { applications, applicationsMetadata } = useBlockchainApplicationExplorer();

  const application = useMemo(
    () => applications.data?.find((app) => app.chainID === chainID),
    [chainID, applications]
  );

  const applicationMetadata = useMemo(
    () => applicationsMetadata.data?.find((app) => app.chainID === chainID),
    [chainID, applicationsMetadata]
  );

  const isPinned = checkPinByChainId(chainID);

  const handleAddApplicationClick = () => {
    addApplication(application);
    navigation.navigate('AddApplicationSuccess');
  };

  return (
    <ScrollView contentContainerStyle={[styles.flex, styles.theme.container]}>
      {variant === 'explore' && (
        <ImageBackground
          style={[
            styles.header,
            styles.explore,
            styles.container,
            applicationMetadata?.backgroundColor
            && { backgroundColor: applicationMetadata?.backgroundColor },
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
          style={[
            styles.header,
            styles.container,
            applicationMetadata?.backgroundColor
            && { backgroundColor: applicationMetadata?.backgroundColor }
          ]}
          resizeMode="stretch"
        >
          <HeaderBackButton title={applicationMetadata?.chainName} onPress={navigation.goBack} />
        </View>
      )}

      <Image
        style={[styles.logoContainer, styles.theme.logoContainer]}
        source={{ uri: applicationMetadata?.logo.png }}
      />

      <View style={[styles.flex, styles.body]}>
        <View style={styles.titleRow}>
          <DataRenderer
            isLoading={applicationsMetadata.isLoading}
            error={applicationsMetadata.isError}
            data={applicationMetadata?.chainName}
            renderData={(data) => (
              <H3 style={[styles.title, styles.theme.title]}>
                {data}
              </H3>
            )}
          />

          <TouchableOpacity style={styles.pinIcon} onPress={() => togglePin(chainID)}>
            <PinSvg variant={isPinned ? 'fill' : 'outline'} width={25} height={25} />
          </TouchableOpacity>
        </View>

        <DataRenderer
          isLoading={applications.isLoading}
          error={applications.isError}
          data={application?.address}
          renderData={(data) => (
            <P style={[styles.address, styles.theme.address]}>
              {data}
            </P>
          )}
          style={{ empty: [styles.address, styles.theme.address] }}
        />

        <View style={[styles.row, styles.appLinkContainer]}>
          <DataRenderer
            isLoading={applicationsMetadata.isLoading}
            error={applicationsMetadata.isError}
            data={applicationMetadata?.explorers}
            renderData={(data) => (
              <>
                <UrlSvg size={1.2} />

                <P style={styles.url}>{data[0].url}</P>
              </>
            )}
            style={{ empty: styles.url }}
          />
        </View>

        <View style={[styles.row, styles.depositedContainer]}>
          <P style={styles.deposited}>
            {i18next.t('application.details.deposited')}:
          </P>

          <DataRenderer
            isLoading={applications.isLoading}
            error={applications.isError}
            data={application?.deposited}
            renderData={(data) => (
              <P style={styles.amount}>
                {`${data.toLocaleString()} LSK`}
              </P>
            )}
            style={{ empty: styles.amount }}
          />
        </View>

        <View style={styles.stats}>
          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>
                {i18next.t('application.details.chainID')}
              </P>

              <P style={[styles.value, styles.theme.value]}>{chainID}</P>
            </View>

            <View style={styles.item}>
              <P style={styles.smallTitle}>
                {i18next.t('application.details.status')}
              </P>

              <DataRenderer
                isLoading={applications.isLoading}
                error={applications.isError}
                data={application?.state}
                renderData={(data) => (
                  <View
                    style={[
                      styles.stateContainer,
                      styles[`${application?.state}Container`]
                    ]}
                  >
                    <P style={[styles.value, styles[data], styles.theme[data]]}>
                      {data}
                    </P>
                  </View>
                )}
                style={{
                  empty: [
                    styles.value,
                    styles[application?.state],
                    styles.theme[application?.state]
                  ]
                }}
              />
            </View>
          </View>

          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>
                {i18next.t('application.details.lastUpdated')}
              </P>

              <DataRenderer
                isLoading={applications.isLoading}
                error={applications.isError}
                data={application?.lastUpdated}
                renderData={(data) => (
                  <P style={[styles.value, styles.theme.value]}>
                    {moment(data).format('D MMM YYYY')}
                  </P>
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
                renderData={(data) => (
                  <P style={[styles.value, styles.theme.value]}>
                    {data}
                  </P>
                )}
                style={{ empty: [styles.value, styles.theme.value] }}
              />
            </View>
          </View>
        </View>

        {variant === 'manage' && (
          <PrimaryButton onClick={handleAddApplicationClick}>
            {i18next.t('application.manage.add.confirmButtonText')}
          </PrimaryButton>
        )}
      </View>
    </ScrollView>
  );
}
