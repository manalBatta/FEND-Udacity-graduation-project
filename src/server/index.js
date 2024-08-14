// Setup empty JS object to act as endpoint for all routes
let travelData = {};

// Require Express to run server and routes
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const fetch = require("node-fetch");

dotenv.config();

// Start up an instance of app
let app = express();
const port = 8081;
app.use(cors());

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("dist"));

// Variables for URLs and API keys
const GEONAMES_USERNAME = process.env.GEONAMES_USERNAME;
const WEATHERBIT_API_KEY = process.env.WEATHERBIT_API_KEY;
const PIXABAY_API_KEY = process.env.PIXABAY_API_KEY;
// Start the server and listen on port 8081
app.listen(port, () => {
  console.log("Server is running on localhost:" + port);
});

// POST route to add travel data
app.post("/travelData", async (req, res) => {
  const { location, date, isWithinWeek } = req.body;

  try {
    // Step 1: Get coordinates from Geonames API
    const geonamesURL = `http://api.geonames.org/searchJSON?q=${location}&maxRows=1&username=${GEONAMES_USERNAME}`;
    const geonamesResponse = await fetch(geonamesURL);
    const geonamesData = await geonamesResponse.json();

    const { lat, lng } = geonamesData.geonames[0];

    // Step 2: Get weather data from Weatherbit API
    const weatherbitURL = `https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lng}&key=${WEATHERBIT_API_KEY}&days=${
      isWithinWeek ? 7 : 16
    }`;

    const weatherbitResponse = await fetch(weatherbitURL);
    const weatherbitData = await weatherbitResponse.json();

    const weatherForecast = isWithinWeek
      ? weatherbitData.data[0].weather.description
      : weatherbitData.data[6].weather.description;

    // Step 3: Get an image of the location from Pixabay API
    const pixabayURL = `https://pixabay.com/api/?key=${PIXABAY_API_KEY}&q=${encodeURIComponent(
      location
    )}&image_type=photo`;
    const pixabayResponse = await fetch(pixabayURL);
    const pixabayData = await pixabayResponse.json();

    const locationImage = pixabayData.hits[0]
      ? pixabayData.hits[0].webformatURL
      : "No image available";

    // Store data in travelData object
    travelData = {
      location,
      date,
      weather: weatherForecast,
      image: locationImage,
      moreInfo: `Weather forecast for ${location} on ${date}`,
    };

    res.send(travelData);
  } catch (error) {
    alert("Error:", error);
    res.status(500).send({
      message: "Error retrieving travel data",
      error: error.message,
    });
  }
});

// GET route to retrieve travel data
app.get("/travelData", (req, res) => {
  res.send(travelData);
});
