

var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_palace", { useNewUrlParser: true } )

// var palaces = [
//     {name:"Palais de Versailles", image:"https://www.tripsavvy.com/thmb/MYp3ZNtnA90fAy2RkknlKl9ts1I=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-544355433-5a999b3c04d1cf0038ba9716.jpg"},
//     {name:"Buckingham Palace", image:"https://media.timeout.com/images/100686093/image.jpg"},
//     {name:"Alhambra", image:"https://www.livingtours.com/media/catalog/product/cache/2/image/830x545/17f82f742ffe127f42dca9de82fb58b1/s/h/shutterstock_alhambra3.jpg"},
// ]
var palaceSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
});

var Palace = mongoose.model("Palace", palaceSchema)

// Palace.create({ name: "Palais de Versailles", image: "https://www.tripsavvy.com/thmb/MYp3ZNtnA90fAy2RkknlKl9ts1I=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-544355433-5a999b3c04d1cf0038ba9716.jpg", 
// description: "This is by far the most famous french palace. Constructed by King Louis XIV, it served as the palace for the french royalty ever since.",
// },
//  function (err, palace) {
//     if (err) {
//         console.log(err);
        
//     } else{
//         console.log(palace)
//     }
// })

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.listen(3000, function () {
    console.log("Hello!")
});
app.post("/palaces", function (req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newPalace = {name: name, image: image, description: description};
    Palace.create(newPalace, function (err, palaces) {
        if (err) {
            console.log(err)
        } else {
            res.redirect("/palaces");
        }
    });
});
app.get("/palaces/new", function (req, res) {
    res.render("new")
});
app.get("/", function (req, res) {
    res.render("landing")
});

app.get("/palaces/:id", function (req, res) {
    Palace.findById(req.params.id, function (err, foundPalace) {
        if (err) {
            console.log(err)
        } else{
            res.render("show", {palaces:foundPalace});
        }
    })

})
app.get("/palaces", function (req, res) {
    Palace.find({}, function (err, palaces) {
        if (err) {
            console.log(err)
        } else{
            res.render("index", {palaces:palaces});
        }
    });
});