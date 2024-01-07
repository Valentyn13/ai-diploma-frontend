export function stringToDate(dateString: string) {
  try {
    return new Date(dateString.replace(/\s+/g, ' '));
  } catch (e) {
    console.error('Unable to parse date:', dateString);
    return new Date();
  }
}
