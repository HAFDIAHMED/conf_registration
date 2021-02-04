
// On startup.
$(function() {
  $('#name').focus();
  showAndHide('credit-card', 'bitcoinOption', 'paypalOption');
  hideIt('#other-title');
  hideIt('#colors-js-puns');
  hideAllTips();
})

const hideAllTips = () => {
  $('.tips').each((i, tip) => {
    hideIt(tip);
  })
}

// Helper functions for showing/hiding.
const showIt = (id) => {
  $(id).show();
}
const hideIt = (id) => {
  $(id).hide();
}


// JOB ROLE SECTION
// When 'other' is selected, a box to enter a role appears.
$('#title').on('change', (e) => {
  if (e.target.value === 'other') {
    showIt('#other-title');
    $('#other-title').focus();
  } else {
    anyErrors();
    hideIt('#other-title');
  }
})

// T-SHIRT INFO SECTION
// Shows different shirt options based on the theme selected.
$('#design').on('change', (e) => {
  if (e.target.value === 'js puns') {
    showIt('#colors-js-puns');
    displayColors('#color', 'JS Puns shirt only')
  }
  if (e.target.value === 'heart js') {
    showIt('#colors-js-puns');
    displayColors('#color', 'JS shirt only')
  }
  if (e.target.value === 'Select Theme') {
    hideIt('#colors-js-puns');
  }

  // Choosing a new theme changes the value of the selection, so that an incompatible color cannot be selected.;
  $('#color').val($('#defaultOption').text());
})

$('#color').on('change', () => {
  isValidTShirt();
});

// Checks if a tshirt is selected.
const isValidTShirt = () => {
  const colors = $('#colors-js-puns');
  const color = $('#color');
  if (colors.css('display') !== 'none') {
    if (color.val() !== null) {
      anyErrors();
      hideIt('#tshirtTip');
      return true;
    }
  }
  return false;
}


// Helper function for displaying shirt options.
const displayColors = (id, string) => {
  const defaultText = 'Select Color';
  $('#defaultOption').text(defaultText);
  $(id).children().each((i, item) => {
    if (!item.text.includes(string)) {
      hideIt(item);
    } else {
      showIt(item);
    }
  })
}


// REGISTER FOR ACTIVITIES SECTION
/* Gets the string with the activity info, extracts the amount,
day and time, and blocks out any time conflicts. */
let amountArray = [];
$('.activities').on('change', (e) => {
  anyErrors();
  hideIt('#activityTip');
  const parent = e.target.parentElement;
  const string = parent.textContent;

  // Gets the amount
  const amountRegex = /\d{3}/;
  const amount = string.match(amountRegex)[0];
  const amountInt = parseInt(amount);
  // Gets the day
  let day;
  const dayRegex = /(mon|tues|wed|thur|fri)(\w+)/i;
  const dayTest = dayRegex.test(string);
  if (dayTest) {
    day = string.match(dayRegex)[0];
  };
  // Gets the time
  let time;
  const timeRegex = /\d\d?(am|pm)-?\d\d?(am|pm)?/;
  const timeTest = timeRegex.test(string);
  if (timeTest) {
    time = string.match(timeRegex)[0];
  }

  // When activity is checked, puts the cost in an array.
  if (e.target.checked) {
    amountArray.push(amountInt);
  } else {
    amountArray.pop(amountInt);
  }

  // Blocks out the activities that conflict with checked ones.
  const $labels = $('.activities').children();
  $labels.each((i, label) => {
    let string = label.textContent;
    let timeLabel = string.match(timeRegex);
    let dayLabel = string.match(dayRegex);
    if (timeLabel !== null) {
      timeLabel = string.match(timeRegex)[0];
      dayLabel = string.match(dayRegex)[0];
      if (timeLabel === time && dayLabel === day) {
        if (e.target.checked === true) {
          label.className = 'timeConflict';
          parent.className = 'inherit';
        } else {
          label.className = 'inherit';
        }
      }
    }
  })

  // Displays the total cost of activities checked.
  $('#total').text(`Total: $${getTotal(amountArray)}`);
})

// Gets total cost of activities checked.
const getTotal = (amtsArray) => {
  if (amtsArray.length > 0) {
    return amtsArray.reduce((a, b) => {
      return a + b;
    })
  } else {
    return 0;
  }
}


// PAYMENT INFO SECTION
// Displays CC by default. When one is selected, hides the others.
$('#payment').on('change', (e) => {
  if (e.target.value === 'credit card') {
    showAndHide('credit-card', 'bitcoinOption', 'paypalOption');
  }
  if (e.target.value === 'paypal') {
    showAndHide('paypalOption', 'credit-card', 'bitcoinOption');
  }
  if (e.target.value === 'bitcoin') {
    showAndHide('bitcoinOption', 'credit-card', 'paypalOption');
  }
});

// Helper function for showing and hiding payment options.
const showAndHide = (show, hide1, hide2) => {
  showIt(`#${show}`);
  hideIt(`#${hide1}`);
  hideIt(`#${hide2}`);
}


// FORM VALIDATION

// Name field can't be blank.
$('#name')
  .on('input', (e) => {
    hideIt('#nameBlankTip');
    displayErrors(e, '#nameInvalidTip', isValidName);
  })
  .blur((e) => {
    if (!checkIfNotBlank(e.target.value)) {
      showIt('#nameBlankTip');
      hideIt('#nameInvalidTip');
    }
  })

/* Hides the alt tip and shows the valid email tip if field isn't empty. If empty, shows the alt tip and hides the valid email tip. */
$('#mail')
  .on('input', (e) => {
    hideIt('#altTip');
    displayErrors(e, '#mailTip', isValidEmail);
  })
  .blur((e) => {
    if (!checkIfNotBlank(e.target.value)) {
      hideIt('#mailTip');
      showIt('#altTip');
    }
  })

// If the 'other' job role is selected, the input field cannot be blank, or another option must be selected.
$('#other-title').on('input blur', (e) => {
  displayErrors(e, '#otherTip', checkIfNotBlank);
})

$('#title').on('change', (e) => {
  if ($('#jobRole').val() !== 'other') {
    hideIt('#otherTip');
  }
})

const isValidRole = (value) => {
  if (value !== 'other') {
    return true;
  }
  if (value === 'other' && checkIfNotBlank($('#other-title').val())) {
    anyErrors();
    return true;
  }
  return false;
}


// Helper function to check if name, email, or other job roles field is empty.
const checkIfNotBlank = (text) => text !== '';

const isValidName = (name) => {
  return /^[a-zA-Z]+$/.test(name);
}
// Must be a valid email address.
const isValidEmail = (email) => {
  return /^[^@]+@[^@.]+\.[a-z]+$/i.test(email);
}

// Helper function to check if at least one activity is checked.
const checkIfOneChecked = (array) => {
  if (array.length > 0) {
    return true;
  }
}

// Helper function to show error messages.
const displayErrors = (e, id, checkerFunc) => {
  const valid = checkerFunc(e.target.value);
  if (valid) {
    anyErrors();
    hideIt(id);
  } else {
    showIt(id);
  }
}


// PAYMENT INFO SECTION
// Credit card field should be a number between 13-16 digits.
const isValidCreditCard = (ccNumber) => checkCCInfo(ccNumber, 13, 16);

// The Zip Code field should be a 5-digit number.
const isValidZip = (zipCode) => checkCCInfo(zipCode, 5, 5);

// The CVV should be 3 digits long.
const isValidCVV = (CVV) => checkCCInfo(CVV, 3, 3);

// Helper function to validate cc number, zip and cvv.
const checkCCInfo = (numType, min, max) => {
  const isNotNumber = isNaN(numType);
  if (!isNotNumber) {
    const length = numType.toString().length;
    if (min === max) {
      if (length === min) {
        return true;
      } else {
        return false;
      }
    }
    if (length >= min && length <= max) {
      return true;
    } else {
      return false;
    }
  }
}

// Shows error messages for cc number, zip and cvv.
$('#cc-num').on('input blur', (e) => {
  displayErrors(e, '#ccNumTip', isValidCreditCard);
})
$('#zip').on('input blur', (e) => {
  displayErrors(e, '#ccZipTip', isValidZip);
})
$('#cvv').on('input blur', (e) => {
  displayErrors(e, '#ccCvvTip', isValidCVV);
})

const isValidPmtOption = (value) => {
  return value !== 'credit card';
}
// If a non-credit card payment option is selected, all CC info and tips are cleared.
$('#payment').on('change', (e) => {
  if (e.target.value !== 'credit card') {
    clearPaymentInfo();
  }
})
// Helper function
const clearPaymentInfo = () => {
  $('#cc-num').val('');
  $('#zip').val('');
  $('#cvv').val('');
  hideIt('#ccNumTip');
  hideIt('#ccZipTip');
  hideIt('#ccCvvTip');
}

// When the register button is clicked it will check if there should be errors and displays them.
$('#registerButton').on('click', (e) => {
  const nameEmpty = checkIfNotBlank($('#name').val());
  const name = isValidName($('#name').val());
  const mailEmpty = checkIfNotBlank($('#mail').val());
  const mail = isValidEmail($('#mail').val());
  const otherRole = isValidRole($('#title').val());
  const tshirt = isValidTShirt();
  const activity = checkIfOneChecked(amountArray);
  const pmtOption = isValidPmtOption($('#payment').val());
  const ccNum = isValidCreditCard($('#cc-num').val());
  const ccZip = isValidZip($('#zip').val());
  const ccCvv = isValidCVV($('#cvv').val());

  const checker = (field, show) => {
    if (!field) {
      showIt(show);
      showIt('#registerTip');
      e.preventDefault();
    }
  }

  checker(name, '#nameInvalidTip');
  checker(nameEmpty, '#nameBlankTip');
  checker(mailEmpty, '#altTip');
  checker(mail, '#mailTip');
  checker(otherRole, '#otherTip');
  checker(activity, '#activityTip');
  checker(tshirt, '#tshirtTip');

  // If credit card is selected.
  if (!pmtOption) {
    checker(ccNum, '#ccNumTip');
    checker(ccZip, '#ccZipTip');
    checker(ccCvv, '#ccCvvTip');
  }
})

// Checks everything in the 'tips' class to see if any errors.
const anyErrors = () => {
  let errors = 0;
  $('.tips').each((i, tip) => {
    if (tip.style.display !== 'none' && tip.id !== 'registerTip') {
      errors++;
    }
  })
  if (errors === 1) {
    hideIt('#registerTip');
  }
}




















