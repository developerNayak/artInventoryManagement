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

$(document).ready(()=>{
    var searchQuery = localStorage.getItem('searchQuery');
    $('.infoText').text(searchQuery+' Details');
    if(checkValue(searchQuery)){
        fs.readFile(file, function(err, data){
            if(!err){
                var mainObj = JSON.parse(data);
                var displayDetails = mainObj.supplyDetails.filter(item=>item.supplyType===searchQuery);
                var markup = '';

                displayDetails.map(function(item,idx){
                    markup += '<div class="col-md-4"> <div class="card card-profile"><div class="card-header card-header-image"><a href="#pablo">\
                    <img class="img" src="./images/stationary.jpg"></a>\
                    <div class="colored-shadow" style="background-image: url("./images/stationary.jpeg"); opacity: 1;"></div></div>\
                    <div class="card-body">\
                    <h4 class="card-title product">Supply: '+item.supplyType+'</h4>\
                    <h4 class="card-title brand">Brand: '+item.brand+'</h4>\
                    <h4 class="card-title type">Type: '+item.supplyType+'</h4>\
                    <h4 class="card-title size">Size: '+item.size+'</h4>\
                    <h4 class="card-title comments">Comments: '+item.notes+'</h4>\
                    <h6 class="card-category quantity">Quantity :'+item.quantity+'</h6>\
                    <h4 class="card-title text-gray">Last Modified: '+item.timestamp+'</h4>\</div></div></div>';
                });

                $('.displayDiv').append(markup);
            }
        })
    }
});