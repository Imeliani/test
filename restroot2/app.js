var express = require("express");
var app = express();
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

mongoose.connect("mongodb://localhost/blog", {useUnifiedTopology: true, useNewUrlParser: true});
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride("_method"));

var bookSchema = new mongoose.Schema({
   title: String,
   author: String,
   genre: String,
   resume: String,
   cover: String,
});
var Book = mongoose.model("Book", bookSchema);

// Book.create({
//     title: "1984",
//     author: "George Orwell",
//     genre: "Dystopian",
//     resume: "In a totalitarian future society, a man, whose daily work is re-writing history, tries to rebel by falling in love. In the year 1984, rocket bombs and rats prey on the inhabitants of the crumbling metropolis of London. Far away on the Malabar Front, a seemingly interminable war rages against Eastasia",
//     cover: "https://images-na.ssl-images-amazon.com/images/I/410ZirPKXKL._SX331_BO1,204,203,200_.jpg"
// });

app.get("/", function(req, res){
    res.redirect("/books")
});
app.get("/books", function(req, res){
    Book.find({}, function(err, books){
        if (err){
            console.log(err);
        } else{
            res.render("index", {books:books});
}
    });
});
app.get("/books/new", function (req, res) {
    res.render("new");
});
app.post("/books", function(req, res){
   Book.create(req.body.book, function(err, newBook){
       if(err){
           console.log(err);
           res.render("new")
       } else {

           res.redirect("/books")
       }
   });
});


app.listen(3232, function () {
    console.log("server's running on port 3232");
});