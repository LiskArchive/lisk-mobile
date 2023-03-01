import React from 'react';
import { View, FlatList, TouchableHighlight } from 'react-native';
import connect from 'redux-connect-decorator';
import { B, Small } from 'components/shared/toolBox/typography';
import Icon from 'components/shared/toolBox/icon';
import { tokenMap, tokenKeys } from 'constants/tokens';
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/store/actions';
import { colors } from 'constants/styleGuide';
import withTheme from 'components/shared/withTheme';
import FormatedNumber from 'components/shared/formattedNumber';
import { fromRawLsk } from 'utilities/conversions.utils';
import ModalHolder from 'utilities/modal';
import getStyles from './styles';

@connect(
  (state) => ({
    settings: state.settings,
    accounts: state.accounts.info,
  }),
  {
    settingsUpdated: settingsUpdatedAction,
  }
)
class AssetSelection extends React.Component {
  onSelect = (value) => {
    const {
      settings: { token },
      settingsUpdated,
    } = this.props;
    const updatedTokens = {
      list: token.list,
      active: value,
    };
    settingsUpdated({
      token: updatedTokens,
    });
    ModalHolder.close();
  };

  render() {
    const {
      styles,
      theme,
      settings: { token },
      accounts,
    } = this.props;
    return (
      <View style={[styles.container, styles.theme.container]}>
        <FlatList
          extraData={token.active}
          data={tokenKeys}
          renderItem={({ item, index }) => (
            <TouchableHighlight onPress={() => this.onSelect(item)} underlayColor="transparent">
              <View
                style={[
                  styles.itemContainer,
                  index !== tokenKeys.length - 1 ? styles.borderBottom : null,
                  styles.theme.itemContainer,
                ]}
              >
                <View style={styles.row}>
                  <View style={styles[`${item}Container`]}>
                    <Icon
                      color={colors[theme].white}
                      name={tokenMap[item].icon}
                      size={25}
                      style={styles.icon}
                    />
                  </View>
                  <View>
                    <B style={[styles.itemLabel, styles.theme.itemLabel]}>{tokenMap[item].label}</B>
                    <FormatedNumber
                      type={Small}
                      style={[styles.balance, styles.theme.balance]}
                      tokenType={item}
                      val={fromRawLsk(accounts[item].balance || 0)}
                    />
                  </View>
                </View>
                <View style={styles.switch}>
                  {item === token.active ? (
                    <Icon
                      color={colors[theme].ultramarineBlue}
                      name="checkmark"
                      size={20}
                      style={{ textAlign: 'center' }}
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

export default withTheme(AssetSelection, getStyles());
