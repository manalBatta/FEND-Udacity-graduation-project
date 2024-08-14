function checkForLocation(location) {
  // Ensure the location is a string and not empty
  if (typeof location !== "string" || location.trim() === "") {
    return false;
  }

  // Basic validation to check if the location has at least one letter
  const locationPattern = /^[a-zA-Z\s,]+$/;
  return locationPattern.test(location.trim());
}

export { checkForLocation };
