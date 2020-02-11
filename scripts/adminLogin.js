const fs = require("fs");
const path = require("path");
var $ = require("jquery");
var bootstrap = require('bootstrap');
var bootbox = require("bootbox");
const DatabaseName = "DB";
let pathName = path.join(__dirname, 'data');
let file = path.join(pathName, DatabaseName);

//utility function
function checkValue(value){
  if(value===undefined || value===null || value.trim()==="") return false;
  return true;
}

$('#loginBtn').click(function(){
  var username = $('#username').val().trim();
  var password = $('#password').val().trim();

  if(!checkValue(username) && !checkValue(password)){
      bootbox.alert('Please enter all the fields.');
      return;
  }

  fs.readFile(file,function(err,data){
   if(!err){
       var mainObj = JSON.parse(data);
       var userSelector = mainObj.loginDetails.adminDetails.filter(info=>info.name===username&&info.password===password);
       if(userSelector.length>0){
           //store the logged in user details
           localStorage.setItem('loggedInUser',username);
           location.replace("./adminDash.html");
       }else{
           bootbox.alert('Login Details not found. Please try again.');
           return;
       }
   }
  });
});