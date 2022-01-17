import React, { useMemo } from 'react';
import { View, SafeAreaView, ScrollView, Linking } from 'react-native';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { B, P } from '../../shared/toolBox/typography';
import withTheme from '../../shared/withTheme';
import HeaderBackButton from '../router/headerBackButton';
import getStyles from './styles';
import InfoComponent from '../../shared/infoComponent';
import Avatar from '../../shared/avatar';
import { stringShortener } from '../../../utilities/helpers';
import { colors } from '../../../constants/styleGuide';

const MultiSignature = ({
  t, styles, navigation, multiSigAccount
}) => {
  const memberList = useMemo(() => multiSigAccount?.members, [multiSigAccount]);
  const numberOfSignatures = useMemo(() => multiSigAccount?.numberOfSignatures, [multiSigAccount]);

  const openLiskDesktopDownload = () => Linking.openURL('https://lisk.com/wallet')

  return (
    <SafeAreaView style={styles.theme.container}>
      <HeaderBackButton
        noIcon
        title="Multisignature account details"
        onRightPress={navigation.goBack}
        rightIcon={'cross'}
        rightColor={colors.light.ultramarineBlue}
      />
      <ScrollView>
        <View style={[styles.container]}>
          <P style={[styles.copy, styles.theme.copy]}>{t('multisignature.copy1')}</P>
          <P style={[styles.copy, styles.theme.copy]}>{t('multisignature.copy2')}</P>
          <InfoComponent
            text={t('multisignature.info.copy')}
            buttonText={t('multisignature.info.button')}
            onPress={openLiskDesktopDownload}
          />
          <View>
            <View style={[styles.signatureListContainer, styles.theme.signatureListContainer]} >
            {memberList?.map((member, i) => (
              <View key={member.address} style={[styles.row, styles.signatureList]} >
                <P style={styles.theme.light} >{i + 1}.</P>
                <View style={styles.avatarContainer} >
                <Avatar address={member.address} size={40} />
                  </View>
                <View style={styles.row} >
                  <View style={styles.detailsContainer} >
                    <B style={styles.theme.copy} >{stringShortener(member.address, 7, 5)}</B>
                    <P style={styles.theme.light}>{stringShortener(member.publicKey, 5, 4)}</P>
                  </View>
                <P style={styles.theme.copy} >
                  {member.isMandatory
                    ? `(${t('multisignature.mandatory')})`
                    : `(${t('multisignature.optional')})`}
                </P>
              </View>
              </View>
            ))}
            </View>
            <View>
              <B style={[styles.theme.copy, styles.requiredTitle]} >{t('multisignature.required')}</B>
              <P style={styles.theme.copy} >{numberOfSignatures}</P>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const mapStateToProps = (state) => ({
  multiSigAccount: state.accounts.info?.LSK?.keys ?? {}
});

export default connect(mapStateToProps)(withTheme(translate()(MultiSignature), getStyles()));
