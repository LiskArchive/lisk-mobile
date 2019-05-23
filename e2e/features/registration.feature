Feature: Registration

  Scenario: Successful registration
    Given The app is opened at the registration screen with predefined passphrase
    When I tap element by id 'registerIntroSwitch'
    And I tap element by id 'registerIntroContinueButton'
    And I tap element by id 'registerSafeKeepingButton'
    And I fill in placeholders for the predefined passphrase
    And I tap element by id 'registerConfirmButton'
    And I tap element by id 'registerInitializationButton'
    Then element by id 'registerSuccess' is visible
