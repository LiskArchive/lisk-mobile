import React from 'react';
import { View, Image } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { translate } from 'react-i18next';

import { useTheme } from 'hooks/useTheme';
import { P } from 'components/shared/toolBox/typography';
import { deviceType } from 'utilities/device';
import { colors, themes } from 'constants/styleGuide';
import Input from 'components/shared/toolBox/input';
import Icon from 'components/shared/toolBox/icon';
import Swipeable from 'components/shared/Swipeable';
import PinSvg from 'assets/svgs/PinSvg';
import { useSearch } from 'hooks/useSearch';
import CaretSvg from 'assets/svgs/CaretSvg';
import { usePinBlockchainApplication } from '../../hooks/usePinBlockchainApplication';

import getBlockchainApplicationsListStyles from './styles';

function BlockchainApplicationsList({ t, applications }) {
  const { theme, styles } = useTheme({ styles: getBlockchainApplicationsListStyles() });

  const { togglePin } = usePinBlockchainApplication();

  const { term, setTerm } = useSearch();

  const extraHeight = deviceType() === 'android' ? 170 : 0;

  return (
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
              <Swipeable
                key={application.chainID}
                leftActions={[
                  {
                    title: !application.isPinned
                      ? t('blockchainApplicationsList.pinText')
                      : t('blockchainApplicationsList.unpinText'),
                    color: colors.light.ufoGreen,
                    icon: () => (
                      <PinSvg color={colors.light.white} variant={!application.isPinned ? 'outline' : 'closed'} />
                    ),
                    onPress: () => togglePin(application.chainID),
                  },
                ]}
              >
                <View key={application.chainID} style={styles.applicationContainer}>
                  <View style={styles.applicationNameContainer}>
                    <Image source={{ uri: application.images.logo.png }} style={{ ...styles.applicationLogoImage }} />

                    <P style={[styles.applicationNameLabel, styles.theme.applicationNameLabel]}>{application.name}</P>
                  </View>

                  <View style={styles.applicationNameContainer}>
                    {application.isPinned && (
                      <PinSvg color={colors.light.ultramarineBlue} style={{ marginRight: 12 }} variant="fill" />
                    )}

                    <CaretSvg
                      direction="right"
                      color={theme === themes.light ? colors.light.zodiacBlue : colors.dark.white}
                    />
                  </View>
                </View>
              </Swipeable>
            ))
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

export default translate()(BlockchainApplicationsList);
