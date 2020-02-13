import React from 'react';
import {
  createStackNavigator,
  createAppContainer,
} from 'react-navigation';
import AddBookmark from '../addBookmark';
import HeaderBackground from './headerBackground';
import HeaderTitle from './headerTitle';
import HeaderPlaceholderButton from './headerPlaceholderButton';
import MainStack from './mainStack';

const MainNavigator = createStackNavigator(
  {
    Home: {
      screen: MainStack,
      navigationOptions: {
        headerStyle: {
          display: 'none',
        },
      },
    },
    AddBookmark: {
      screen: AddBookmark,
      navigationOptions: {
        headerTitle: props => <HeaderTitle {...props} />, //eslint-disable-line
        headerRight: HeaderPlaceholderButton,
        headerBackground: <HeaderBackground />,
        headerStyle: {
          overflow: 'hidden',
          elevation: 0,
        },
      },
    },
  },
  {
    mode: 'modal',
    cardStyle: {
      backgroundColor: 'transparent',
      opacity: 1,
    },
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default createAppContainer(MainNavigator);
