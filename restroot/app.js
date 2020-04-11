var express     = require("express");
var app         = express();
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var mongoose    = require("mongoose");



mongoose.connect("mongodb://localhost/blog", { useUnifiedTopology: true, useNewUrlParser: true  } );
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));


var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
var Blog = mongoose.model("Blog", blogSchema);
// Blog.create({
//     title:"test",
//     image:"",
//     body:"test"
// });


app.get("/", function (req, res) {
    res.redirect("/blogs");
})
app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err){
            console.log(err)
        } else {
            res.render("index", {blogs: blogs})
        }
    })
})
app.get("/blogs/new", function (req, res) {
   res.render("new");
});
app.post("/blogs", function (req, res) {
    Blog.create(req.body.blog, function (err, newBlog) {
        if (err){
            console.log(err);
            res.render("new")
        } else{
            res.redirect("/blogs")
        }
    })
});
app.get("/blogs/:id", function (req, res) {
    Blog.findById(req.params.id, function (err, foundBlog) {
       if (err){
           res.redirect("/blogs");
       }  else{
           res.render("show", {blog: foundBlog})
       }
    });
});
app.get("/blogs/:id/edit", function (req, res) {
    Blog.findById(req.params.id, function(err, editedblog){
        if (err){
            res.redirect("/blogs")
        } else{
            res.render("edit", {blog: editedblog});
        }
    })
});
app.put("/blogs/:id", function(req, res){
    Blog.findByIdAndUpdate(req.params.id, req.body.blog, function(err, updatedBlog){
        if (err){
            res.redirect("/blogs/"+req.params.id+"/edit");
        } else{
            res.redirect("/blogs/"+req.params.id);
        }
    })
});
app.delete("/blogs/:id", function(req, res){
    Blog.findByIdAndRemove(req.params.id, function(err){
        if (err){
            res.redirect("/blogs")
        } else{}
            res.redirect("/blogs")
    })
});



app.listen(12672, function () {
    console.log("Hello, Blog")
});

//ibhibibib