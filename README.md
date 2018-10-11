# Lisk Mobile
Lisk Mobile is a cross-platform application written in React Native and primarily build for iOS and Android. It provides the users with all the functionality they need to send and receive LSK tokens, as well as reviewing the activity history of their or any other account in the Lisk blockchain.

## For Contributors
Please see [CONTRIBUTING.md](/CONTRIBUTING.md) for more information.
## Development

### Pre-Installation
The next section details the prerequisites to install Lisk Mobile from source using the different tagged releases.


 - Git
   - `brew install git` 
 - NodeJS (recommended 6.11.0)
   - `brew install node`
 - npm (recommended 4.5.0)
   - npm is shipped with NodeJS. but to have a specific version installed see [here](https://stackoverflow.com/questions/9755841/how-can-i-change-the-version-of-npm-using-nvm).
 - watchman
   - `brew install watchman`
 - react-native-cli
   - Install using npm

### iOS
You'll need the xCode installed in your machine to run the app in simulator.

### Android
 - Install [Android Studio](https://developer.android.com/studio/index.html), which sould have these options checked installed:
   - Android SDK
   - Android SDK Platform
   - Performance (Intel ® HAXM)
   - Android Virtual Device
 - Install the Android SDK. Consider these configurations:
  - compileSdkVersion: 26
  - buildToolsVersion: 27.0.3

 


### Installation

```
git clone https://github.com/LiskHQ/lisk-mobile.git
cd lisk-mobile
npm install
npm run start
```

### Development environment
You can run the project in xCode and use iOS simulators or alternatively use Android simulators. There are several options to set up your Android development environment. please read [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for more info.

### Run
```
npm start
```

### Build
For iOS

```
npm run build:ios
```


For Android

```
npm run build:android
```

## Run unit tests

### Single run
```
npm run test
```


## Contributors
See [contributors section](https://github.com/LiskHQ/lisk-mobile/graphs/contributors).

## License

Copyright © 2016-2018 Lisk Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/LiskHQ/lisk-hub/tree/master/LICENSE) along with this program.  If not, see <http://www.gnu.org/licenses/>.

