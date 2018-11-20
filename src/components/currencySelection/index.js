import React from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';
import connect from 'redux-connect-decorator';
import { H1, P, B } from '../toolBox/typography';
import { currencyMap, currencyKeys } from '../../constants/currencies';
import { settingsUpdated as settingsUpdatedAction } from '../../actions/settings';
import withTheme from '../withTheme';
import getStyles from './styles';

@connect(state => ({
  settings: state.settings,
}), {
  settingsUpdated: settingsUpdatedAction,
})
class CurrencySelection extends React.Component {
  onSelect = currencyKey => this.props.settingsUpdated({
    currency: currencyKey,
  })

  render() {
    const { styles, settings: { currency } } = this.props;

    return (
      <View style={[styles.container, styles.theme.container]}>
        <H1 style={styles.theme.header}>
          Select Your Currency
        </H1>

        <B style={[styles.subHeader, styles.theme.subHeader]}>
          It will be shown across the app.
        </B>

        <FlatList
          extraData={currency}
          data={currencyKeys}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.onSelect(item)}>
              <View style={[styles.itemContainer, styles.theme.itemContainer]}>
                <P style={[styles.itemSymbol, styles.theme.itemSymbol]}>
                  {currencyMap[item].symbol}
                </P>

                <P style={[styles.itemLabel, styles.theme.itemLabel]}>
                  {currencyMap[item].label}
                </P>

                <P style={[styles.itemSelection, styles.theme.itemSelection]}>
                  {currency === item ? 'TICK' : ''}
                </P>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

export default withTheme(CurrencySelection, getStyles());
