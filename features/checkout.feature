Feature: E-commerce Checkout Process (SCRUM-101)
  As a customer
  I want to complete my purchase through a checkout process
  So that I can order products online

  Background:
    Given I am on the Saucedemo application
    And I login with username "standard_user" and password "secret_sauce"

  Scenario: Review items in cart
    Given I have added items to my cart
    When I navigate to the cart page
    Then I should see all added items with their details
    And I should see the total price calculation
    And I should have options to continue shopping or proceed to checkout

  Scenario: Verify checkout form fields are required
    Given I have items in my cart
    And I navigate to the checkout page
    When I leave all fields empty and click Continue
    Then I should see an error message indicating First Name is required

  Scenario: Enter valid checkout information
    Given I have items in my cart
    And I am on the checkout information page
    When I enter valid checkout information
      | firstName | lastName | postalCode |
      | John      | Smith    | 12345      |
    And I click Continue
    Then I should be redirected to the checkout overview page

  Scenario: Validate First Name field is mandatory
    Given I have items in my cart
    And I am on the checkout information page
    When I fill Last Name with "Smith" and Postal Code with "12345"
    And I click Continue
    Then I should see error message "First Name is required"

  Scenario: Validate Last Name field is mandatory
    Given I have items in my cart
    And I am on the checkout information page
    When I fill First Name with "John" and Postal Code with "12345"
    And I click Continue
    Then I should see error message "Last Name is required"

  Scenario: Validate Postal Code field is mandatory
    Given I have items in my cart
    And I am on the checkout information page
    When I fill First Name with "John" and Last Name with "Smith"
    And I click Continue
    Then I should see error message "Postal Code is required"

  Scenario: Review order before completion
    Given I have entered valid checkout information
    When I am on the checkout overview page
    Then I should see a summary of all items in my order
    And I should see payment and shipping information
    And I should see the subtotal, tax, and total amount
    And I should have Cancel and Finish buttons

  Scenario: Cancel checkout and return to cart
    Given I have entered valid checkout information
    And I am on the checkout overview page
    When I click the Cancel button
    Then I should be redirected back to the cart page

  Scenario: Complete order successfully
    Given I have entered valid checkout information
    And I am on the checkout overview page
    When I click the Finish button
    Then I should be redirected to the order confirmation page
    And I should see a success message confirming my order
    And I should see a "Back Home" button

  Scenario: Cart is cleared after order completion
    Given I have completed an order
    When I navigate back to the products page
    And I navigate to the cart page
    Then I should see an empty cart

  Scenario: Handle special characters in form fields
    Given I have items in my cart
    And I am on the checkout information page
    When I enter special characters in the form fields
      | firstName | lastName | postalCode |
      | John@#$   | Smith<>  | 12345      |
    And I click Continue
    Then I should either proceed or see an appropriate error message

  Scenario: Prevent checkout with empty cart
    Given I am logged in
    And my cart is empty
    When I try to navigate to checkout
    Then I should not be able to proceed to checkout
