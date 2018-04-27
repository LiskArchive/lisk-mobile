import React from 'react';
import { View } from 'react-native';
import Search from '../search';
import FollowedAccounts from '../followedAccounts';

const Explore = ({ navigation }) =>
  <View>
    <Search navigation={navigation} />
    <FollowedAccounts navigation={navigation} />
  </View>;

export default Explore;
