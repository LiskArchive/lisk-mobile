# Lisk Mobile

[![Build Status](https://jenkins.lisk.io/buildStatus/icon?job=lisk-mobile/development)](https://jenkins.lisk.io/job/lisk-mobile/job/development)
[![Coverage Status](https://coveralls.io/repos/github/LiskHQ/lisk-mobile/badge.svg?branch=development)](https://coveralls.io/github/LiskHQ/lisk-mobile?branch=development)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
[![Join the chat at https://gitter.im/LiskHQ/lisk](https://badges.gitter.im/LiskHQ/lisk.svg)](https://gitter.im/LiskHQ/lisk?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)


Lisk Mobile is a cross-platform application written in React Native and primarily build for iOS and Android. It provides the users with all the functionality they need to send and receive LSK tokens, as well as reviewing the activity history of their or any other account in the Lisk blockchain.

[![Get it from iTunes](https://lisk.io/assets/svg/download_on_the_app_store_badge.svg)](https://itunes.apple.com/us/app/lisk/id1436809559?mt=8) [![Get it on Google Play](https://lisk.io/assets/svg/download_on_the_play_store_badge.svg)](https://play.google.com/store/apps/details?id=io.lisk.mobile&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

## For Contributors
Please see [CONTRIBUTING.md](/CONTRIBUTING.md) for more information.

## Development

### Pre-Installation
The next section details the prerequisites to install Lisk Mobile from source using the different tagged releases.


 - Git
   - `brew install git`
 - NodeJS (recommended 8.14.0)
   - `brew install node`
 - npm (recommended 5.3.0)
   - npm is shipped with NodeJS. but to have a specific version installed see [here](https://stackoverflow.com/questions/9755841/how-can-i-change-the-version-of-npm-using-nvm).
 - watchman
   - `brew install watchman`
 - react-native-cli
   - Install using npm

### iOS
You'll need the Xcode installed in your machine to run the app in simulator.

### Android
 - Install [Android Studio](https://developer.android.com/studio/index.html), which sould have these options checked installed:
   - Android SDK
   - Android SDK Platform
   - Performance (Intel ® HAXM)
   - Android Virtual Device
 - Install the Android SDK. Consider these configurations:
  - compileSdkVersion: 28
  - buildToolsVersion: 27.0.3


### Installation
```bash
$ git clone https://github.com/LiskHQ/lisk-mobile.git
$ cd lisk-mobile
$ npm install
$ npm run start
```

### Development environment
You can run the project in Xcode and use iOS simulators or alternatively use Android simulators. There are several options to set up your Android development environment. Please read [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for more info.

Three is a standalone app for debugging React Native. it has React and Redux debugger enabled by default. Please read  [React Native Debugger](https://github.com/jhen0409/react-native-debugger) for more info.

#### Environment variables
You can fill out `env.json` with those variables:
```
network             -> Lisk network's name, can be mainnet or testnet.
passphrase          -> Passphrase of your LSK account, to be filled out automatically on login.
secondPassphrase    -> Second passphrase of your LSK account, to be filled out automatically on send process.
useCommercialFonts  -> Tells styleGuide/fonts.js file to load commercial fonts instead of Open Sans.
```

In order to avoid commiting that file you can follow [this approach](https://stackoverflow.com/a/3320183) as following
```bash
$ git update-index --assume-unchanged env.json
```

#### Using Commercial Fonts
Since some of the fonts used in the production version are commercial, this repository only contains open source fonts and uses `Open Sans` as a replacement for the commercial ones.

If you have licensed copies of `Basier Circle` and `Gilroy`, you can add them to [fonts folder](./src/assets/fonts) with the naming convention stated in [`styleGuide/fonts.js`](./src/constants/styleGuide/fonts.js) file and make sure all the fonts are linked.

```bash
$ react-native link ./src/assets/fonts
```

#### Run
```bash
$ npm start
```

#### Build - iOS
```bash
$ npm run build:ios
```

#### Build - Android
```bash
$ npm run build:android
```

### Unit Tests

#### Single run
```bash
$ npm run test
```

## iMessage Extension
Please check out [iMessage extension docs](ios/LiskMessageExtension/README.md) for more information.

## Contributors
See [contributors section](https://github.com/LiskHQ/lisk-mobile/graphs/contributors).

## License

Copyright © 2016-2018 Lisk Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the [GNU General Public License](https://github.com/LiskHQ/lisk-hub/tree/master/LICENSE) along with this program.  If not, see <http://www.gnu.org/licenses/>.
