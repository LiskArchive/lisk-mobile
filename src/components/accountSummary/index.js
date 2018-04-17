import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { PricingCard } from 'react-native-elements';
import Avatar from '../avatar';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';

export default ({ account }) => (<View>
    {
      account ?
      <View style={styles.container}>
        <Avatar address={account.address}/>
        <Text style={styles.address}>{ account.address }</Text>
        <Text style={styles.title}>Balance :</Text>
        <Text style={styles.balance}>
          <Text style={styles.value}>{ fromRawLsk(account.balance) }</Text>
          <Text style={styles.unit}>LSK</Text>
        </Text>
      </View> :
      <Text h4>Fetching account info</Text>
    }
  </View>);
