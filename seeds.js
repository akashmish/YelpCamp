
// // const mongoose =require('mongoose');
// // const Campground = require('./models/campground');
// // const Comment=require('./models/comment');

// // const data =[
// //     {
// //         name:"Chattishgarh Jungle trek",
// //         image:"https://indiahikes.com/wp-content/uploads/2018/12/Chhattisgarh-jungle-trek-indiahikes-sandhya-12-of-63.jpg",
// //         description:"A trek in chattisgarh"
// //     },
// //     {
// //         name:"Winter trek",
// //         image:"https://indiahikes.com/wp-content/uploads/2018/11/Trekker-and-dayara-meadows-Sudheer-Hegde.jpg",
// //         description:"A trek in chattisgarh"
// //     },
// //     {
// //         name:"Brahmataal",
// //         image:"https://indiahikes.com/wp-content/uploads/2017/03/Brahmatal-Frozen-Lake-Indiahikes-Devang-Thapliyal.jpeg",
// //         description:"A trek in chattisgarh"
// //     }
// // ]

// // function seedDB(){
// //     //Remove all campgrounds
// //     Campground.remove({},function(err){
// //         if(err)
// //         {
// //             console.log(err);}
// //             console.log("Removed Campgrounds!");

// //     //Creating a campground     
// //         data.forEach(function(seed){
// //             Campground.create(seed,function(err,campground){
// //                 if(err)
// //                     {console.log(err);}
// //                 else
// //                     {console.log(" Campground created!");
                
// //     //Creating a Comment
// //                 Comment.create(
// //                     {
// //                         text:"comment1",
// //                         author:"akash"
// //                     },function(err,comment){
// //                     if(err)
// //                         {console.log(err);}
// //                     else
// //                         {
// //                             campground.comments.push(comment);
// //                             campground.save();
// //                             console.log(" Comment created!");
// //                         }

// //                 }); 
// //                 }
// //             });
// //         });
// //     });

  
 
// // }

// // module.export=seedDB();

// var mongoose = require("mongoose");
// var Campground = require("./models/campground");
// var Comment   = require("./models/comment");
 
// var data = [
//     {
//         name: "Cloud's Rest", 
//         image: "https://farm4.staticflickr.com/3795/10131087094_c1c0a1c859.jpg",
//         description: "A black hole is a place in space where gravity pulls so much that even light can not get out. The gravity is so strong because matter has been squeezed into a tiny space. This can happen when a star is dying."
//     },
//     {
//         name: "Desert Mesa", 
//         image: "https://farm6.staticflickr.com/5487/11519019346_f66401b6c1.jpg",
//         description: "A black hole is a place in space where gravity pulls so much that even light can not get out. The gravity is so strong because matter has been squeezed into a tiny space. This can happen when a star is dying."
//     },
//     {
//         name: "Canyon Floor", 
//         image: "https://farm1.staticflickr.com/189/493046463_841a18169e.jpg",
//         description: "Because no light can get out, people can't see black holes. They are invisible. Space telescopes with special tools can help find black holes. The special tools can see how stars that are very close to black holes act differently than other stars."
//     }
// ]
 
// function seedDB(){
//    //Remove all campgrounds
//    Campground.remove({}, function(err){
//         if(err){
//             console.log(err);
//         }
//         console.log("removed campgrounds!");
//         Comment.remove({}, function(err) {
//             if(err){
//                 console.log(err);
//             }
//             console.log("removed comments!");
//              //add a few campgrounds
//             data.forEach(function(seed){
//                 Campground.create(seed, function(err, campground){
//                     if(err){
//                         console.log(err)
//                     } else {
//                         console.log("added a campground");
//                         //create a comment
//                         Comment.create(
//                             {
//                                 text: "This place is great, but I wish there was internet",
//                                 author: "Homer"
//                             }, function(err, comment){
//                                 if(err){
//                                     console.log(err);
//                                 } else {
//                                     campground.comments.push(comment);
//                                     campground.save();
//                                     console.log("Created new comment");
//                                 }
//                             });
//                     }
//                 });
//             });
//         });
//     }); 
//     //add a few comments
// }
 
// module.exports = seedDB();