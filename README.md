# Treehouse Project 3: Interactive Form

https://rlertola.github.io/interactive-form-v1/

This project uses a combination of jquery and vanilla javascript. The page still works if js is disabled. All errors except for the register button "Please fix errors" error are displayed.

### Sections

Every section is validated and will throw at least one error. Text inputs are checked when blurred, and all are checked when the register button is clicked.

### Basic Info

Name and email must not be empty. Both will show errors if blurred, or tried to submit if empty. Name must not contain anything but letters. Email also must be a valid email address with a different error showing if it is not.

If 'other' job role is selected from the dropdown, a box to input the role appears, and hides if another option is selected. If 'other' is selected, the input must be filled in or an error will be thrown.

### T-Shirt Info

Selecting a design from the menu causes the color box to appear. Options are based on which design is selected. Validation when the register button is clicked. A t-shirt must be selected or an error will be thrown.

### Register for Activities

At least one activity must be selected. If the register button is pushed, and error message will appear to select at least one activity.

As things are checked, any activity that is at the same time will be deactivated and change color with a line-through indicating that it can't be selected.

Cost of all things checked is added and displayed at the bottom.

### Payment Info

The credit card option is displayed by default with paypal and bitcoin hidden. If paypal or bitcoin is selected, they will be displayed and the others hidden.

The credit card fields cannot be blank and must be valid. Error messages will appear for any that are blank or not valid when blurred or the register button is clicked. Credit card fields clear if another option is selected.

### Register Button

When the register button is clicked, it checks for any fields that might have errors and displays messages for fields, and also there will be a 'please fix errors' message that appears next to the register button. This message goes away when errors are fixed and the register button will activate.




