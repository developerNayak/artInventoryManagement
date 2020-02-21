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
                bootbox.alert("No supplies have been added yet. Please add one before checking out");
            }
        }
    })
});

$('#type').change(function(){
  $('#productType').val('');
  $('#brand').val('');
  $('#size').val('');
  var val = $(this).val();
  if(checkValue(val)){
    //reset rest of the dropdown
    fs.readFile(file, function(err, data){
      if(!err){
        var mainObj = JSON.parse(data);
        var brandList = mainObj.supplyDetails.filter(info=>info.supplyType===val).map(x=>x.productType);

        //create the option element
        var options = '<option selected></option>';
        brandList.map(function(item,idx){
          options+='<option>'+item+'</option>';
        });

        $('#productType').html(options);

      }
    });
  }
});

$('#productType').change(function(){
  $('#size').val('');
  $('#brand').val('');
  var type = $('#type').val();
  if(!checkValue(type)){
    bootbox.alert('Please select Supply first.');
    return;
  }
  var val = $(this).val();
  if(checkValue(val)){

    fs.readFile(file, function(err, data){
      if(!err){
        var mainObj = JSON.parse(data);
        var sizeList = mainObj.supplyDetails.filter(info=>info.supplyType===type&&info.productType===val).map(x=>x.brand);

        //create the option element
        var options = '<option selected></option>';
        sizeList.map(function(item,idx){
          options+='<option>'+item+'</option>';
        });
        $('#brand').html(options);
      }
    });
  }
});

$('#brand').change(function(){
  $('#size').val('');
  var type = $('#type').val();
  var productType = $('#productType').val();
  if(!checkValue(type)){
    bootbox.alert('Please select Supply.');
    return;
  }
  if(!checkValue(productType)){
    bootbox.alert('Please select Supply Type.');
    return;
  }
  var val = $(this).val();
  if(checkValue(val)){

    fs.readFile(file, function(err, data){
      if(!err){
        var mainObj = JSON.parse(data);
        var sizeList = mainObj.supplyDetails.filter(info=>info.supplyType===type&&info.productType===productType&&info.brand===val).map(x=>x.size);

        //create the option element
        var options = '<option selected></option>';
        sizeList.map(function(item,idx){
          options+='<option>'+item+'</option>';
        });
        $('#size').html(options);
      }
    });
  }
});

$('#checkOut').click(function(){
  var supplyType = $('#type').val().trim();
  var brand = $('#brand').val().trim();
  var size = $('#size').val().trim();
  var quantity = $('#quantity').val().trim();

  if(!checkValue(supplyType) && !checkValue(brand) && !checkValue(size)
     && !checkValue(quantity)){
      bootbox.alert("Please fill all the fields");
      return;
  }

  if(quantity<1){
    bootbox.alert('Please enter a valid quantity value');
    return;
  }

  fs.readFile(file, function(err, data){
      if(!err){
          var mainObj = JSON.parse(data);
          if(!checkObj(mainObj.supplyDetails)){
            bootbox.alert('Supply Details not found, Please contact Admin',()=>{
              location.replace('./staffDash.html');
            });
          }else{
              mainObj.supplyDetails.map((item,idx)=>{
                if(item.supplyType===supplyType && item.brand===brand && item.size===size){
                    item.quantity = parseInt(item.quantity) + parseInt(quantity);
                    item.timestamp = getTimeStamp();
                }
              });

              //finally write the object to local db
              var finalData = JSON.stringify(mainObj);
              fs.writeFile(file, finalData, function(err){
                  if(!err){
                      bootbox.alert("Supply Checked Out successfully!",()=>{
                        location.replace('./staffDash.html');
                      });
                  }
              });
          }
      }
  })
});