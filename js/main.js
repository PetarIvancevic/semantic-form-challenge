'use strict';

var passwordInput = $('#password');
var creditCardImgHolder = $('#creditcard-image-holder img');
var submitButton = $('#creditcardform .submit-button');
var checkboxImg;
var showPassword = $('#showpassword');
var validCreditCard = false;

if (!document.getElementById('creditcardnumber').value) {
  $('#creditcardform .submit-button')
    .attr('disabled', true)
    .attr('aria-disabled', true);
}

// SET COOL CHECKBOX
$('#showpassword').css('display', 'none');

// CREDIT CARD VALIDATION
$('#creditcardnumber').validateCreditCard(function(result) {
  if (result.card_type && result.length_valid && result.valid) {
    validCreditCard = true;
    submitButton
      .removeAttr('disabled')
      .removeAttr('aria-disabled');
    $('#' + result.card_type.name + 'img').css('opacity', 1);
  }

  if (!result.length_valid && validCreditCard) {
    validCreditCard = false;
    submitButton
      .attr('disabled', true)
      .attr('aria-disabled', true);
    creditCardImgHolder.css('opacity', 0.5);
  }
}, ['visa', 'discover', 'amex', 'maestro']);

// REVEAL-HIDE PASSWORD
$('#showpassword').change(function(val) {
  var passwordType = (val.target.checked) ? 'text' : 'password';
  var checkedImage = 'img/form/checkbox_checked.png';
  var unchedImage = 'img/form/checkbox_unchecked.png';

  $(this).attr('aria-checked', val.target.checked);
  checkboxImg.attr('src', (val.target.checked) ? checkedImage : unchedImage);
  passwordInput.attr('type', passwordType);
});

$('#showpassword-label').prepend(
  '<span id="ie-helper" for="showpassword" tabindex="0" role="button" ' +
    'aria-labelledby="reveal-description">' +
    '<img id="checkbox-img" src="img/form/checkbox_unchecked.png" ' +
      'alt="checkbox img" />' +
  '</span>'
);

$('#showpassword-label').keydown(function(event) {
  if (event.keyCode === 32 || event.keyCode === 13) showPassword.click();
});

checkboxImg = $('#checkbox-img');

// SAFARI REQUIRED SUPPORT
var isSafari = !!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/);

if (isSafari) {
  var scriptTag = document.createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.src = 'js/_form_validation.js';

  $('body').append(scriptTag);
}
