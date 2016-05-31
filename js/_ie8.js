'use strict';

var creditCardImgHolder = $('#creditcard-image-holder img');
var creditCardHolder = $('#creditcardnumber-holder');

creditCardImgHolder.addClass('fadedImage');

$('#creditcardnumber').validateCreditCard(function(result) {
  if (result.card_type && result.length_valid && result.valid) {
    validCreditCard = true;
    submitButton.removeAttr('disabled');
    $('#' + result.card_type.name + 'img').removeClass('fadedImage');
  }

  if (!result.length_valid && validCreditCard) {
    validCreditCard = false;
    submitButton.attr('disabled', true);
    creditCardImgHolder.addClass('fadedImage');
  }
}, ['visa', 'discover', 'amex', 'maestro']);

// IE HAS ITS OWN REVEAL PASSWORD
$('#showpassword-label').css('display', 'none');
