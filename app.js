const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var items = ["100 Pushups", "100 situps", "1km run (cardio)"];

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static("views"))

app.get("/", function(req, res) {
    
    var today = new Date();

    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    var Day = today.toLocaleDateString("en-US", options);

    res.render("list", {present: Day, it: items});
})

app.post("/", function (req, res) {
    var post = req.body.newListItem;
    items.push(post);
    res.redirect("/")
})

app.listen(4000, function() {
    console.log("Server is online at port 4000");
})