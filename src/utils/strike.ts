export function transformDatesToMarkedDates(dates: string[]) {
  dates.sort();

  const markedDates = {};

  const startingDayStyle = {
    startingDay: true,
    color: '#513F73',
    textColor: 'white',
  };
  const endingDayStyle = {
    endingDay: true,
    color: '#513F73',
    textColor: 'white',
  };
  const middleDayStyle = { color: '#513F73', textColor: 'white' };

  for (let i = 0; i < dates.length; i++) {
    const isStreakStart = i === 0 || !isConsecutiveDay(dates[i - 1], dates[i]);
    const isStreakEnd =
      i === dates.length - 1 || !isConsecutiveDay(dates[i], dates[i + 1]);

    if (isStreakStart && isStreakEnd) {
      markedDates[dates[i]] = { ...startingDayStyle, ...endingDayStyle };
    } else if (isStreakStart) {
      markedDates[dates[i]] = { ...startingDayStyle };
    } else if (isStreakEnd) {
      markedDates[dates[i]] = { ...middleDayStyle, ...endingDayStyle };
    } else {
      markedDates[dates[i]] = { ...middleDayStyle };
    }
  }

  return markedDates;
}

function isConsecutiveDay(day1: string, day2: string) {
  const date1 = new Date(day1);
  const date2 = new Date(day2);
  const difference = date2 - date1;
  return difference === 86400000;
}

export function findLongestStreak(dates: string[]) {
  dates.sort();

  let currentStreak = 0;
  let maxStreak = 0;

  for (let i = 0; i < dates.length; i++) {
    if (i === 0 || !isConsecutiveDay(dates[i - 1], dates[i])) {
      if (currentStreak > maxStreak) {
        maxStreak = currentStreak;
      }
      currentStreak = 1;
    } else {
      currentStreak++;
    }
  }

  // Check last streak
  if (currentStreak > maxStreak) {
    maxStreak = currentStreak;
  }

  return maxStreak;
}

export function calculateCurrentStreak(dates: string[]) {
  const today = new Date().toISOString().split('T')[0];

  dates.sort().reverse();

  let currentStreak = 0;
  let foundToday = false;

  for (let i = 0; i < dates.length; i++) {
    if (dates[i] === today) {
      foundToday = true;
      currentStreak = 1;
      continue;
    }

    if (!foundToday || (foundToday && i === 0)) {
      continue;
    }

    // If the current date continues the streak from today
    if (foundToday && isConsecutiveDay(dates[i], dates[i - 1])) {
      currentStreak++;
    } else {
      // Once the streak breaks, exit the loop
      break;
    }
  }

  return currentStreak;
}
