/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => { //Call the callbacks when the document is fully loaded/ ready.
  loadTweets();
  formToggle();
  formSubmission();
});



const loadTweets = function() { //Receives an array of tweets as JSON and renders it to the DOM.
  $.ajax('/tweets', { //To fetch the tweet from the server.
    method: 'GET',
  })
  .done(function(response) {
    $('#tweets-container').empty(); //Empty container so we don't end up with repeated old tweets.
    renderTweets(response);
  })
};



const formSubmission = function() { //Created to host the event handler and the Ajax POST request.
  const $form = $('#tweet-form');
  $form.submit(function(event) {
    event.preventDefault();
    
    $('#validation-error-alert').slideUp('fast'); //Error box slides up when a new valid tweet is submitted.

    const $tweetInput = $('#tweet-text');
    if (!$tweetInput.val()) { //If input in form is empty.
      validationError('&#9888; Empty field. Please enter a valid tweet.');
      return;
    }
    if ($tweetInput.val().length > 140) { //If input in form exceeds 140 characters.
      validationError('&#9888; You exceeded the 140 characters limit.');
      return;
    }

    $.ajax('/tweets', { //To send the tweet to the server.
      method: 'POST',
      data: $(this).serialize(),
    })
    .done(function() {
      loadTweets(); //So the tweet shows up without having to refresh.
      console.log('Tweet submitted.');
    })
    .fail(function() {
      console.log('Submission failed.');
    });

  $('#tweet-text').val(''); //To clear the form after submission.
  $('.counter').val(140).css('color', '#545149'); //To reset the counter to its default/ max val: 140.
  });
};



const renderTweets = function(tweets) { //Add each tweet to #tweets-container.
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').prepend($tweet); //Changed from append to prepend so the tweet shows up at the top.
  }
};



const createTweetElement = function(tweet) { //Returns the HTML structure of a tweet.
  const user = tweet.user;
  const content = tweet.content;
  const timePassed = timeago.format(tweet.created_at);

  let htmlStructure = `
  <article class="tweet">
  <header>
    <span class="avatar"><img src=${user.avatars}>
    <div class="name">&nbsp ${user.name}</div></span>
    <div class="username">${user.handle}</div>
  </header>
  <div class="tweet-content">
    <p class="tweet-content-text">${escapeXSS(content.text)}</p>
  </div>
  <footer>
    <div class="time">${timePassed}</div>
    <div class="icons">
      <span><i class="fa-solid fa-flag"></i>&nbsp</span>
      <span><i class="fa-solid fa-retweet"></i>&nbsp</span>
      <span><i class="fa-solid fa-heart"></i></span>
    </div>
  </footer>
  </article>
  <br/>
  `;

  return htmlStructure;
};



const escapeXSS = function(str) { //Function to prevent XSS by re-encoding. Changed its name to escapeXSS() because JS kept mistaking it with the depreciated escape().
  let div = document.createElement("div");
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};



const validationError = function(msg) { //For error messages animations.
  const $errorMsg = $('#validation-error-alert');

  $errorMsg.hide() //Its default is to be hidden.
    .html(msg) //Show the error msg.
    .slideDown('fast'); //Error box slides down with error msg.
};



const formToggle = function() { //Nav Form toggle (Stretch).
  const $pointer = $('#angle-down-icon');
  const $form = $('#tweet-form');

  $pointer.on('click', function() {
    $form.slideToggle(); //Form slides up and down when pointer is clicked.
    $('textarea').focus(); //Focus on textarea so user can begin typing right away.
  })
};