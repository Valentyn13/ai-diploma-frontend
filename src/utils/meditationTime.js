import i18n from '@services/localization/i18n';

const meditationTime = (duration, minOnly = false) => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  if (minOnly) {
    return `${minutes} ${i18n.t('minutes')}`;
  }

  let timeStr = '';
  if (hours > 0) {
    timeStr += `${hours} ${i18n.t('hours')} `;
  }
  if (minutes > 0) {
    timeStr += `${minutes} ${i18n.t('minutes')} `;
  }
  if (seconds > 0 && hours === 0) {
    timeStr += `${seconds} ${i18n.t('seconds')}`;
  }

  return timeStr.trim();
};

export default meditationTime;
