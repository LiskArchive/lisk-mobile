fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios fetch_certificates
```
fastlane ios fetch_certificates
```
Fetch certificates and provisioning profiles
### ios bump
```
fastlane ios bump
```
Increment build number
### ios build
```
fastlane ios build
```
Build the app
### ios beta
```
fastlane ios beta
```
Build the app and ship to Testflight

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
