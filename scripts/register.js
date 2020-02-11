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

function checkObj(value){
  if(value===undefined || value===null) return false;
  return true;
}

//Admin Register
$("#adminRegister").click(function(){
  var name = $('#adminName').val();
  var password = $('#adminPass').val();

  if(!checkValue(name) && !checkValue(password)){
    bootbox.alert("Please enter all the values before registering.");
    return;
  }

  var userDetails = {};
  userDetails['name'] = name;
  userDetails['password'] = password;
  userDetails['type'] = "admin";


  fs.readFile(file, function(err, data){
    if(!err){
      var mainObj = JSON.parse(data);
      if(checkObj(mainObj.loginDetails.adminDetails)){
        mainObj.loginDetails.adminDetails.push(userDetails);
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(!err){
            bootbox.alert("Admin Details saved successfully",function(){
              location.replace('./index.html');
            });
          }else{
            bootbox.alert("Something went wrong. Please try again.");
          }
        })
      }else if(checkObj(mainObj.loginDetails)){
        mainObj.loginDetails['adminDetails'] = [];
        mainObj.loginDetails.adminDetails.push(userDetails);
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(!err){
            bootbox.alert("Admin Details saved successfully",function(){
              location.replace('./index.html');
            });
          }else{
            bootbox.alert("Something went wrong. Please try again.");
          }
        })
      }else{
        mainObj['loginDetails'] = {};
        mainObj.loginDetails['adminDetails'] = [];
        mainObj.loginDetails.adminDetails.push(userDetails);
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(!err){
            bootbox.alert("Admin Details saved successfully",function(){
              location.replace('./index.html');
            });
          }else{
            bootbox.alert("Something went wrong. Please try again.");
          }
        })
      }
    }else{
      //first time registration
      var mainObj = {};
      mainObj['loginDetails'] = {};
      mainObj.loginDetails['adminDetails'] = [];
      mainObj.loginDetails.adminDetails.push(userDetails);
  
      var finalData = JSON.stringify(mainObj);
      fs.writeFile(file, finalData, function(err){
        if(!err){
          bootbox.alert("Admin Details saved successfully",function(){
            location.replace('./index.html');
          });
        }else{
          bootbox.alert("Something went wrong. Please try again.");
        }
      })
    }
  })
});

//Staff Register
$("#staffRegister").click(function(){
  var name = $('#staffName').val();
  var password = $('#staffPass').val();

  if(!checkValue(name) && !checkValue(password)){
    bootbox.alert("Please enter all the values before registering.");
    return;
  }

  var userDetails = {};
  userDetails['name'] = name;
  userDetails['password'] = password;
  userDetails['type'] = "staff";


  fs.readFile(file, function(err, data){
    if(!err){
      var mainObj = JSON.parse(data);
      if(checkObj(mainObj.loginDetails.staffDetails)){
        mainObj.loginDetails.staffDetails.push(userDetails);
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(!err){
            bootbox.alert("Staff Details saved successfully",function(){
              location.replace('./index.html');
            });
          }else{
            bootbox.alert("Something went wrong. Please try again.");
          }
        })
      }else if(checkObj(mainObj.loginDetails)){
        mainObj.loginDetails['staffDetails'] = [];
        mainObj.loginDetails.staffDetails.push(userDetails);
    
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(!err){
            bootbox.alert("Staff Details saved successfully",function(){
              location.replace('./index.html');
            });
          }else{
            bootbox.alert("Something went wrong. Please try again.");
          }
        }) 
      }else{
        mainObj['loginDetails'] = {};
        mainObj.loginDetails['staffDetails'] = [];
        mainObj.loginDetails.staffDetails.push(userDetails);
    
        var finalData = JSON.stringify(mainObj);
        fs.writeFile(file, finalData, function(err){
          if(!err){
            bootbox.alert("Staff Details saved successfully",function(){
              location.replace('./index.html');
            });
          }else{
            bootbox.alert("Something went wrong. Please try again.");
          }
        }) 
      }
    }else{
      var mainObj = {};
      mainObj['loginDetails'] = {};
      mainObj.loginDetails['staffDetails'] = [];
      mainObj.loginDetails.staffDetails.push(userDetails);
  
      var finalData = JSON.stringify(mainObj);
      fs.writeFile(file, finalData, function(err){
        if(!err){
          bootbox.alert("Staff Details saved successfully",function(){
            location.replace('./index.html');
          });
        }else{
          bootbox.alert("Something went wrong. Please try again.");
        }
      })
    }
  })
});