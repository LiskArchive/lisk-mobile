/* eslint-disable max-statements */
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useTheme } from 'contexts/ThemeContext';
import { P } from 'components/shared/toolBox/typography';
import Avatar from 'components/shared/avatar';
import { stringShortener } from 'utilities/helpers';
import { colors } from 'constants/styleGuide';
import SwitchSvg from 'assets/svgs/SwitchSvg';
import CopyToClipboard from 'components/shared/CopyToClipboard/CopyToClipboard';
import DiscreteModeComponent from 'components/shared/DiscreteModeComponent';
import useAccountManagerModal from '../../hooks/useAccountManagerModal';

import { useCurrentAccount } from '../../hooks/useCurrentAccount';

import getAccountDetailsStyles from './AccountCard.styles';
import useLegacyAccount from '../../api/useLegacyAccount';
import { fromBeddowsToLsk } from '../../../../utilities/conversions.utils';
import Skeleton from '../../../../components/shared/Skeleton/Skeleton';

export default function AccountCard({ account }) {
  const accountManager = useAccountManagerModal();

  const [currentAccount] = useCurrentAccount();

  const {
    data: legacyAccount,
    isLoading: isLoadingLegacyAccount,
    isError: isErrorLegacyAccount,
  } = useLegacyAccount();

  const { styles } = useTheme({ styles: getAccountDetailsStyles() });

  const isCurrentAccount = currentAccount.metadata.address === account.address;

  const balance = fromBeddowsToLsk(legacyAccount?.token?.availableBalance || 0);

  return (
    <LinearGradient
      colors={[colors.light.ultramarineBlue, colors.light.inkBlue]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={[styles.container]}
    >
      <View style={[styles.row]}>
        <Avatar address={account.address} size={48} />

        <View style={[styles.detailsContainer]}>
          <View style={styles.row}>
            {account.name && (
              <P style={[styles.usernameText, styles.theme.usernameText]} testID="username-label">
                {account.name}
              </P>
            )}
          </View>

          <View>
            <CopyToClipboard
              key={account.address}
              value={account.address}
              labelStyle={[styles.addressText, styles.theme.addressText]}
              label={stringShortener(account.address, 7, 6)}
              iconColor={colors.light.platinumGray}
              testID="address-copy-to-clipboard"
            />
          </View>
        </View>

        {isCurrentAccount && (
          <TouchableOpacity
            style={[styles.switchContainer]}
            onPress={accountManager.open}
            testID="switch-account"
          >
            <SwitchSvg />
          </TouchableOpacity>
        )}
      </View>

      <View style={[styles.balanceContainer]}>
        <P style={[styles.balanceLabel, styles.theme.balanceLabel]}>Your balance</P>
        {isLoadingLegacyAccount && !isErrorLegacyAccount ? (
          <Skeleton
            width={144}
            height={32}
            style={{ container: { borderRadius: 4, marginTop: 8, opacity: 0.2 } }}
          />
        ) : (
          <DiscreteModeComponent
            data={balance}
            blurVariant="balance"
            style={{ opacity: 0.2, marginTop: 16 }}
          >
            <P style={[styles.balanceText, styles.theme.balanceText]}>{balance} LSK</P>
          </DiscreteModeComponent>
        )}
      </View>
    </LinearGradient>
  );
}
