import { isValid, parse } from 'date-fns';

export function stringToDate(dateString: string) {
  const dateFormatsToTry = [
    'dd/MM/yyyy HH:mm:ss',
    'HH:mm:ss',
    'EEE MMM dd HH:mm:ss yyyy',
    "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'",
  ];

  for (const dateFormat of dateFormatsToTry) {
    const parsedDate = parse(dateString, dateFormat, new Date());

    if (isValid(parsedDate)) {
      return parsedDate;
    }
  }

  console.error('Unable to parse date:', dateString);
  return null;
}
