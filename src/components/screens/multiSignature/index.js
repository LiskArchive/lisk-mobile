import React, { useMemo, useState } from 'react';
import {
  View, SafeAreaView, ScrollView, Linking
} from 'react-native';
import { translate } from 'react-i18next';
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
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
  const [showAll, setShowAll] = useState(false);
  const memberList = useMemo(
    () => multiSigAccount?.members,
    [multiSigAccount]
  );
  const numberOfSignatures = useMemo(() => multiSigAccount?.numberOfSignatures, [multiSigAccount]);

  const openLiskDesktopDownload = () => Linking.openURL('https://lisk.com/wallet');

  const listToShow = useMemo(
    () => (showAll ? memberList : memberList?.slice(0, 4)),
    [memberList, showAll]
  );

  return (
    <SafeAreaView style={styles.theme.container}>
      <HeaderBackButton
        noIcon
        title="Multisignature account details"
        onRightPress={navigation.goBack}
        rightIcon={'cross'}
        rightColor={colors.light.ultramarineBlue}
        containerStyle={styles.header}
      />
      <ScrollView>
        <View style={[styles.container]}>
          <P style={[styles.copy, styles.theme.copy]}>{t('multisignature.description1')}</P>
          <P style={[styles.copy, styles.theme.copy]}>
            {t('multisignature.description2', { numberOfSignatures })}
          </P>
          <View style={styles.infoContainer}>
            <InfoComponent
              text={t('multisignature.info.description')}
              buttonText={t('multisignature.info.button')}
              onPress={openLiskDesktopDownload}
            />
          </View>
          <View>
            <View style={[styles.signatureListContainer, styles.theme.signatureListContainer]}>
              {listToShow?.map((member, i) => (
                <View key={member.address} style={[styles.row, styles.signatureList]}>
                  <P style={[styles.number, styles.theme.light]}>{i + 1}.</P>
                  <View style={styles.avatarContainer}>
                    <Avatar address={member.address} size={40} />
                  </View>
                  <View style={styles.row}>
                    <View style={styles.detailsContainer}>
                      <B style={styles.theme.copy}>{stringShortener(member.address, 7, 5)}</B>
                      <P style={styles.theme.light}>{stringShortener(member.publicKey, 5, 4)}</P>
                    </View>
                    <P style={styles.theme.copy}>
                      {member.isMandatory
                        ? t('multisignature.mandatory')
                        : t('multisignature.optional')}
                    </P>
                  </View>
                </View>
              ))}
              {memberList?.length > 4 && !showAll && (
                <TouchableOpacity style={styles.moreButton} onPress={() => setShowAll(true)}>
                  <B style={[styles.theme.moreButton]}>{t('multisignature.showMore')}</B>
                </TouchableOpacity>
              )}
              {memberList?.length > 4 && showAll && (
                <TouchableOpacity style={styles.moreButton} onPress={() => setShowAll(false)}>
                  <B style={[styles.theme.moreButton]}>{t('multisignature.showLess')}</B>
                </TouchableOpacity>
              )}
            </View>
            <View>
              <B style={[styles.theme.copy, styles.requiredTitle]}>
                {t('multisignature.required')}
              </B>
              <P style={styles.theme.copy}>{numberOfSignatures}</P>
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
