Feature: Ecommerce Validations

    Scenario Outline: Placing the order successfully
        Given Login to ecommerce application with "<Email>" and "<Password>"
        When Add "ZARA COAT 3" to the cart
        Then Verify "ZARA COAT 3" is present in the cart
        When Enter valid details and submit the order for "<Email>"
        Then Verify the order is present in the order history

        Examples:
            | Email                  | Password     |
            | ansika@gmail.com       | Iamking@000  |
            | deepatn3096@gmail.com  | Hello123@    |

    @negative
    Scenario Outline: Scenario Outline name: Validate error message for invalid email
        Given login to ecommerce2 application with "<Username>" and "<Password>"
        Then Verify error message is displayed

        Examples:
            | Username               | Password    |
            | ansika@gmail.com       | IamKing     |
            | rahulsheetty@gmail.com | Iamking@000 |