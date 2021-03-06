const express = require('express');
const app = express();
const mongoose =require('mongoose');
const bodyParser=require('body-parser');
const Campground=require('./models/campground');
const Comment=require('./models/comment');
const seedDB=require('./seeds');
var passport=require('passport');
var LocalStrategy=require('passport-local');
var passportLocalMongoose=require('passport-local-mongoose');
var User=require('./models/user');
var flash =require('connect-flash');
// mongoose.connect("mongodb://localhost:27017/yelp_camp",{useNewUrlParser:true, useUnifiedTopology: true}); // connect mongoose to the dabasae server

mongoose.connect("mongodb+srv://<Insert user name here>:<insert password here>@cluster0.yepmw.mongodb.net/<dbname>?retryWrites=true&w=majority",{
    useNewUrlParser:true,
    useUnifiedTopology: true
}); // connect mongoose to the dabasae server


var methodOverride=require('method-override');
app.use(methodOverride("_method"));
var commentRoutes=require('./routes/comments');
var campgroundRoutes=require('./routes/campgrounds');
var indexRoutes=require('./routes/index');


app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine","ejs");
app.use(express.static(__dirname+"/public"));
app.use(flash());
const hostname='localhost';
// const port =3000;
//Express Session
app.use(require("express-session")({
    secret:"<insert your secret>",
    resave:false,
    saveUninitialized:false
}));


app.use(function(req,res,next){
    res.locals.currentUser=req.user;
    res.locals.error=req.flash("error");
    res.locals.success=req.flash("success");
    next();
});




//telling express to use passport
app.set('view engine','ejs');
app.use(passport.initialize());
app.use(passport.session());

//they read teh session de seraialize the session and decode it
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use(indexRoutes);
app.use(commentRoutes);
app.use(campgroundRoutes);

// app.listen(port,hostname,()=>{
//     console.log(`The Yelpcamp server is running at ${hostname}: ${port}`);
// });
var port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log("Server Has Started!");
}); 
