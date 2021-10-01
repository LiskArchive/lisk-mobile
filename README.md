# Lisk Mobile

[![Build Status](https://jenkins.lisk.io/buildStatus/icon?job=lisk-mobile/development)](https://jenkins.lisk.io/job/lisk-mobile/job/development)
[![Coverage Status](https://coveralls.io/repos/github/LiskHQ/lisk-mobile/badge.svg?branch=development)](https://coveralls.io/github/LiskHQ/lisk-mobile?branch=development)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
![GitHub package.json version](https://img.shields.io/github/package-json/v/LiskHQ/lisk-mobile)
[![DeepScan grade](https://deepscan.io/api/teams/6759/projects/8872/branches/113512/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6759&pid=8872&bid=113512)
[![dependencies Status](https://david-dm.org/liskHQ/lisk-mobile/status.svg)](https://david-dm.org/liskHQ/lisk-mobile)
[![devDependencies Status](https://david-dm.org/liskHQ/lisk-mobile/dev-status.svg)](https://david-dm.org/liskHQ/lisk-mobile?type=dev)

Lisk Mobile is a cross-platform application written in React Native and primarily build for iOS and Android. It provides the users with all the functionality they need to send and receive LSK tokens, as well as reviewing the activity history of their or any other account in the Lisk blockchain.

[![Get it from iTunes](https://lisk.com/sites/default/files/pictures/2020-01/download_on_the_app_store_badge.svg)](https://itunes.apple.com/us/app/lisk/id1436809559?mt=8) [![Get it on Google Play](https://lisk.com/sites/default/files/pictures/2020-01/download_on_the_play_store_badge.svg)](https://play.google.com/store/apps/details?id=io.lisk.mobile&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

## For Contributors
Please see [CONTRIBUTING.md](/CONTRIBUTING.md) for more information.

## Development

### Pre-Installation
The next section details the prerequisites to install Lisk Mobile from source using the different tagged releases.


 - Git
   - `brew install git`
 - NodeJS (recommended 12.4.0)
   - `brew install nvm`
 - npm (recommended 6.9.0)
   - npm is shipped with NodeJS. but to have a specific version installed see [here](https://stackoverflow.com/questions/9755841/how-can-i-change-the-version-of-npm-using-nvm).
 - watchman
   - `brew install watchman`

### iOS
- Install the latest version of [Xcode](https://apps.apple.com/ng/app/xcode/id497799835?mt=12)

### Android
 - Install [Android Studio](https://developer.android.com/studio/index.html), which sould have these options checked installed:
   - Android SDK
   - Android SDK Platform
   - Performance (Intel ® HAXM)
   - Android Virtual Device
 - Install the Android SDK. Consider these configurations:
  - compileSdkVersion: 30
  - buildToolsVersion: 30.0.2


### Installation

```bash
$ git clone https://github.com/LiskHQ/lisk-mobile.git
$ cd lisk-mobile
$ nvm install
$ npm ci
$ npm run link
```

For Mac Users, to run on ios, you have to install pods. Run:
```
$ npx pod-install
$ npm run ios
```
To run android:
```
$ npm run android
```

### Development environment
You can run the project in Xcode and use iOS simulators or alternatively use Android simulators. There are several options to set up your Android development environment. Please read [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for more info.

There is a standalone app for debugging React Native. it has React and Redux debugger enabled by default. Please read  [React Native Debugger](https://github.com/jhen0409/react-native-debugger) for more info.

### Possible Errors for Mac Users
#### `lottie-ios/Lottie.modulemap`
```
/Users/***/Library/Developer/Xcode/DerivedData/Lisk-***/Build/Products/Debug-iphonesimulator/lottie-ios/Lottie.modulemap
```
- Add the following to the end of your Podfile (especially M1 users)
```
post_install do |installer|
  react_native_post_install(installer)
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings["ONLY_ACTIVE_ARCH"] = "NO"
        end
    end
end
```
- Remove Pods folder and Podfile.lock ```rm -rf ios/Pods && rm -rf ios/Podfile.lock```
- ```npx pod-install```

#### `Duplicate symbols for architecture x86_64`
```
Products/Debug-iphonesimulator/react-native-udp/libreact-native-udp.a(GCDAsyncUdpSocket.o)
ld: 144 duplicate symbols for architecture x86_64
```
- Run ```npx patch-package```
- Remove Pods folder and Podfile.lock ```rm -rf ios/Pods && rm -rf ios/Podfile.lock```
- ```npx pod-install```

### Other Possible Error
#### `SDK location not found. `
Create `android/local.properties` and add this line in the file for Mac Users:
```
sdk.dir=/Users/username/Library/Android/sdk
```
OR
Set the environmental PATH to your sdk installation location.


#### Environment variables
You can fill out `env.json` with those variables:
```
network             -> Lisk network's name, can be mainnet or testnet.
passphrase          -> Passphrase of your LSK account, to be filled out automatically on login.
secondPassphrase    -> Second passphrase of your LSK account, to be filled out automatically on send process.
useCommercialFonts  -> Tells styleGuide/fonts.js file to load commercial fonts instead of Open Sans.
```

In order to avoid committing that file you can follow [this approach](https://stackoverflow.com/a/3320183) as following
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
