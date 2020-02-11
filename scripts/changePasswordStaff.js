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

$('#changePassword').click(function(){
    var oldPassword = $('#oldPassword').val().trim();
    var newPassword = $('#newPassword').val().trim();

    if(!checkValue(oldPassword) && !checkValue(newPassword)){
        bootbox.alert('Please fill both of the fields.');
        return;
    }

    fs.readFile(file, function(err, data){
        if(!err){
            var mainObj = JSON.parse(data);
            var staffLoginDetails = mainObj.loginDetails.staffDetails;
            var user = localStorage.getItem('loggedInUser');

            if(staffLoginDetails.filter(item=>item.name===user&&item.password===oldPassword).length>0){
               //update the password
               mainObj.loginDetails.staffDetails.map((item,idx)=>{
                   if(item.name===user && item.password===oldPassword){
                       item.password = newPassword;
                   }
               });

           //finally write the object to local db
            var finalData = JSON.stringify(mainObj);
            fs.writeFile(file, finalData, function(err){
                if(!err){
                    bootbox.alert('Password Updated Successfully',function(){
                        location.replace("./staffLogin.html");
                    });
                }
            });            
            }else{
                bootbox.alert("No User found with these credentials, please try again.");
            }

        }
    });
});