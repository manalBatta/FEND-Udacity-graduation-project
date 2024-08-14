import { checkForLocation } from "./locationChecker.js";
import { isDateWithinAWeek } from "./withinWeekDate.js";

const serverURL = "http://localhost:8081/travelData";

const form = document.getElementById("travelForm");
form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const location = document.getElementById("destination").value;
  const departureDate = document.getElementById("departure-date").value;
  const returnDate = document.getElementById("return-date").value;

  if (!checkForLocation(location)) {
    alert("Please enter a valid location");
    return;
  }

  // Determine if the departure date is within a week or further in the future
  const isWithinWeek = isDateWithinAWeek(departureDate);

  // Calculate the trip length
  const tripLength = calculateTripLength(departureDate, returnDate);

  sendData({ location, departureDate, isWithinWeek, tripLength })
    .then((data) => {
      displayResults(data, tripLength);
    })
    .catch((error) => {
      console.error("Error:", error);
      document.getElementById("weatherForecast").innerHTML = "";
      document.getElementById("locationImage").innerHTML = "";
      document.getElementById("additionalInfo").innerHTML =
        "Error fetching travel data. Please try again later.";
    });
}

function calculateTripLength(departureDate, returnDate) {
  const departure = new Date(departureDate);
  const returnD = new Date(returnDate);
  const differenceInTime = returnD.getTime() - departure.getTime();
  const differenceInDays = differenceInTime / (1000 * 3600 * 24);
  return differenceInDays;
}

async function sendData(data = {}) {
  const response = await fetch(serverURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return await response.json();
}

function displayResults(data, tripLength) {
  const weatherForecast = data.weather || "N/A";
  const locationImage = data.image || "N/A";
  const moreInfo = data.moreInfo || "N/A";

  document.getElementById(
    "weatherForecast"
  ).innerHTML = `<strong>Weather Forecast:</strong> "${weatherForecast}"`;
  document.getElementById(
    "locationImage"
  ).innerHTML = `<img src="${locationImage}" alt="Location Image" />`;
  document.getElementById("additionalInfo").innerHTML = `
        <strong>More Information:</strong> ${moreInfo}<br>
        <strong>Trip Length:</strong> ${tripLength} days
    `;
}

export { handleSubmit };
