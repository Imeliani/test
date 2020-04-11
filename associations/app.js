var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo", {useUnifiedTopology: true, useNewUrlParser: true});

var postSchema = new mongoose.Schema({
    title: String,
    content: String
});
var Post = mongoose.model("Post", postSchema);

var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
var user = mongoose.model("User", userSchema);



var newUser = new user({
    email: "iurmomm",
    name: "edrftgyhuj"
});
newUser.posts.push({
    title: "okbuddy",
    content: "retard"
});
// newUser.save(function(err, user){
//     if(err){
//         console.log(err)
//     } else{
//         console.log(user)
//     }
// });

// var newPost = new Post({
//     title: "ur mom",
//     content: "joe mama"
// });
// newPost.save(function(err, post){
//     if(err){
//         console.log(err)
//     } else{
//         console.log(post)
//     }
// });

user.findOne({name: "yassine meliani"}, function(err, user) {
    if (err) {
        console.log(err)
    } else {
        user.posts.push({
            title: "dsnajuvhnis",
            content: "5"
        });
        user.save(function(err, user) {
            if (err) {
                console.log(err)
            } else {
                console.log(user)
            }
        });
    }
});




// this my initial commit
// this my initial commit
