import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';
import { useTheme } from 'hooks/useTheme';
import { useSearch } from 'hooks/useSearch';
import { P } from 'components/shared/toolBox/typography';
import { deviceType } from 'utilities/device';
import { colors, themes } from 'constants/styleGuide';
import Input from 'components/shared/toolBox/input';
import Icon from 'components/shared/toolBox/icon';
import { useNavigation } from '@react-navigation/native';
import { useBlockchainApplicationManagement } from '../../hooks/useBlockchainApplicationManagement';
import getBlockchainApplicationsListStyles from './styles';
import ApplicationItem from '../ApplicationItem';

function ApplicationList({ t }) {
  const { theme, styles } = useTheme({
    styles: getBlockchainApplicationsListStyles(),
  });

  const { applications } = useBlockchainApplicationManagement();

  const { term, setTerm } = useSearch();

  const extraHeight = deviceType() === 'android' ? 170 : 0;

  const navigation = useNavigation();

  return (
    <View>
      <KeyboardAwareScrollView
        viewIsInsideTab
        enableOnAndroid={true}
        enableResetScrollToCoords={false}
        extraHeight={extraHeight}
      >
        <View style={[styles.innerContainer, styles.theme.innerContainer]}>
          <View style={styles.searchContainer}>
            <Icon
              style={styles.searchIcon}
              name="search"
              size={18}
              color={
                theme === themes.dark
                  ? colors.dark.mountainMist
                  : colors.light.blueGray
              }
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
                theme === themes.dark
                  ? colors.dark.mountainMist
                  : colors.light.blueGray
              }
              onChange={(value) => setTerm(value)}
              value={term}
              returnKeyType="search"
            />
          </View>

          <View style={styles.body}>
            {applications.isLoading ? (
              <P
                style={[
                  styles.applicationNameLabel,
                  styles.theme.applicationNameLabel,
                ]}
              >
                {t('blockchainApplicationsList.loadingText')}
              </P>
            ) : (
              applications.data.map((application) => (
                <ApplicationItem
                  application={application}
                  key={application.chainID}
                  image={application.images?.logo.png}
                  showPinned={true}
                  onPress={() =>
                    navigation.navigate('ApplicationDetail', {
                      chainID: application.chainID,
                    })
                  }
                />
              ))
            )}
          </View>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}

export default translate()(ApplicationList);
