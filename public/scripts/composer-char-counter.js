$(document).ready(function() {

  const $input = $('textarea');
  $input.keyup('counter', function() {

    const maxChars = 140;
    const inputLength = $(this).val().length;
    
    const counter = $(this).parent('form').find('.counter'); //Traversing the DOM up to find the closest parent, then down to find the closest child.
    const remainingChars = maxChars - inputLength;

    if (remainingChars > 0) {
      counter.val(remainingChars).css('color', '#545149');
    }
    if (remainingChars <= 0) {
      counter.val(remainingChars).css('color', 'red');
    }
  });
});