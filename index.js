//import express , axios and bodyparser modules 
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";


//create an express application and assign it's functions to a const app
const app = express();

//declare a port to use for the server
const port = 3000;

//using express.static to assign the public folder as the images and stylesfolder
app.use(express.static("public"));


//use the app.get to get the home '/' route and render the index.ejs
app.get("/",(req,res)=>{
res.render("index.ejs");
});

//listening to the declared port
app.listen(port,()=>{
console.log("Listening to the port : "+port);
});