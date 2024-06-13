import i18n from '@services/localization/i18n';

export function meditationTime(duration: number) {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  let timeStr = '';

  if (hours > 0) {
    timeStr += `${hours} ${i18n.t('hours')} `;
  }
  if (minutes > 0 || hours > 0) {
    timeStr += `${minutes} ${i18n.t('minutes')} `;
  }
  if (seconds > 0 && hours === 0 && minutes === 0) {
    timeStr += `${seconds} ${i18n.t('seconds')}`;
  }

  return timeStr.trim();
}

export default meditationTime;

export function getGreeting() {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 12) {
    return 'בוקר טוב';
  } else if (hours === 12) {
    return 'צהריים טובים';
  } else if (hours < 17) {
    return 'אחר צהריים טובים';
  } else if (hours < 21) {
    return 'ערב טוב';
  } else {
    return 'לילה טוב';
  }
}

export function getBGImageByTime() {
  const id = getPeriodOfDay();

  if (id === 'morning' || id === 'noon' || id === 'afternoon') {
    return 'sunrise';
  } else {
    return 'sunset';
  }
}

export function getPeriodOfDay() {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 5) {
    return 'night';
  } else if (hours < 12) {
    return 'morning';
  } else if (hours < 14) {
    return 'noon';
  } else if (hours < 17) {
    return 'afternoon';
  } else if (hours < 21) {
    return 'evening';
  } else {
    return 'night';
  }
}

export function getCurrentHour() {
  const now = new Date();
  return now.getHours();
}

export function getCurrentDay() {
  const now = new Date();
  return now.getDate();
}

export function getCurrentMonth() {
  const now = new Date();
  return now.getMonth();
}

export function getReadableTimeDifference(pastDateStr: string): string {
  const pastDate = new Date(pastDateStr);
  const now = new Date();

  const differenceInMilliseconds = now.getTime() - pastDate.getTime();

  const seconds = Math.floor(differenceInMilliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) {
    return seconds === 1 ? 'לפני שנייה' : `לפני ${seconds} שניות`;
  } else if (minutes < 60) {
    return minutes === 1 ? 'לפני דקה' : `לפני ${minutes} דקות`;
  } else if (hours < 24) {
    return hours === 1 ? 'לפני שעה' : `לפני ${hours} שעות`;
  } else if (days < 7) {
    return days === 1 ? 'לפני יממה' : `לפני ${days} ימים`;
  } else if (weeks < 4) {
    return weeks === 1 ? 'לפני שבוע' : `לפני ${weeks} שבועות`;
  } else if (months < 12) {
    return months === 1 ? 'לפני חודש' : `לפני ${months} חודשים`;
  } else {
    return years === 1 ? 'לפני שנה' : `לפני ${years} שנים`;
  }
}
