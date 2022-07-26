/* eslint-disable no-nested-ternary */
import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { deviceType } from 'utilities/device';
import { colors, themes } from 'constants/styleGuide';
import Input from 'components/shared/toolBox/input';
import Icon from 'components/shared/toolBox/icon';
import { useSearch } from 'hooks/useSearch';
import BlockchainApplicationRow from '../BlockchainApplicationRow';

import getBlockchainApplicationsListStyles from './styles';

/**
 * Renders a paginated list of blockchain applications, where users can search for them.
 * @param {Object} applications - Blockchain applications query result.
 */
function BlockchainApplicationsList({ t, applications }) {
  const { theme, styles } = useTheme({ styles: getBlockchainApplicationsListStyles() });

  const { term, setTerm } = useSearch();

  const extraHeight = deviceType() === 'android' ? 170 : 0;

  const renderData = () => {
    if (applications.isLoading) {
      return <P style={[styles.listContainer]}>{t('blockchainApplicationsList.loadingText')}</P>;
    }

    if (applications.isError) {
      return <P style={[styles.listContainer]}>{t('blockchainApplicationsList.errorText')}</P>;
    }

    if (applications.data?.length === 0) {
      return <P style={[styles.listContainer]}>{t('blockchainApplicationsList.emptyText')}</P>;
    }

    return (
      <>
        {applications.data.map((application) => (
          <BlockchainApplicationRow key={application.chainID} application={application} />
        ))}
      </>
    );
  };

  return (
    <KeyboardAwareScrollView
      viewIsInsideTab
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      extraHeight={extraHeight}
    >
      <View style={styles.searchContainer}>
        <Icon
          style={styles.searchIcon}
          name="search"
          size={18}
          color={theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray}
        />
        <Input
          placeholder={t('blockchainApplicationsList.searchPlaceholder')}
          autoCorrect={false}
          autoFocus
          innerStyles={{
            input: [styles.input],
            containerStyle: [styles.inputContainer],
          }}
          placeholderTextColor={
            theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
          }
          onChange={(value) => setTerm(value)}
          value={term}
          returnKeyType="search"
          disabled={
            applications.isLoading || applications.isFetching || applications.data?.length === 0
          }
        />
      </View>

      <View style={styles.listContainer}>{renderData()}</View>
    </KeyboardAwareScrollView>
  );
}

export default translate()(BlockchainApplicationsList);
