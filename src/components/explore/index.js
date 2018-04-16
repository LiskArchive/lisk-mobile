import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Search from '../search';

const Explore = ({ navigation }) =>
  <View>
    <Search navigation={navigation} />
    {/* FollowedAccounts */}
  </View>

export default Explore;
