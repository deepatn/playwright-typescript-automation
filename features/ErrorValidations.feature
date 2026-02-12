Feature: Ecommerce Va;idations

    @negative
    Scenario Outline: Scenario Outline name: Validate error message for invalid email
        Given login to ecommerce2 application with "<Username>" and "<Password>"
        Then Verify error message is displayed

        Examples:
            | Username               | Password    |
            | ansika@gmail.com       | IamKing     |
            | rahulsheetty@gmail.com | Iamking@000 |