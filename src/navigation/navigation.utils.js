/* eslint-disable max-statements */
import React from 'react';
import { validator } from '@liskhq/lisk-client';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getStateFromPath } from '@react-navigation/core';
import { View } from 'react-native';

import TabBarIcon from './components/TabBarIcon';
import navigationOptions from './navigation.options';
import { WHITE_LISTED_DEEP_LINKS } from './navigation.constants';

export function getNavigationHeaderOptions({ route }) {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'AccountHome';
  return navigationOptions[routeName];
}

export function getTabBarIcon({ route }) {
  return {
    tabBarIcon: (props) => {
      return (
        <View testID={`${route.name}-tab`}>
          <TabBarIcon focused={props.focused} name={route.name} />
        </View>
      );
    },
  };
}

export function validateDeepLink(url) {
  const { protocol, searchParams, hostname } = new URL(url);
  if (protocol !== 'lisk:') return false;

  const foundLink = WHITE_LISTED_DEEP_LINKS.find(({ pathRegex }) => pathRegex.test(hostname));
  if (!foundLink) return false;

  const searchParamObject = [...searchParams.entries()].reduce(
    (result, [key, value]) => ({ ...result, [key]: value }),
    {}
  );

  const isSearchParamsValid = Object.keys(searchParamObject).reduce((result, key) => {
    const schemaValue = !!foundLink.validationSchema.properties[key];
    if (!schemaValue || !result) return false;
    return true;
  }, true);

  if (!isSearchParamsValid) return false;

  try {
    let queryParams = searchParamObject;

    if (foundLink.paramsTransformer) {
      queryParams = foundLink.paramsTransformer(searchParamObject);
    }

    validator.validator.validate(foundLink.validationSchema, queryParams);
  } catch {
    return false;
  }

  return true;
}

export function getNavigationStateFromPath(path, options) {
  const url = 'lisk://' + path; // Add the protocol back to the path

  if (!validateDeepLink(url)) {
    // If the URL is invalid, return the state for the error screen
    return {
      routes: [
        {
          name: 'NotFound',
        },
      ],
    };
  }

  // Otherwise, return the state for the actual path
  return getStateFromPath(path, options);
}
