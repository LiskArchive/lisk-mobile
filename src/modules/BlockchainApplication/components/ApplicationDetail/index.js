import React from 'react';
import { ScrollView, View } from 'react-native';
import { useTheme } from 'hooks/useTheme';
import { H3, P } from 'components/shared/toolBox/typography';
import UrlSvg from 'assets/svgs/UrlSvg';
import moment from 'moment';
import getStyles from './styles';

const ApplicationDetail = ({
  name,
  chainID,
  state,
  lastCertificateHeight,
  serviceURLs,
  lastUpdated,
  deposited,
  address,
  token,
}) => {
  const { styles } = useTheme({ styles: getStyles });
  return (
    <ScrollView contentContainerStyle={[styles.flex, styles.theme.container]}>
      <View style={[styles.logoContainer, styles.theme.logoContainer]}></View>
      <View style={[styles.flex, styles.body]}>
        <H3 style={[styles.title, styles.theme.title]}>{name}</H3>
        <P style={[styles.address, styles.theme.address]}>{address}</P>
        <View style={[styles.row, styles.appLinkContainer]}>
          <UrlSvg size={1.2} />
          <P style={styles.url}>{serviceURLs}</P>
        </View>
        <View style={[styles.row, styles.depositedContainer]}>
          <P style={styles.deposited}>Deposited: </P>
          <P
            style={styles.amount}
          >{`${deposited.toLocaleString()} ${token}`}</P>
        </View>
        <View style={styles.stats}>
          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>Chain ID </P>
              <P style={[styles.value, styles.theme.value]}>{chainID}</P>
            </View>
            <View style={styles.item}>
              <P style={styles.smallTitle}>Status </P>
              <View style={[styles.stateContainer, styles[`${state}Container`]]} >
                <P style={[styles.value, styles[state]]}>{state}</P>
              </View>
            </View>
          </View>
          <View style={styles.flex}>
            <View style={styles.item}>
              <P style={styles.smallTitle}>Last Updated </P>
              <P style={[styles.value, styles.theme.value]}>
                {moment(lastUpdated).format('Dd MMM YYYY')}
              </P>
            </View>
            <View style={styles.item}>
              <P style={styles.smallTitle}>Last Certificagte Height </P>
              <P style={[styles.value, styles.theme.value]}>{lastCertificateHeight}</P>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ApplicationDetail;
