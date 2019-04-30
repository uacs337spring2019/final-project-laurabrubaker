// Laura Brubaker
// CSC 337, Spring 2019
// Homework 7

const express = require("express");
const app = express();
const fs = require("fs");

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.header("Access-Control-Allow-Origin", "*");
  let params = req.query;
  let fname = params.fname;
  let lname = params.lname;
  let email = params.email;
  let flag = params.flag;
  console.log(params);
  if(flag == "false"){
    let checkFlag = 0;
    let file = fs.readFileSync("emails.txt", 'utf8');
    console.log(file);
    let list = file.split("\n");
    let i;
    let emails = [];
    for(i = 0; i < list.length; i ++){
      list[i] = list[i].replace(/(\r\n|\n|\r)/gm,"");;
      let split = list[i].split(",");
      if(email  == split[0]){
        checkFlag = 2;
      }
      // let person = {};
      // person["email"] = split[0];
      // person["fname"] = split[1];
      // person["lname"] = split[2];
      // emails.push(person);
    }
    if(checkFlag != 2){
      checkFlag = 1;
    }
    console.log(checkFlag);
    res.send(JSON.stringify(checkFlag));
    //let wrapper = {};
    //wrapper["users"] = emails;
    //console.log(emails);
    //res.send(JSON.stringify(wrapper));
  }
  else{
    console.log("adding to file");
    let string = email + "," + fname + "," + lname + "\r";
    //fs.appendFile('emails.txt', string, 'utf8');
    var stream = fs.createWriteStream("emails.txt", {flags:'a', 'encoding': null, 'mode': 0666});
    stream.write(string + "\n");
    stream.end();
  }
})

app.listen(process.env.PORT);
