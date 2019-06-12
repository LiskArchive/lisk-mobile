Feature: Registration

  Scenario: Successful registration
    Given The app is opened at the registration screen with predefined passphrase
    When I swipe account creation screens
    And I tap element by id 'understandResponsibilitySwitch'
    And I tap element by id 'safeKeepingButton'
    And I fill in placeholders for the predefined passphrase
    And I tap element by id 'registerConfirmButton'
    And I tap element by id 'registerSuccess'
    Then I am on Sign in screen
