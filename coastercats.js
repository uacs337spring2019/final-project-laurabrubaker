"use strict";
(function () {

window.onload = function() {
  document.getElementById("subscribe").addEventListener("click", Sub);
  document.getElementById("prezemail").addEventListener("click", Copy);
  document.getElementById("vpemail").addEventListener("click", Copy);
  document.getElementById("treasuremail").addEventListener("click", Copy);
  document.getElementById("secemail").addEventListener("click", Copy);
  document.getElementById("error").style.display = "none";
  document.getElementById("already").style.display = "none";
}

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

function Sub(){
  let fname = document.getElementById("fname").value;
  let lname = document.getElementById("lname").value;
  let email = document.getElementById("email").value;
  console.log(fname);
  console.log(lname);
  console.log(email);

  if (Check(fname, lname, email) == 1){
    Add(fname, lname, email);
  }
  else if (Check(fname, lname, email) == 2){

  }
  else{

  }
}

function Check(fname, lname, email){

}

function Add(fname, lname, email){

}

})();
