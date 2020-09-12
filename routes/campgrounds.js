

const express = require('express');
var router=express.Router();
var methodOverride=require('method-override');
var Campground=require('../models/campground');
const Comment=require('../models/comment');
var middleware=require("../middleware");

router.get("/campgrounds/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new",{currentUser:req.user});
});

router.get("/campgrounds",function(req,res){

Campground.find({},function(err,allcampgrounds){
    if(err)
    {console.log(err);}
    else
    {res.render("campgrounds/campgrounds",{campgrounds:allcampgrounds,currentUser:req.user});}
})
});
router.post("/campgrounds",middleware.isLoggedIn,function(req,res){
    var name=req.body.name;
    var image=req.body.image;
    var desc=req.body.description;
    var author={
        id:req.user._id,
        username:req.user.username
    };
    console.log(req.user);
 
    var newCampground={name:name, image:image,description:desc,author:author};
// create a nerw campground and save to database
Campground.create(newCampground, function(err,newlyCreated){
    if(err)
    {console.log(err);}
    else
    {
        //redirect back to campgreound
        res.redirect("/campgrounds");
    }
})  
});

router.get("/campgrounds/:id",function(req,res){

Campground.findById(req.params.id).populate("comments").exec(function(err,foundcampground){
    if(err)
    {console.log(err);}
    else
    {
       // console.log(foundcampground);
        res.render("campgrounds/show",{campgrounds: foundcampground,currentUser:req.user,campground_id : req.params.id});
    }
});
});

router.get("/campgrounds/:id/edit",middleware.checkCampgroundOwnership,(req,res)=>{
    Campground.findById(req.params.id,(err,editCampground)=>{
                    res.render("campgrounds/edit",{campground:editCampground});
        });
    });
            

router.put("/campgrounds/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err){
            res.redirect("/campgrounds");
        }
        else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});

router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, (req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err, campgroundRemoved) => {
        if (err) {
            console.log(err);
        }
        Comment.deleteMany( {_id: { $in: campgroundRemoved.comments } }, (err) => {
            if (err) {
                console.log(err);
            }
            res.redirect("/campgrounds");
        });
    })
});



module.exports=router;