/* eslint-disable max-statements */
import React from 'react';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { getStateFromPath } from '@react-navigation/core';
import { View } from 'react-native';
import * as Lisk from '@liskhq/lisk-client';
import Url from 'url-parse';

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
  const parsedUrl = new Url(url, true);

  const match = parsedUrl.href.match(/lisk:(\/\/[\w|/]+)/);
  const pathname = match ? match[1] : null;

  const foundLink = WHITE_LISTED_DEEP_LINKS.find(({ pathRegex }) => pathRegex.test(pathname));

  if (!foundLink) return false;

  const isSearchParamsValid = Object.keys(parsedUrl.query).every(
    (key) => foundLink.validationSchema.properties[key]
  );

  if (!isSearchParamsValid) return false;

  let queryParams = parsedUrl.query;

  if (foundLink.paramsTransformer) {
    queryParams = foundLink.paramsTransformer(parsedUrl.query);
  }

  try {
    Lisk.validator.validator.validate(foundLink.validationSchema, queryParams);
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
