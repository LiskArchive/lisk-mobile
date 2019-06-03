import React from 'react';
import { View, FlatList } from 'react-native';
import { translate } from 'react-i18next';
import connect from 'redux-connect-decorator';
import { B, P } from '../toolBox/typography';
import Icon from '../toolBox/icon';
import { tokenMap, tokenKeys } from '../../constants/tokens';
import { settingsUpdated as settingsUpdatedAction } from '../../actions/settings';
import { colors } from '../../constants/styleGuide';
import withTheme from '../withTheme';
import getStyles from './styles';
import SwitchButton from '../toolBox/switchButton';
import { merge } from '../../utilities/helpers';

@connect(state => ({
  settings: state.settings,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class ManageAssets extends React.Component {
  onSelect = (value, key) => {
    const { settings: { token } } = this.props;
    this.props.settingsUpdated({
      token: merge(token, {
        list: merge(token.list, { [key]: value }),
      }),
    });
  }

  render() {
    const {
      styles, theme, settings: { token }, t,
    } = this.props;
    return (
      <View style={[styles.container, styles.theme.container]}>
        <FlatList
          extraData={token.active}
          data={tokenKeys}
          renderItem={({ item }) => (
            <View
              onPress={() => this.onSelect(item)}
              underlayColor='transparent'
            >
              <View style={[styles.itemContainer, styles.theme.itemContainer]}>
                <View style={{ flexDirection: 'row' }}>
                  <View style={styles[`${item}Container`]}>
                    <Icon
                      color={colors.light.white}
                      name={tokenMap[item].icon}
                      size={25}
                      style={{ textAlign: 'center' }}
                    />
                  </View>

                  <B style={[styles.itemLabel, styles.theme.itemLabel]}>
                    {tokenMap[item].label} ({tokenMap[item].key})
                  </B>
                </View>

                <View>
                  {item === tokenMap.LSK.key ? (
                    <P style={styles.theme.description}>
                      {t('Primary')}
                    </P>
                  ) : (
                    <SwitchButton
                      value={token.list[tokenMap[item].key]}
                      theme={theme}
                      onSyncPress={(value) => { this.onSelect(value, tokenMap[item].key); }}
                    />
                  )}
                </View>
              </View>
            </View>
          )}
        />
      </View>
    );
  }
}

export default withTheme(translate()(ManageAssets), getStyles());
