import React, { Fragment } from 'react';
import { Text, View, Image } from 'react-native';
import i18next from 'i18next';

import { useTheme } from 'contexts/ThemeContext';
import { useApplicationSupportedTokensQuery } from 'modules/BlockchainApplication/api/useApplicationSupportedTokensQuery';
import Picker from 'components/shared/Picker';
import InfiniteScrollList from 'components/shared/InfiniteScrollList';
import Skeleton from 'components/shared/Skeleton/Skeleton';
import DataRenderer from 'components/shared/DataRenderer';
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

  const { styles } = useTheme({ styles: getStyles() });

  const selectedToken = supportedTokensData?.find((token) => token.tokenID === value);

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
      </View>

      <DataRenderer
        data={supportedTokensData}
        isLoading={isLoadingSupportedTokens}
        error={isSupportedTokensError}
        renderData={() => (
          <Picker.Toggle style={style?.toggle} openMenu={showOptions}>
            <View style={[styles.row]} testID="select-token-picker">
              {selectedToken && (
                <Fragment>
                  <Text style={[styles.text, styles.theme.text]}>{selectedToken.symbol}</Text>
                  <Image source={{ uri: selectedToken.logo?.png }} style={styles.logo} />
                </Fragment>
              )}
            </View>
          </Picker.Toggle>
        )}
        renderLoading={() => (
          <Skeleton height={48} width={deviceWidth() - 44} style={{ container: styles.skeleton }} />
        )}
      />
    </Picker>
  );
}
