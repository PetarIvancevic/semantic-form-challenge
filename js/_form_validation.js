'use strict';

function displayErrorMessages(errors) {
  var errorCount = errors.length;

  for (var i = 0; i < errorCount; i++) {
    var error = errors[i];
    var holder =  $('#' + error.holder + '-holder');
    var errorHolder = $('#' + error.holder + '-message');

    if (errorHolder.length) {
      errorHolder.html(
        '<p class="error-msg" id="' + error.holder + '-message">'
          + '<span class="inline-error-mark">!</span> ' + error.message + '</p>'
      );
    } else {
      holder.append(
        '<p class="error-msg" id="' + error.holder + '-message">'
          + '<span class="inline-error-mark">!</span> ' + error.message + '</p>'
      );
    }
  }
}

function clearErrorMessages(element) {
  $('#' + element + '-message').remove();
}

function isEmail(email) {
  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
}

function validateData(data) {
  var keyCount = data.length;
  var errors = [];

  for (var i = 0; i < keyCount; i++) {
    if (!data[i].value) {
      var tempName = data[i].name;

      switch (tempName) {
        case 'fullname':
          tempName = 'Full name';
          break;
        case 'securitycode':
          tempName = 'Security code';
          break;
        default:
          tempName = tempName[0].toUpperCase() + tempName.slice(1);
          break;
      }

      errors.push({
        holder: data[i].name,
        message: tempName + ' is required.'
      });
    }

    if (data[i].name === 'email' && !isEmail(data[i].value)) {
      errors.push({
        holder: 'email',
        message: 'Please enter a valid email.'
      });
    }
  }

  return errors;
}


$('#creditcardform').submit(function(event) {
  var data = $(this).serializeArray();
  var keyCount = data.length;
  var errors = validateData(data)

  if (errors.length) {
    event.preventDefault();
    displayErrorMessages(errors);
  }
});

function addListeners() {
  var elements = [
    'fullname',
    'email',
    'password',
    'securitycode',
    'website',
    'creditcardnumber'
  ];

  for (var i = 0; i < elements.length; i++) {
    var elName = '#creditcardform input[name=' + elements[i] + ']';
    $(elName).change(function(element) {
      var errors = validateData([{
        name: element.target.name,
        value: element.target.value
      }]);

      if (errors.length) {
        displayErrorMessages(errors);
      } else {
        clearErrorMessages(element.target.name);
      }
    });
  }
}

addListeners();
