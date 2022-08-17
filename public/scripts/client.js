/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants."
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense, donc je suis."
    },
    "created_at": 1461113959088
  }
];

$(document).ready(() => { //Call the callbacks when the document is fully loaded/ ready.
  renderTweets(data);
  formSubmission();
});

const formSubmission = function() { //Created to host the event handler and the Ajax request.
  const $form = $('#tweet-form');
  $form.submit(function(event) {
    event.preventDefault();
    console.log("Submission in progress...");
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