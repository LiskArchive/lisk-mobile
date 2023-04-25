![Logo](./src/assets/images/banner_mobile.png)
# Lisk Mobile

[![Build Status](https://jenkins.lisk.com/buildStatus/icon?job=lisk-mobile/development)](https://jenkins.lisk.com/job/lisk-mobile/job/development)
[![Coverage Status](https://coveralls.io/repos/github/LiskHQ/lisk-mobile/badge.svg?branch=development)](https://coveralls.io/github/LiskHQ/lisk-mobile?branch=development)
[![License: GPL v3](https://img.shields.io/badge/License-GPL%20v3-blue.svg)](http://www.gnu.org/licenses/gpl-3.0)
![GitHub package.json version](https://img.shields.io/github/package-json/v/LiskHQ/lisk-mobile)
[![DeepScan grade](https://deepscan.io/api/teams/6759/projects/8872/branches/113512/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=6759&pid=8872&bid=113512)

Lisk Mobile is a cross-platform application written in React Native and primarily built for iOS and Android. It provides the users with all the functionality they need to send and receive LSK tokens, as well as review the activity history of their or any other account on the Lisk blockchain.

[![Get it from iTunes](https://media.lisk.com/init/ios_app_store_a60c851728.png)](https://itunes.apple.com/us/app/lisk/id1436809559?mt=8) [![Get it on Google Play](https://media.lisk.com/init/google_store_912cd733ee.png)](https://play.google.com/store/apps/details?id=io.lisk.mobile&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1)

## Pre-Installation

The prerequisites to install and run Lisk Mobile from source using the different tagged releases are listed bellow. If you don't have them installed on your machine, please run the attached commands from your terminal.

- [Brew](https://brew.sh/)

  ```bash
  $ /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

- [Git](https://git-scm.com/)

  ```bash
  $ brew install git
  ```

- [Node.js](https://nodejs.org/en/) (recommended 14.9.0)

  ```bash
  $ brew install node
  ```

- [NVM](https://github.com/nvm-sh/nvm)

  ```bash
  $ brew install nvm
  ```

  Remember to follow Brew additional steps for enabling NVM fully. After running `brew install nvm`, Brew will detail this steps.

- [NPM](https://www.npmjs.com/) (recommended 6.14.16)

  ```bash
  $ nvm install-latest-npm
  ```

  `npm` is shipped with Node.js. But to have a specific version installed see [here](https://stackoverflow.com/questions/9755841/how-can-i-change-the-version-of-npm-using-nvm).

- [Watchman](https://facebook.github.io/watchman/docs/install.html)

  ```bash
  $ brew install watchman
  ```

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

## Installation

On your terminal, go to the directory you want to install Lisk Mobile and run:

```bash
$ git clone https://github.com/LiskHQ/lisk-mobile.git
$ cd lisk-mobile
$ nvm install
$ npm ci
$ npm run link
```

### Run

```bash
$ npm start
```

### Run on iOS - MacOS with Intel chip

To run the app on ios, you have to install `pods`.

For this, just run:

```bash
$ npx pod-install
$ npm run ios
```

### Run on iOS - MacOS with Apple chip

If your machine has the [Apple Silicon](https://support.apple.com/en-us/HT211814) chip (not Intel), you will have to run some additional steps, which we hope are going to be solved in a short term while the new chip is more widely adopted.

The process is:

1. Locate in Terminal app in Finder.
2. Right-click and click on _Get Info_
3. Check the Open using _Rosetta_ checkbox.
4. Quit Terminal app and run it again
5. Go to your app folder and run `sudo gem install ffi`
6. Run `npx pod-install`
7. Run `npm run ios`

More details [here](https://armen-mkrtchian.medium.com/run-cocoapods-on-apple-silicon-and-macos-big-sur-developer-transition-kit-b62acffc1387).

### Run on Android

To run android:

```bash
$ npm run android
```

### Build on iOS

```bash
$ npm run build:ios
```

### Build on Android

```bash
$ npm run build:android
```

### Unit Tests

#### Single run

```bash
$ npm run test
```

## Development

You can run the project in Xcode and use iOS simulators or alternatively use Android simulators. There are several options to set up your Android development environment. Please read [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for more info.

There is a standalone app for debugging React Native. it has React and Redux debugger enabled by default. Please read [React Native Debugger](https://github.com/jhen0409/react-native-debugger) for more info.

### Possible Errors for Mac Users

#### Errors on `lottie-ios/Lottie.modulemap`

If you face this error when trying to run the app:

```
/Users/***/Library/Developer/Xcode/DerivedData/Lisk-***/Build/Products/Debug-iphonesimulator/lottie-ios/Lottie.modulemap
```

Follow this steps to solve it:

1. Add the following to the end of your Podfile (especially M1 users)

```ruby
post_install do |installer|
  react_native_post_install(installer)
    installer.pods_project.targets.each do |target|
        target.build_configurations.each do |config|
          config.build_settings["ONLY_ACTIVE_ARCH"] = "NO"
        end
    end
end
```

2. Remove Pods folder and Podfile.lock `rm -rf ios/Pods && rm -rf ios/Podfile.lock`
3. Run `npx pod-install` on your terminal.

#### Duplicate symbols for architecture `x86_64`

If you face this error when trying to run the app:

```
Products/Debug-iphonesimulator/react-native-udp/libreact-native-udp.a(GCDAsyncUdpSocket.o)
ld: 144 duplicate symbols for architecture x86_64
```

Follow this steps to solve it:

1. Run `npx patch-package`
2. Remove Pods folder and Podfile.lock `rm -rf ios/Pods && rm -rf ios/Podfile.lock`
3. `npx pod-install`

#### Other possible errors

##### `SDK location not found. `

Create `android/local.properties` and add this line in the file for Mac Users:

```
sdk.dir=/Users/username/Library/Android/sdk
```

OR
Set the environmental PATH to your sdk installation location.

### Using Commercial Fonts

Since some of the fonts used in the production version are commercial, this repository only contains open source fonts and uses `Open Sans` as a replacement for the commercial ones.

If you have licensed copies of `Basier Circle` and `Gilroy`, you can add them to [fonts folder](./src/assets/fonts) with the naming convention stated in [`styleGuide/fonts.js`](./src/constants/styleGuide/fonts.js) file and make sure all the fonts are linked.

```bash
$ react-native link ./src/assets/fonts
```

## iMessage Extension

Please check out [iMessage extension docs](ios/LiskMessageExtension/README.md) for more information.

## Contributing

Please see [CONTRIBUTING.md](/CONTRIBUTING.md) for more information.

## Contributors

See [contributors section](https://github.com/LiskHQ/lisk-mobile/graphs/contributors).

## License

Copyright © 2016-2023 Lisk Foundation

This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

You should have received a copy of the GNU General Public License along with this program. If not, see http://www.gnu.org/licenses/.