export function stringToDate(dateString) {
  // Split the string into date and time components
  const parts = dateString.split(', ');
  const dateParts = parts[0].split('/'); // ["MM", "DD", "YYYY"]
  const timeParts = parts[1].trim().split(':'); // ["HH", "mm", "ss"]

  // Construct a new date (Note: month is 0-indexed in JS Dates)
  const result = new Date(
    parseInt(dateParts[2]), // year
    parseInt(dateParts[0]) - 1, // month, 0-indexed
    parseInt(dateParts[1]), // day
    parseInt(timeParts[0]), // hours
    parseInt(timeParts[1]), // minutes
    parseInt(timeParts[2]), // seconds
  );

  if (isNaN(result)) {
    console.error('Unable to parse date:', dateString);
    return null;
  }

  return result;
}
