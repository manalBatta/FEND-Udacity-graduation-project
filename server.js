// // server.js

// // Setup empty JS object to act as endpoint for all routes
// projectData = {};

// // Require Express to run server and routes
// const express = require("express");
// let cors = require("cors");
// const bodyParser = require("body-parser");

// // Start up an instance of app
// let app = express();
// const port = 3000;
// app.use(cors());

// app.listen(port, listening);
// function listening() {
//   console.log("CORS-enabled web server listening on port " + port);
// }

// /* Middleware */
// // Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());

// // Initialize the main project folder
// app.use(express.static("website"));

// // Setup Server

// // GET route
// app.get("/getWeather", (req, res) => {
//   res.send(projectData);
// });

// // POST route
// app.post("/addWeather", (req, res) => {
//   projectData = req.body;
//   res.send({ message: "Data received successfully", data: projectData });
// });
