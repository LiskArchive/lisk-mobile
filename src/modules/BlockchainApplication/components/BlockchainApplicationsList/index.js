import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import InfiniteScrollView from 'components/shared/infiniteScrollView';
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
 * @param {Array} applications - Blockchain applications to list.
 */
function BlockchainApplicationsList({ t, applications }) {
  const { theme, styles } = useTheme({ styles: getBlockchainApplicationsListStyles() });

  const { term, setTerm } = useSearch();

  const extraHeight = deviceType() === 'android' ? 170 : 0;

  return (
    <KeyboardAwareScrollView
      viewIsInsideTab
      enableOnAndroid={true}
      enableResetScrollToCoords={false}
      extraHeight={extraHeight}
    >
      <InfiniteScrollView
        scrollEventThrottle={8}
        style={[styles.scrollView]}
        refresh={() => console.log('on refresh...')}
        loadMore={() => console.log('on load more...')}
        list={applications.data}
        count={applications.data?.length}
        render={(refreshing) => {
          console.log({ refreshing });

          return applications.data?.length > 0 ? (
            <View style={[styles.innerContainer, styles.theme.innerContainer]}>
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
                  placeholderTextColor={theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray}
                  onChange={(value) => setTerm(value)}
                  value={term}
                  returnKeyType="search"
                />
              </View>

              <View style={styles.listContainer}>
                {applications.isLoading ? (
                  <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
                    {t('blockchainApplicationsList.loadingText')}
                  </P>
                ) : (
                  applications.data.map((application) => (
                    <BlockchainApplicationRow key={application.chainID} application={application} />
                  ))
                )}
              </View>
            </View>
          ) : (
            <P>Empty apps view.</P>
          );
        }}
      />
    </KeyboardAwareScrollView>
  );
}

export default translate()(BlockchainApplicationsList);
