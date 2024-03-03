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
  const id = getCollectionIdByTime();

  if (id === 'morning' || id === 'noon' || id === 'afternoon') {
    return 'sunrise';
  } else {
    return 'sunset';
  }
}

export function getCollectionIdByTime() {
  const now = new Date();
  const hours = now.getHours();

  if (hours < 5) {
    return 'night';
  } else if (hours < 12) {
    return 'morning';
  } else if (hours === 12) {
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
