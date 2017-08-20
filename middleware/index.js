var Campground = require("../models/campground");
var Comment = require ("../models/comment");

//all middlewares goeshere
var middlewareObj = {};

middlewareObj.checkCampgroundOwnership = function(req,res,next){
 //is user logged in?
	if(req.isAuthenticated()){
		Campground.findById(req.params.id,function(err,foundCampground){
		if(err){
               req.flash("error","The campground not found!")
			res.redirect("back");
		}
		else{
			//is user owner of campground
			if(foundCampground.author.id.equals(req.user._id)){
				next();
			} else{
                    req.flash("error","You don't have permission!")
				res.render("back")
			}
           
		}

	});

	} else{
		
          req.flash("error","You need to be logged in!")
		res.redirect("back");
	}	
};

middlewareObj.checkCommentOwnership = function(req,res,next){
 //is user logged in?
     if(req.isAuthenticated()){
          Comment.findById(req.params.comment_id,function(err,foundComment){
          if(err){
               req.flash("error","Something went wrong!")
               res.redirect("back");
          }
          else{
               //is user owner of comment
               if(foundComment.author.id.equals(req.user._id)){
                    next();
               } else{
                    req.flash("error","You don't have permissino!")
                    res.render("back")
               }
           
          }

     });

     } else{
          req.flash("error","You need to be logged in!")
          res.redirect("back");
     }    
}

middlewareObj.isLoggedIn = function(req,res,next){
     if(req.isAuthenticated()){
          return next();
     }
     req.flash("error","You need to be loggedin to create!")
     res.redirect("/login");
}


module.exports = middlewareObj;