"use strict";
(function () {

window.onload = function() {
  document.getElementById("subscribe").addEventListener("click", Sub);
  document.getElementById("prezemail").addEventListener("click", Copy);
  document.getElementById("vpemail").addEventListener("click", Copy);
  document.getElementById("treasuremail").addEventListener("click", Copy);
  document.getElementById("secemail").addEventListener("click", Copy);
  Clear();
};

/**
this function clears the divs with messages
@method
*/
function Clear(){
  document.getElementById("error").style.display = "none";
  document.getElementById("already").style.display = "none";
  document.getElementById("added").style.display = "none";
  document.getElementById("invalid").style.display = "none";
}

/**
this function copies the email of whichever officer email was clicked
@method
*/
function Copy(evt){
  let path = evt.target.id;
  console.log(path);
  path = path.replace("mail","");
  console.log(path);
  let email = (document.getElementById(path).innerHTML).split(" ");
  let textarea = document.createElement("textarea");
  textarea.value = email[0];
  document.body.appendChild(textarea);
  textarea.focus();
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
  alert("Copied the email: " + email[0]);
}

/**
this function adds the user to the email list if they aren't already
and displays a message if they're already subscribed
@method
*/
function Sub(){
  Clear();
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  if(email.indexOf("@") == -1 || email.indexOf(".") == -1 || fname.length == 0 || lname.length == 0){
    document.getElementById("invalid").style.display = "block";
    return;
  }
  console.log(fname);
  console.log(lname);
  console.log(email);
  Request(fname, lname, email, false);
}

/**
this function does a get request to the database to see if the user is already subscribed
this adds them if they haven't already been added
@method
*/
function Request(fname, lname, email, flag){
  var url = "http://localhost:3000/?fname=" + fname + "&lname=" + lname + "&email=" + email + "&flag=" + flag;
  fetch(url)
  .then(checkStatus)
  .then(function(responseText) {
    console.log(responseText);
    if(responseText == "1"){
      console.log("wasn't already in file");
      Request(fname, lname, email, true);
      document.getElementById("added").style.display = "block";
    }
    else{
      document.getElementById("already").style.display = "block";
    }
  })
  .catch(function(error) {
    Clear();
    document.getElementById("error").style.display = "block";
  });
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    //console.log(response.text());
    return response.text();
    // special reject message for page not found
  } else if(response.status == 404) {
    return Promise.reject(new Error("sorry we do not have any data"));
  } else {
    return Promise.reject(new Error(response.status+": "+response.statusText));
  }
}

})();
