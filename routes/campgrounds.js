var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware")


router.get("/campgrounds",function(req,res){
Campground.find({},function(err,allCampgrounds){
	if(err){
		console.log(err);
	}else{
		res.render("campgrounds/index",{campgrounds:allCampgrounds,currentUser:req.user});
	}

});	
});

router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
	res.render("campgrounds/new");
});

//Show more info for campgounds
router.get("/campgrounds/:id",function(req,res){
	
     Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
     	if(err){
     		console.log(err);

     	}else{
     		console.log(foundcampground);
            res.render("campgrounds/shows",{campground:foundcampground});
     	}
     });
});

// add a new campground to DB
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
	var name=req.body.name;
	var price=req.body.price;
	var image=req.body.image;
	var description=req.body.description;
	var author = {
		id:req.user._id,
		username:req.user.username
	}
	var newCampground={name:name,price:price,image:image,description:description,author:author};
	Campground.create(newCampground,function(err, newOneCreeated){
		if(err){
			console.log(err);
		}else{

			res.redirect("/campgrounds");
		}


	});
});

//Edit campground route

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,function(req,res){
	
    Campground.findById(req.params.id,function(err,foundCampground){
		
		res.render("campgrounds/edit",{campground:foundCampground});
});
});

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
//find and update right campground
Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
	if(err){
		rediredt("/campground");
	} else{
		res.redirect("/campgrounds/"+req.params.id);
	}
});
});

// Delete campground route

router.delete("/campground/:id",middleware.checkCampgroundOwnership,function(req,res){
	Campground.findByIdAndRemove(req.params.id,function(err){
		if(err){
			res.redirect("/campgrounds");
		} else{
			res.redirect("/campgrounds");
		}
	});
});
module.exports = router;