import React, { Fragment } from 'react';
import { View, Text } from 'react-native';
import { Divider } from 'react-native-elements';
import FormattedDate from '../formattedDate';
import { fromRawLsk } from '../../utilities/conversions';
import styles from './styles';

export default ({ account }) => (<View>
    {
      account ?
      <Fragment>
        <Text h4>Lisk ID :</Text>
        <Text>{ account.address }</Text>
        <Text h4>Balance :</Text>
        <Text>{ fromRawLsk(account.balance) }</Text>
      </Fragment> :
      <Text h4>Fetching account info</Text>
    }
  </View>);
