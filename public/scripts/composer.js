//Implement scroll Up button (Stretch):

$(document).ready(() => {
  const $scrollUp = $('.scroll-up');

  $scrollUp.hide(); //Hide when user is at the top/ page is refreshed.

  $(window).scroll(function() {
    const position = $(window).scrollTop();
    
    if (position > 0) { //If the user scrolls down.
      $scrollUp.fadeIn();
      document.getElementById("nav-bar").style.display = "none"; //nav will disappear.
    }
    if (position <= 0) { //At the top.
      $scrollUp.fadeOut();
      document.getElementById("nav-bar").style.display = "flex"; //nav will reappear.
    }
  });

  $scrollUp.on('click', function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    $('#tweet-form').slideDown('fast');
    $('textarea').focus(); //Focus on textarea so user can begin typing right away.
  });
});
