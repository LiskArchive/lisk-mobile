import React from 'react';
import { FlatList, View } from 'react-native';
import i18next from 'i18next';
import { useTheme } from 'hooks/useTheme';
import { useSearch } from 'hooks/useSearch';
import { P } from 'components/shared/toolBox/typography';
import { colors, themes } from 'constants/styleGuide';
import Input from 'components/shared/toolBox/input';
import Icon from 'components/shared/toolBox/icon';
import getBlockchainApplicationsListStyles from './styles';

export default function ApplicationList({
  applications,
  Component,
  onItemPress,
  navigation,
  style,
  ...props
}) {
  const { theme, styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  const { term, setTerm } = useSearch();

  return (
    <View style={[styles.container, styles.theme.container, style?.container]}>
      <Input
        placeholder={i18next.t('application.explore.applicationList.searchPlaceholder')}
        autoCorrect={false}
        autoFocus
        innerStyles={{ input: [styles.input] }}
        placeholderTextColor={
          theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray
        }
        onChange={(value) => setTerm(value)}
        value={term}
        returnKeyType="search"
        adornments={{
          left: (
            <Icon
              name="search"
              size={18}
              color={theme === themes.dark ? colors.dark.mountainMist : colors.light.blueGray}
            />
          ),
        }}
      />

      <View style={[styles.body, style?.body]}>
        {applications.isLoading ? (
          <P
            style={[
              styles.applicationNameLabel,
              styles.theme.applicationNameLabel,
              style?.applicationNameLabel,
            ]}
          >
            {i18next.t('application.explore.applicationList.loadingText')}
          </P>
        ) : (
          <FlatList
            data={applications.data}
            keyExtractor={(item) => item.chainID}
            renderItem={({ item }) => (
              <Component
                application={item}
                navigation={navigation}
                key={item.chainID}
                image={item.logo.png}
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
