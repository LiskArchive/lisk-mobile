import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import MultiSignature from 'components/screens/multiSignature';
import { LockedBalanceDetails } from 'modules/Accounts/components';

import { getNavigationHeaderOptions } from '../../helpers';
import Tabs from '../Tabs';

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal">
      <Stack.Screen name="Home" component={Tabs} options={getNavigationHeaderOptions} />
      <Stack.Screen
        name="LockedBalance"
        component={LockedBalanceDetails}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
      <Stack.Screen
        name="Multisignature"
        component={MultiSignature}
        options={{
          headerShown: false,
          transitionSpec: {
            open: config,
            close: config,
          },
        }}
      />
    </Stack.Navigator>
  );
}
