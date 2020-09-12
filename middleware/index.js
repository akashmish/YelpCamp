//middlewares

var Campground=require("../models/campground");
const Comment=require('../models/comment');
var middlewareObj={};

middlewareObj.checkCampgroundOwnership=function(req,res,next){
        if(req.isAuthenticated()){
            
            Campground.findById(req.params.id,(err,editCampground)=>{
                if(err){
                    req.flash("error","Campground not found.")
                    res.redirect("back");
                }else{
                    if(editCampground.author.id.equals(req.user._id)){
                        
                        next();
                }else{
                    req.flash("error","You don't have permission to do that");
                        res.redirect("back");
                    }
                }           
            });
        }else{
            req.flash("error","You need to be logged n to do that.")
            res.redirect("back");
        };
    }
middlewareObj.checkCommentOwnership=function(req,res,next){
    if(req.isAuthenticated()){
        
        Comment.findById(req.params.comment_id,(err,foundComment)=>{
            if(err){
              
                res.redirect("back");
            }else{
                if(foundComment.author.id.equals(req.user._id)){
                    
                    next();
            }else{
                req.flash("error","You don't have permission to do that.")
                    res.redirect("back");
                }
            }           
        });
    }else{
        req.flash("error","You need to be logged n to do that.")
        res.redirect("back");
    }
}

middlewareObj.isLoggedIn=function(req,res,next){
    if(req.isAuthenticated()){
        return next();
    }
    req.flash("error","You need to be logged n to do that.")
    res.redirect("/login");
}

module.exports= middlewareObj; 