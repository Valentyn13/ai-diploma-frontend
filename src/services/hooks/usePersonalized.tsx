import { getPeriodOfDay } from '@utils/time';

import { useUser } from './useUser';

export const usePersonalized = () => {
  const { user } = useUser();

  const getTitle = () => {
    const periodTime = getPeriodOfDay();

    if (periodTime === 'morning') {
      return 'Добрий ранок ';
    } else if (periodTime === 'noon') {
      return ' Доброго дня';
    } else if (periodTime === 'afternoon') {
      return 'Добрый день  ';
    } else if (periodTime === 'evening') {
      return 'Добрий вечір';
    } else {
      return 'На добраніч';
    }
  };

  const getSubtitle = () => {
    const periodTime = getPeriodOfDay();

    if (periodTime === 'morning') {
      return user.sex === 'M' ? 'Почни день правильно' : 'Почни день правильно';
    } else if (periodTime === 'noon') {
      return user.sex === 'M'
        ? 'Знайди хвилинку для себе'
        : 'Знайди хвилинку для себе';
    } else if (periodTime === 'afternoon') {
      return user.sex === 'M'
        ? 'Невелика перерва посеред дня'
        : 'Невелика перерва посеред дня';
    } else if (periodTime === 'evening') {
      return user.sex === 'M'
        ? 'Завершуй день на хорошій ноті'
        : 'Завершуй день на хорошій ноті';
    } else {
      return user.sex === 'M'
        ? 'Розслабся перед глибоким і спокійним сном'
        : 'Розслабся перед глибоким і спокійним сном';
    }
  };

  return {
    getTitle,
    getSubtitle,
  };
};
