const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

var items = ["100 Pushups", "100 situps", "1km run (cardio)"];

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));

//to set the views directory as static to load the resources in it for the ejs file
app.use(express.static("views"))

//to get the content on the home page
app.get("/", function(req, res) {
    
    //getting the date method saved in an object to bring the present date
    var today = new Date();

    //setting the parameters and types for the date method
    var options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    };

    //calling the today object and adding the toLocalDateString method with it to assign it to US english and 
    //the applying the options to it
    var Day = today.toLocaleDateString("en-US", options);

    //rendering out the present day value stored in var 'day' as "present" on ejs and 
    res.render("list", {present: Day, it: items});
})

//Using the post method to accept the inputed value from the page and work with it thereafter
app.post("/", function (req, res) {
    //accepting the requested data from inputed through the inputs available in the page
    var post = req.body.newListItem;

    //to push the present entered value in the input area to the items array (to render it as a list item later)
    items.push(post);

    //to redirect to the page reloading it as a result and also cresting the new list items...
    res.redirect("/")
})

//to host the server on a local server of "4000" and making the browser listen to it
app.listen(4000, function() {
    console.log("Server is online at port 4000");
})