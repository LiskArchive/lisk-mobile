Feature: Sign In

  Scenario: Successful Sign In
    Given The app is opened
    When I am signed in
    Then the profile is visible
