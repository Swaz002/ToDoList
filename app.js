const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();



app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({extended: true}));

//to set the views directory as static to load the resources in it for the ejs file
app.use(express.static("views"))

//connecting to mongoDB server
mongoose.connect("mongodb://localhost:27017/todolistDB", () => {
    console.log("connected to mongo server")
},
e => console.error(e)
);

//Schema for the mongoose DataBase
const itemSchema = {
    items: String
}

//creating the model for the database
const Item = mongoose.model("Item", itemSchema);

//mongoose documents

const List1 = new Item({
    items: "Welcome to the todolist"
})

const List2 = new Item({
    items: "click the + button to add a new item"
})

const List3 = new Item({
    items: "<-- hit this to delete an item"
})





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
    // the var item is a list containing all the objects containing the datas
    Item.find((err, item) => {
        console.log(item.length);
        if(item.length === 0) {
            //saving all the first three documents in the collection
            Item.insertMany([List1, List2, List3], () => {
                console.log("saved all default items")
            },
            e => console.error(e)
            )
            res.redirect('/');
        } else {
            //rendering out the present day value stored in var 'day' as "present" on ejs and 
            res.render("list", {present: Day, it: item});
               
        }
    },
    e => console.error(e)
    )     
    
})

app.get("/work", (req, res) => {
    res.render("list", {present: "Work list", it: [{items:"Me"}, {items: "Myself"}, {items: "I"}]});
})

//Using the post method to accept the inputed value from the page and work with it thereafter
app.post("/", function (req, res) {
    //accepting the requested data from inputed through the inputs available in the page
    const post = req.body.newListItem;

    const newItem = new Item({
        items: post
    });

    //to push the present entered value in the input area to the items array (to render it as a list item later)
    newItem.save().then(() => {console.log("saved new list item")}, e => console.error(e));

    //to redirect to the page reloading it as a result and also cresting the new list items...
    res.redirect("/")
})

//to host the server on a local server of "4000" and making the browser listen to it
app.listen(3000, function() {
    console.log("Server is online at port 3000");
})