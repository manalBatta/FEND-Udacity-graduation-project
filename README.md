# Travel App

This is a simple Travel App that allows users to get weather forecasts and images of their travel destinations. Users can input a destination, select their departure and return dates, and receive relevant weather information along with an image of the location.

## Features

- **Location Search:** Enter a destination to retrieve relevant data.
- **Weather Forecast:** Get a weather forecast for your destination, based on your departure date.
- **Location Image:** View an image of the destination.
- **Trip Length Calculation:** Calculate and display the length of the trip in days.

## Technologies Used

- **Frontend:**
  - HTML, CSS, JavaScript
  - SCSS for styling
- **Backend:**
  - Node.js with Express
  - API integration with Geonames, Weatherbit, and Pixabay
- **Build Tools:**
  - Webpack for module bundling
  - Workbox for service worker integration

## Setup Instructions
-node :v20.12.1
### Prerequisites

- Node.js installed on your machine.
- NPM (Node Package Manager) or Yarn installed.
- API keys for the following services:
  - [Geonames](https://www.geonames.org/)
  - [Weatherbit](https://www.weatherbit.io/)
  - [Pixabay](https://pixabay.com/)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/travel-app.git
   Navigate to the project directory:
   ```

cd travel-app
Install the necessary dependencies:

npm install
Create a .env file in the root directory and add your API keys:

plaintext

GEONAMES_USERNAME=your_geonames_username
WEATHERBIT_API_KEY=your_weatherbit_api_key
PIXABAY_API_KEY=your_pixabay_api_key
Build the project using Webpack:

npm run build
Running the Server
Start the server:

npm start
The server will run on http://localhost:8081.
