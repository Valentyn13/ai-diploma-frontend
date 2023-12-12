import i18n from '@services/localization/i18n';

const meditationTime = (duration, minOnly = false) => {
  const min = Math.floor(duration / 60);
  if (minOnly) {
    return `${min} ${i18n.t('minutes')}`;
  }
  const sec = duration % 60;
  return `${min} ${i18n.t('minutes')} ${sec} ${i18n.t('seconds')}`;
};

export default meditationTime;
