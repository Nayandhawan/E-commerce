Meta:Ecommerce Website

Narrative:
As a user
I want to signup as customer
So that I can achieve a business goal

Scenario: User signs up with valid details
Given I am on the signup page
When I enter name "John Doe10"
And I enter email "john.doe10@example.com"
And I enter password "Password@123"
And I confirm password "Password@123"
And I click on the signup button
Then I will be able to login successfully with "john.doe10@example.com" and "Password@123"