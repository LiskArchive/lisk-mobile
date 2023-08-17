/** @type {Detox.DetoxConfig} */
module.exports = {
  testRunner: {
    args: {
      $0: 'jest',
      config: 'e2e/jest.config.js',
    },
    jest: {
      setupTimeout: 600000,
    },
  },
  apps: {
    'ios.debug': {
      name: 'Lisk',
      type: 'ios.app',
      binaryPath: 'ios/build/Build/Products/Debug-iphonesimulator/LiskQA.app',
      build:
        '/usr/bin/xcodebuild -workspace ios/Lisk.xcworkspace -scheme LiskQA -sdk iphonesimulator -derivedDataPath ios/build',
    },
    'android.debug': {
      name: 'Lisk',
      type: 'android.apk',
      binaryPath: 'android/app/build/outputs/apk/debug/app-debug.apk',
      build:
        'cd android && ./gradlew assembleDebug assembleAndroidTest -DtestBuildType=debug && cd ..',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: 'iPhone 14 Pro',
      },
    },
    attached: {
      type: 'android.attached',
      device: {
        adbName: '.*',
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: 'Pixel_3a_API_30_x86',
      },
    },
  },
  configurations: {
    'ios.debug': {
      device: 'simulator',
      app: 'ios.debug',
    },
    'android.debug': {
      device: 'emulator',
      app: 'android.debug',
    },
  },
};
