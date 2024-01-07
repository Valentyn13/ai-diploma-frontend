import { isValid, parse } from 'date-fns';

export function stringToDate(dateString: string) {
  const dateFormatsToTry = [
    'EEE MMM d HH:mm:ss yyyy',
    'EEE MMM  d HH:mm:ss yyyy',
    'MM/dd/yyyy, h:mm:ss a',
    'dd/MM/yyyy, HH:mm:ss',
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
