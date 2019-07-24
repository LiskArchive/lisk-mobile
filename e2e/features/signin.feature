Feature: Sign In

  Scenario: Successful Sign In
    Given The app is opened
    When I sign in
    Then I am on profile screen
