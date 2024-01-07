import { parse } from 'date-fns';

export function stringToDate(dateString) {
  try {
    // Parse the date string based on the format
    const result = parse(dateString, 'dd/MM/yyyy, HH:mm:ss', new Date());

    return result;
  } catch (error) {
    console.error('Unable to parse date:', dateString);
    return null;
  }
}
