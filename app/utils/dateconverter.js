export function firebaseDateToJSDate(firebaseDate) {
  const timestamp = firebaseDate.seconds;
  const milliseconds = timestamp * 1000 + firebaseDate.nanoseconds / 1e6;
  return new Date(milliseconds);
}

export function formatTime(milliseconds) {
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);

  return `${hours}h ${minutes % 60}m ${seconds % 60}s`;
}

export function addHoursAndMinutes(originalDate, hoursToAdd, minutesToAdd) {
  let hours = isNaN(hoursToAdd) ? 0 : hoursToAdd;
  let minutes = isNaN(minutesToAdd) ? 0 : minutesToAdd;

  const newDate = new Date(originalDate);
  newDate.setHours(newDate.getHours() + hours);
  newDate.setMinutes(newDate.getMinutes() + minutes);
  return newDate;
}
