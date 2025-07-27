# The Magic of Kaprekar's Constant: 6174

In 1949, the Indian mathematician D. R. Kaprekar discovered a fascinating property of the number 6174. This number is now known as **Kaprekar's Constant**.

The discovery is tied to a specific algorithm, or routine, that will always lead to 6174 for any four-digit number that meets one simple condition.

### The Rule

The only rule is that the four-digit number must have **at least two different digits**. For example, 1234 is a valid starting number, but 1111 is not.

### The Routine

1.  **Pick a four-digit number** that follows the rule above.
    * *Example: Let's use `3524`.*

2.  **Create the largest possible number** by arranging the digits in descending order.
    * *Example: `5432`.*

3.  **Create the smallest possible number** by arranging the digits in ascending order.
    * *Example: `2345`.*

4.  **Subtract the smallest number from the largest number.**
    * *Example: `5432 - 2345 = 3087`.*

5.  **Repeat the process** with the new number.
    * *Step 2: `8730 - 0378 = 8352`*
    * *Step 3: `8532 - 2358 = 6174`*

Amazingly, no matter what four-digit number you start with (as long as it meets the rule), you will always arrive at 6174 in **seven steps or fewer**.

Once you reach 6174, the process enters a loop:
`7641 - 1467 = 6174`
...and so on, forever!