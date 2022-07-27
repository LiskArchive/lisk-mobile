import React from 'react';
import { FlatList, View } from 'react-native';
import { translate } from 'react-i18next';
import { useTheme } from 'hooks/useTheme';
import { useSearch } from 'hooks/useSearch';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Input from 'components/shared/toolBox/input';
import Icon from 'components/shared/toolBox/icon';
import getBlockchainApplicationsListStyles from './styles';

function ApplicationList({ t, applications, Component, onItemPress, ...props }) {
  const { theme, styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  const { term, setTerm } = useSearch();

  return (
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
          placeholderTextColor={
            theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
          }
          onChange={(value) => setTerm(value)}
          value={term}
          returnKeyType="search"
        />
      </View>

      <View style={styles.body}>
        {applications.isLoading ? (
          <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>
            {t('blockchainApplicationsList.loadingText')}
          </P>
        ) : (
          <FlatList
            data={applications}
            keyExtractor={(item) => item.chainID}
            renderItem={({ item }) => (
              <Component
                application={item}
                key={item.chainID}
                image={item.images?.logo.png}
                showPinned={true}
                onPress={() => onItemPress(item)}
                {...props}
              />
            )}
          />
        )}
      </View>
    </View>
  );
}

export default translate()(ApplicationList);
