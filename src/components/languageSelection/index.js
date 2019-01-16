import React from 'react';
import { View, TouchableHighlight, FlatList } from 'react-native';
import connect from 'redux-connect-decorator';
import { P } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { languageMap, languageKeys } from '../../constants/languages';
import { settingsUpdated as settingsUpdatedAction } from '../../actions/settings';
import { colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  settings: state.settings,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class LanguageSelection extends React.Component {
  onSelect = language => this.props.settingsUpdated({ language })

  render() {
    const { styles, theme, settings: { language } } = this.props;

    return (
      <View style={[styles.container, styles.theme.container]}>
        <FlatList
          extraData={language}
          data={languageKeys}
          renderItem={({ item }) => (
            <TouchableHighlight
              onPress={() => this.onSelect(item)}
              underlayColor={colors[theme].boxBg}
            >
              <View style={[styles.itemContainer, styles.theme.itemContainer]}>
                <P style={styles.theme.itemLabel}>
                  {languageMap[item].label}
                </P>

                <View style={styles.itemSelection}>
                  {language === item ? (
                    <Icon
                      name="checkmark"
                      color={colors[theme].blue}
                      size={20}
                      style={{
                        width: 26,
                        height: 20,
                      }}
                    />
                  ) : null}
                </View>
              </View>
            </TouchableHighlight>
          )}
        />
      </View>
    );
  }
}

export default withTheme(LanguageSelection, getStyles());
