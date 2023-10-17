import React from 'react';
import { Text, View, Image } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useCurrentAccount } from 'modules/Accounts/hooks/useCurrentAccount';
import { useAccountTokenBalancesQuery } from 'modules/Accounts/api/useAccountTokenBalancesQuery';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import Picker from 'components/shared/Picker';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import Skeleton from 'components/shared/Skeleton/Skeleton';
import DataRenderer from 'components/shared/DataRenderer';
import { fromBaseToDisplayDenom } from 'utilities/conversions.utils';
import { deviceWidth } from 'utilities/device';

import getStyles from './RequestTokenSelectField.styles';

export function RequestTokenSelectField({
  value,
  onChange,
  recipientApplication,
  errorMessage,
  style,
}) {
  const {
    data: supportedTokensData,
    isLoading: isLoadingSupportedTokens,
    isError: isSupportedTokensError,
  } = useApplicationSupportedTokensQuery(recipientApplication);

  const [currentAccount] = useCurrentAccount();

  const { data: tokenBalanceData } = useAccountTokenBalancesQuery(currentAccount.metadata.address, {
    params: { tokenID: value },
  });

  const { styles } = useTheme({ styles: getStyles() });

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === value);

  const tokenBalance =
    selectedToken && tokenBalanceData
      ? fromBaseToDisplayDenom({
          amount: tokenBalanceData?.data[0]?.availableBalance || 0,
          displayDenom: selectedToken.displayDenom,
          denomUnits: selectedToken.denomUnits,
          symbol: selectedToken.symbol,
          withSymbol: true,
          formatAmount: true,
        })
      : 0;

  const renderOptions = (data = supportedTokensData) => (
    <InfiniteScrollList
      data={data}
      keyExtractor={(item) => item.tokenID}
      renderItem={(item) => (
        <Picker.Item
          key={item.tokenID}
          value={item.tokenID}
          onChange={onChange}
          testID={`token-select-${item.symbol}`}
        >
          <Text style={[styles.theme.text]}>{item.symbol}</Text>
          <Image source={{ uri: item.logo.png }} style={styles.logo} />
        </Picker.Item>
      )}
    />
  );

  const { showOptions } = Picker.usePickerMenu(renderOptions());

  return (
    <Picker value={value} error={errorMessage}>
      <View style={{ ...styles.row, justifyContent: 'space-between' }}>
        <Picker.Label style={style?.label}>
          {i18next.t('sendToken.tokenSelect.tokenIDFieldLabel')}
        </Picker.Label>

        {selectedToken && (
          <Picker.Label style={style?.label}>
            {i18next.t('sendToken.tokenSelect.tokenIDBalanceLabel')}:{' '}
            <Text style={[styles.primaryText]}>{tokenBalance}</Text>
          </Picker.Label>
        )}
      </View>

      <DataRenderer
        data={supportedTokensData}
        isLoading={isLoadingSupportedTokens}
        error={isSupportedTokensError}
        renderData={() => (
          <Picker.Toggle style={style?.toggle} openMenu={showOptions}>
            {selectedToken && (
              <View style={[styles.row]} testID="select-token-picker">
                <Text style={[styles.text, styles.theme.text]}>{selectedToken.symbol}</Text>
                <Image source={{ uri: selectedToken.logo?.png }} style={styles.logo} />
              </View>
            )}
          </Picker.Toggle>
        )}
        renderLoading={() => (
          <Skeleton height={48} width={deviceWidth() - 44} style={{ container: styles.skeleton }} />
        )}
      />
    </Picker>
  );
}
