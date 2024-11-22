// Import express, axios, and body-parser modules
import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create an express application
const app = express();

//declare a port to use for the server
//const port = 3000; //for local testing

// Set up EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Ensure the views folder is correctly located

// Assign the public folder for static assets (CSS, images, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse request bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Define the home route
app.get("/", (req, res) => {
  res.render("index");
});

// Export the app for Vercel
export default app; //for vercel deployment


//listening to the declared port locally
//app.listen(port,()=>{
//    console.log("Listening to the port : "+port);
 //   });
