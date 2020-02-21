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

$('#saveSupply').click(function(){
    var supplyType = $('#supplyType').val().trim();
    var brand = $('#brand').val().trim();
    var size = $('#size').val().trim();
    var quantity = $('#quantity').val().trim();
    var productType = $('#productType').val().trim();
    var notes = $('#notes').val().trim();

    if(!checkValue(supplyType) && !checkValue(brand) && !checkValue(size)){
        bootbox.alert("Please fill all the fields");
        return;
    }

    var supplyObj = {};
    supplyObj['supplyType'] = supplyType;
    supplyObj['brand'] = brand;
    supplyObj['size'] = size;
    supplyObj['quantity'] = quantity;
    supplyObj['productType'] = productType;
    supplyObj['notes'] = notes;
    supplyObj['timestamp'] = getTimeStamp();

    fs.readFile(file, function(err, data){
        if(!err){
            var mainObj = JSON.parse(data);
            if(!checkObj(mainObj.supplyDetails)){
               mainObj['supplyDetails'] = [];
               mainObj.supplyDetails.push(supplyObj);
            }else{
                mainObj.supplyDetails.push(supplyObj);
            }

            //finally write the object to local db
            var finalData = JSON.stringify(mainObj);
            fs.writeFile(file, finalData, function(err){
                if(!err){
                    bootbox.alert("Supply details saved successfully!",function(){
                        location.replace('./adminDash.html');
                      });
                }
            });
        }
    })
});