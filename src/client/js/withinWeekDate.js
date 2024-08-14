function isDateWithinAWeek(travelDate) {
  // Convert the input date string to a Date object
  const inputDate = new Date(travelDate);

  // Get the current date and set the time to midnight
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Calculate the difference in time (in milliseconds)
  const timeDifference = inputDate.getTime() - currentDate.getTime();

  // Calculate the difference in days
  const daysDifference = timeDifference / (1000 * 3600 * 24);

  // Check if the difference is within a week
  return daysDifference <= 7 && daysDifference >= 0;
}

export { isDateWithinAWeek };
