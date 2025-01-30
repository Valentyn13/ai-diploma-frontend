import {
  calculateCurrentStreak,
  findLongestStreak,
  transformDatesToMarkedDates,
} from '@utils/strike';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import Icon from 'react-native-vector-icons/FontAwesome6';

LocaleConfig.locales.he = {
  monthNames: [
    'ינואר',
    'פברואר',
    'מרץ',
    'אפריל',
    'מאי',
    'יוני',
    'יולי',
    'אוגוסט',
    'ספטמבר',
    'אוקטובר',
    'נובמבר',
    'דצמבר',
  ],
  monthNamesShort: [
    'ינו.',
    'פבר.',
    'מרץ',
    'אפר.',
    'מאי',
    'יוני',
    'יולי',
    'אוג.',
    'ספט.',
    'אוק.',
    'נוב.',
    'דצמ.',
  ],
  dayNames: ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'],
  dayNamesShort: ['א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ש'],
  today: 'היום',
};

LocaleConfig.defaultLocale = 'he';

const colors = {
  primary: '#D66366',
  darkAccent: '#513F73',
  darkest: '#273051',
};

const Header: FC<{ stats: StatProps[] }> = ({ stats }) => {
  return (
    <View className="flex-row items-center justify-between mt-2 mb-6">
      <View className="flex-row items-center">
        {stats.map(({ title, count, key, icon }) => (
          <Stat key={key} count={count} title={title} icon={icon} />
        ))}
      </View>
    </View>
  );
};

interface StatProps {
  key: string;
  count: number;
  title: string;
  icon: JSX.Element;
}

const Strikes: FC<{ dates: Date[] }> = ({ dates }) => {
  const stringDates = [
    ...new Set(dates.map(d => d.toISOString().split('T')[0])),
  ];

  const markedDates = transformDatesToMarkedDates(stringDates);

  const stats = [
    {
      title: 'סך הכל ימים',
      count: stringDates.length,
      key: 'total',
      icon: <Icon name="arrows-left-right-to-line" size={24} color="#273051" />,
    },
    {
      title: 'הכי ארוך',
      count: findLongestStreak(stringDates),
      key: 'longest',
      icon: <Icon name="timeline" size={24} color="#273051" />,
    },
    {
      title: 'נוכחי',
      count: calculateCurrentStreak(stringDates),
      key: 'current',
      icon: <Icon name="arrows-down-to-line" size={24} color="#273051" />,
    },
  ];

  return (
    <>
      <Header stats={stats} />
      <Calendar
        markingType="period"
        markedDates={markedDates}
        style={{ borderRadius: 10 }}
        enableSwipeMonths
        theme={{
          backgroundColor: 'transparent',
          calendarBackground: 'transparent',
          selectedDayBackgroundColor: colors.primary,
          todayTextColor: colors.darkAccent,
          dayTextColor: colors.darkest,
          textDisabledColor: '#BEBEBE',
          arrowColor: colors.darkAccent,
          monthTextColor: colors.darkest,
          textDayFontSize: 14,
          textMonthFontSize: 14,
          textDayHeaderFontSize: 12,
        }}
      />
    </>
  );
};

export default Strikes;

const Stat: FC<StatProps> = ({ title, count, icon }) => {
  return (
    <View className="flex-1 flex-col items-center">
      <View className="w-8 h-8 mb-2">{icon}</View>
      <Text className="text-sm text-black">{title}</Text>
      <Text className="text-lg font-medium text-black">{count}</Text>
    </View>
  );
};
