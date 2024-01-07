export function stringToDate(dateTimeString) {
  // Split the date and time by the comma
  const [datePart, timePart] = dateTimeString.split(', ');

  // Further split the date and time parts
  const [day, month, year] = datePart.split('/');
  const [hours, minutes, seconds] = timePart.split(':');

  // Construct a new Date object
  const date = new Date(year, month - 1, day, hours, minutes, seconds);

  return date;
}
