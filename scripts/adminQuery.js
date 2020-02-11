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

function getTimeStamp(){
  var dateObj = new Date();
  var date = dateObj.getDate()<10?"0"+dateObj.getDate():dateObj.getDate();
  var month = dateObj.getMonth()+1<10?"0"+(dateObj.getMonth()+1):dateObj.getMonth()+1;
  var year = dateObj.getFullYear()<10?"0"+dateObj.getFullYear():dateObj.getFullYear();
  var hour = dateObj.getHours()<10?"0"+dateObj.getHours():dateObj.getHours();
  var min = dateObj.getMinutes()<10?"0"+dateObj.getMinutes():dateObj.getMinutes();
  var sec = dateObj.getSeconds()<10?"0"+dateObj.getSeconds():dateObj.getSeconds();

  return date+"/"+month+"/"+year+" "+hour+":"+min+":"+sec;
}

$(document).ready(function(){
    //load the master values as soon as the form loads
    //first check if the supplies are added 
    fs.readFile(file, function(err, data){
        if(!err){
            var mainObj = JSON.parse(data);
            if(checkObj(mainObj.supplyDetails)){
              var supplyDetailsArr = mainObj.supplyDetails;
              var options = '<option selected></option>';
              //create dropdown options for each of the element
              var supplyTypeList = new Set(supplyDetailsArr.map(item=>item.supplyType));
              supplyTypeList.forEach(element => {
                  options+='<option>'+element+'</option>';
              });
              $('#type').html(options);           
            }else{
                bootbox.alert("No supplies have been added yet. Please add before checking In");
            }
        }
    })
});

$('#find').click(function(){
  if(!checkValue($('#type').val().trim())){
    bootbox.alert('Please select the search parameter');
    return;
  }
  localStorage.setItem('searchQuery',$('#type').val().trim());
  location.replace('./details.html');
});