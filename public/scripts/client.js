/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(() => { //Call the callbacks when the document is fully loaded/ ready.
  formSubmission();
  loadTweets();
});

const loadTweets = function() { //Receives an array of tweets as JSON and renders it to the DOM.
  $.ajax('/tweets', {
    method: 'GET',
  })
  .done(function(response) {
    renderTweets(response);
  })
};



const formSubmission = function() { //Created to host the event handler and the Ajax POST request.
  const $form = $('#tweet-form');
  $form.submit(function(event) {
    event.preventDefault();
    console.log("Submission in progress...");

    $.ajax('/tweets', {
      method: 'POST',
      data: $form.serialize(),
    })
    .done(function() {
      console.log('Tweet submitted.');
    })
    .fail(function() {
      console.log('Submission failed.');
    });
  $('#tweet-text').val(''); //To clear the form after submission.
  $('.counter').val(140); //To reset the counter to its default/ max val: 140.
  });
};



const renderTweets = function(tweets) { //Appends each tweet to #tweets-container.
  for (const tweet of tweets) {
    const $tweet = createTweetElement(tweet);
    $('#tweets-container').append($tweet);
  }
};



const createTweetElement = function(tweet) { //Returns the HTML structure of a tweet.
  const user = tweet.user;
  const content = tweet.content;
  let htmlStructure = `
  <article class="tweet">
  <header>
    <span class="avatar"><img src=${user.avatars}>
    <div class="name">&nbsp ${user.name}</div></span>
    <div class="username">${user.handle}</div>
  </header>
  <div class="tweet-content">
    <p class="tweet-content-text">${content.text}</p>
  </div>
  <footer>
    <div class="time">${tweet.created_at}</div>
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