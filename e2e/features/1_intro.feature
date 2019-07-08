Feature: Intro

  Scenario: Go through intro screens
    Given The app is opened
    When I swipe intro screens
    Then I am on Sign in screen
