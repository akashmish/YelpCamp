//=============================
//COMMENTS ROUTE
//=============================

var Campground=require("../models/comment");
var express = require('express');
var router=express.Router();
var Campground=require('../models/campground');
var Comment=require('../models/comment');
var middleware=require("../middleware");



router.get("/campgrounds/:id/comments/new",middleware.isLoggedIn,function(req,res){
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {console.log(err);}
        else
        {
            res.render("comments/new",{campground: campground,currentUser:req.user});
        }
    })
});

router.post("/campgrounds/:id/comments",middleware.isLoggedIn,function(req,res){
    //lookup campground using ID
    //create a new comment
    //connect new comment to campground
    //redirect campground to show page
    Campground.findById(req.params.id,function(err,campground){
        if(err)
        {
            req.flash("error","Something went wrong");
            console.log(err);
            res.redirect("/campgrounds");
        }
        else
        {
            Comment.create(req.body.comment,function(err,comment){
                if(err){
                        console.log(err);
                    }
                else{
                    //add username and id to comments
                    comment.author.id=req.user._id;
                    comment.author.username=req.user.username;
                    //save a comments
                    comment.save();
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success","Successfully Added a comment");
                    res.redirect('/campgrounds/'+ campground._id);
                }    

            })
         
        }
    });
});
router.get("/campgrounds/:id/comments/:comment_id/edit",middleware.checkCommentOwnership,function(req,res){
    Comment.findById(req.params.comment_id,function(err,foundComment){
        if(err){
            res.redirect("back");
        }else{
            res.render("comments/edit",{campground_id:req.params.id,comment:foundComment,comment_id:req.params.comment_id});
        }
    })

})

//upDATE comments
router.put("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,updatedComment){
        if(err){
            res.redirect("back");
        }else
        {
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})


router.delete("/campgrounds/:id/comments/:comment_id",middleware.checkCommentOwnership,function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back");
        }
        else
        {
            req.flash("success","Comment succesfully deleted");
            res.redirect("/campgrounds/"+req.params.id);
        }
    })
})



module.exports=router;