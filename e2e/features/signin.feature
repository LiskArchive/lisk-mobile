Feature: Sign In

  Scenario: App is Used
    When type 'truly chicken bracket giant lecture coyote undo tourist portion damage mansion together' into element id 'signInPassphraseInput'
    And I tap element by id 'signInButton'
    Then the profile is visible
