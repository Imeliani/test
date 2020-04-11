const util = require('util');
var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_2", {useUnifiedTopology: true, useNewUrlParser: true});

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    }]
});
var user = mongoose.model("User", userSchema);

// user.create({
//    email: "boo@gmail.com",
//    name: "ur mom"
// });
//

// Post.create({
//    title: "cooking mom 5",
//    content: "the fitness gram taser test"
// }, function (err, post) {
//     user.findOne({email: "boo@gmail.com"}, function (err, foundUser) {
//         if(err){
//             console.log(err);
//         } else{
//             foundUser.posts.push(post);
//             foundUser.save(function(err, data){
//                 if (err){
//                     console.log(err)
//                 } else{
//                     console.log(data)
//                 }
//             });
//         }
//     });
// });

user.find({email: "boo@gmail.com"}).populate("posts").exec(function(err, user){
    if(err){
        console.log(err);
    } else{
        console.log(util.inspect(user, false, null, true /* enable colors */))
    }
});