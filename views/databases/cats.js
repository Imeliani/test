var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cat_app");

var catSchema = new mongoose.Schema({
    name:String,
    age: Number,
    temperament: String,
});

var Cat = mongoose.model("Cat", catSchema);

// var yeet = new Cat({
//     name: "Yeet",
//     age: 11,
//     temperament: "yeety",
// });

// yeet.save(function (err, cat) {
//     if(err){
//         console.log(err);
//     } else {
//         console.log(cat)
//     }
// });
Cat.create({
name: "yat",
age: 11,
temperament: "yeety",
}, function (err, cats) {
        if(err){
            console.log(err);
        } else {
            console.log(cats)
        }
})
Cat.find({}, function (err, cats) {    
    if (err) { console.log(err);
        
    } else{
        console.log(cats);
    }
});