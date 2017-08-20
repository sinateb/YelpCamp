var mongoose = require('mongoose');
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
  {
   name:"Cloud's Rest", 
   image:"https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg",
   description: "balh blah blah bah"
  },
  {
   name:"Desert Mesa", 
   image:"https://farm5.staticflickr.com/4233/34955216222_55a9cd88a3.jpg",
   description: "balh blah blah bah"
  },
  {
   name:"Canian Floor", 
   image:"https://farm8.staticflickr.com/7168/6670258309_2e52bdbc6c.jpg",
   description: "balh blah blah bah"
  }
]

function seedDB(){
	//Remove all campgrounds
	Campground.remove({},function(err){
	if(err){
		console.log(err);
	}
	console.log("removed campgrounds!"); 
	//add a few campgrounds
	data.forEach(function(seed){
         Campground.create(seed,function(err,campground){

         	if(err){
         		console.log(err);
         	} else{
         		console.log("added a campground!")
         		//create comment
         		Comment.create({
         			text:"This place is greate but I wish there was internet!",
         			author: "Homer",
         		},function(err,comment){
         			if(err){
         				console.log(err);
         			} else {

         				campground.comments.push(comment);
         				campground.save();
         				console.log("Created new comment!")
         			}
         		})
         	}

         });
	});  
});	
	//add  afew comments
}

module.exports=seedDB;