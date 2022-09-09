import React from 'react'
import { View, TouchableHighlight, FlatList } from 'react-native'
import connect from 'redux-connect-decorator'
import { currencyMap, currencyKeys } from 'constants/currencies'
import { colors } from 'constants/styleGuide'
import { P } from 'components/shared/toolBox/typography'
import Icon from 'components/shared/toolBox/icon'
import withTheme from 'components/shared/withTheme'
import { settingsUpdated as settingsUpdatedAction } from 'modules/Settings/actions'
import getStyles from './styles'

@connect(
  (state) => ({
    settings: state.settings,
  }),
  {
    settingsUpdated: settingsUpdatedAction,
  }
)
class CurrencySelection extends React.Component {
  onSelect = (currency) => this.props.settingsUpdated({ currency })

  render() {
    const {
      styles,
      theme,
      settings: { currency },
    } = this.props

    return (
      <View style={[styles.container, styles.theme.container]}>
        <FlatList
          extraData={currency}
          data={currencyKeys}
          renderItem={({ item }) => (
            <TouchableHighlight onPress={() => this.onSelect(item)} underlayColor="transparent">
              <View style={[styles.itemContainer, styles.theme.itemContainer]}>
                <P style={styles.theme.itemLabel}>{currencyMap[item].label}</P>

                <View style={styles.itemSelection}>
                  {currency === item ? (
                    <Icon
                      name="checkmark"
                      color={colors[theme].ultramarineBlue}
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
    )
  }
}

export default withTheme(CurrencySelection, getStyles())
