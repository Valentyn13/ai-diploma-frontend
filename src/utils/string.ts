import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';

dayjs.extend(customParseFormat);

const dateFormatsToTry = [
  'ddd MMM D HH:mm:ss YYYY',
  'ddd MMM  D HH:mm:ss YYYY',
  'MM/DD/YYYY, h:mm:ss A',
  'DD/MM/YYYY, HH:mm:ss',
  "YYYY-MM-DD'T'HH:mm:ss.SSS'Z'",
];

export function stringToDate(dateString: string) {
  for (let format of dateFormatsToTry) {
    const d = dayjs(dateString, format);
    if (d.isValid()) {
      return d.toDate();
    }
  }
  return new Date();
}
