// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
/* mimicServerCall() is called in response to a user action, returns success or fail.
write code to handle response. update heart on success, display error in DOM if fail.
since we are only concerned with the success response, 
  we don't need to translate it using .JSON because we aren't doing anything else with it.
  therefore, we only need 1 .then() call.

-- ON HEART CLICK:
1. call mimicServerCall() to mimic a server call.
2. Handle the responses as told by assignment.
    Respond to error using a .catch() after .then()
      Display the  e r r o r   m o d a l   by removing the ".hidden" class
      Display the  s e r v o r   e r r o r  message  i n  the modal.
    Use setTimeout() to hide  the modal after 3 seconds by adding ".hidden" back
3. When the "server" returns a success status:
    Change the heart to FULL_HEART by adding the ".activated-heart" class
4. When a user clicks on a full heart:
    Change the heart back to EMPTY_HEART by removing the ".activated-heart" class
5. Keep all styling rules in .css. Do not change any .style properties
6. The DOM should only be manipulated when the server request responds.
7. Do not activate FULL_HEART until you're inside a  s u c c e s s f u l  .then block
-------------------------------------------------------------------------------------
SUMMARY:
Target the heart.
Add event listener,
Have event listener call the function that sends and handles a server request.
Based on the server's response:
if Error: Must be caught with a ".catch()" then remove the "hidden" attribute
          Display the error message defined within mimiServerCall() in html element "p" with id="modal-message"
          setTimeout() to hide modal again after 3 seconds.
if Success:   
*/

//  1. Target the heart
const articleHearts = document.querySelectorAll(".like-glyph");

let p = document.getElementById("modal-message");
let modal = document.getElementById("modal");


// 2. write a function to interact with "server"
function likeCallback(e) {                  // (???) what is getting passed into this for e? 
  const heart = e.target;                   // (???) what is this for?
  mimicServerCall()
    .then(function(serverMessage){          // 
      if(heart.innerText === FULL_HEART){
        heart.innerText = EMPTY_HEART;
      }
      else{
        heart.innerText = FULL_HEART;
      }
    })
    .catch(function(serverMessage){                 // <-- REJECTION HANDLER
      p.innerHTML = serverMessage;
      //setTimeout(function() {
        // remove "hidden" attribute from error modal in the HTML file
        modal.removeAttribute(".hidden");         
      //}, 3000); // delay is in milliseconds 

      setTimeout(function() {
        modal.setAttribute("hidden", true);
      }, 3000);   // At first I put the timeout function on removeAttribute(hidden), which didn't work. Timeout means it will wait 3 seconds then do thats inside.
    }) 
}

//  2. add an event listener to articleHearts... Will have to move this below the function
for (const glyph of articleHearts) {
  glyph.addEventListener("click", likeCallback);
}   

// ME: There is already a timeout() function set for 3 seconds below.
//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);    //Me: (???) What is it delaying?
  });
}
