Meta:
@AddCategory
@Admin

Narrative:
As an admin,
I want to log in and add a new category
So that it appears in the product list for customers.

Scenario: Successfully add a new category

Given I am logged in as admin user
When I click on the Category button
When I enter category name "<categoryName>"
When I enter category description "<categoryDescription>"
Then I click on the Add Category button

Examples:
| categoryName | categoryDescription                      |
| Electronics  | All electronic gadgets and accessories   |