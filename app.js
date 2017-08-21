var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var flash = require("connect-flash")
var Campground = require("./models/campground");
var passport = require("passport");
var LocalStrategy = require("passport-local");
var methodOverride = require("method-override");
var User = require("./models/user");
var Comment = require("./models/comment");
var seedDB = require("./seeds");
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    authRoutes = require("./routes/index");



//seedDB();//seed database

mongoose.connect("mongodb://sina:sina54321@ds149613.mlab.com:49613/heroku_xv7t6h25");

app.use(bodyParser.urlencoded({extended: true}));

//passport configuration
app.use(require("express-session")({
	secret:"Rusty again wins cutest dog!",
	resave:false,
	saveUninitialized: false
}));

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());



app.use(express.static(__dirname+"/public"));

app.use(methodOverride("_method"));

app.use(function(req,res,next){
	res.locals.currentUser = req.user;
	res.locals.error = req.flash("error");
	res.locals.success = req.flash("success");
	
	next();
});
app.set("view engine" ,"ejs");
app.set("views",__dirname + "/views");

app.use(commentRoutes);
app.use(campgroundRoutes);
app.use(authRoutes);



app.listen(process.env.PORT || 5000,function(){
  console.log("The YelpCamp Server Has Started!");
});
