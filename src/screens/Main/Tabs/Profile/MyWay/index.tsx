import Divider from '@common/components/Divider';
import { SubTitle } from '@common/components/Styled';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation } from '@react-navigation/native';
import { getRandomElementsByDay } from '@utils/rand';
import { stringToDate } from '@utils/string';
import React, { FC, PropsWithChildren } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

import Badges from './Badges';
import MyCollections from './MyCollections';
import ProgressBar from './ProgressBar';
import Strikes from './Strikes';
import UserMetrics from './UserMetrics';

const Title = styled(SubTitle)`
  font-size: 24;
  font-weight: bold;
`;

const quoteData = [
  'בפשטות של הרגע הזה, טמונה האמת של הקיום.',
  'השלום אינו נמצא בעולם החיצוני, אלא בשקט הפנימי.',
  'חבק את ההווה בקבלה, כי זהו הרגע היחיד שבאמת יש לנו.',
  'הצמיחה היא המסע ממי שהיית למי שתבחר להיות.',
  'מיינדפולנס היא אמנות ההיות נוכח לחלוטין, חי לחלוטין.',
  'תנו לעבר ללכת, קבלו את מה שהוא, והאמינו במה שיהיה.',
  'חיה כאילו תמות מחר, למד כאילו תחיה לנצח.',
  'בכל רגע יש לקח ללמוד.',
  'המורה החכם אינו כובל אותך להכנס למעון החכמה שלו, אלא מוביל אותך למפתן ההכרה שלך.',
  'אמנות החיים היא לחיות ברגע הזה.',
  'אדם חייב להיות מוכן לוותר על מי שהוא, כדי להפוך למי שהוא יכול להיות.',
  'החוכמה של החיים מתגלה בקבלה של כל רגע כמו שהוא.',
  'על אדם קודם להנחות את עצמו בדרך שלו. רק לאחר מכן יוכל להנחות אחרים.',
  'היופי של החיים נמצא בפרטים הקטנים.',
  'אהבה היא היכולת לראות את הטוב באחרים, גם כשהם לא רואים אותו בעצמם.',
  'הצלחה אמיתית מגיעה כאשר אתה מצליח לחיות את חייך בדרך שלך.',
  'כל נשימה היא הזדמנות לחדש את עצמנו.',
  'לחיות ברגע הזה הוא לחיות בשלמות.',
  'אינך יכול לבחור את האירועים בחייך אך כן לבחור את ההתייחסות שלך אליהם.',
  'מציאת האושר בתוך הקשיים היא מפתח לחיים משמעותיים.',
];

const Card: FC<PropsWithChildren> = ({ children }) => (
  <View className="rounded-lg p-4 bg-[#273051]/10">{children}</View>
);

const totalMinutesMeditated = 202000;
const challengeTotal = 1000000;
const progress = totalMinutesMeditated / challengeTotal;

const MyWay = ({ navigation }) => {
  const { navigate } = useNavigation();
  const { meditationsPracticed } = useSelector(state => state.userProgress);
  const dates = meditationsPracticed.map(m => stringToDate(m.timestamp));

  return (
    <View className="flex-1 bg-[#fdedd6]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="absolute right-5 top-5">
          <CircleButton
            backgroundColor="#00000060"
            color="white"
            size={40}
            icon="gear"
            onPress={() => {
              // @ts-ignore
              navigate('Main', {
                screen: 'Tabs',
                params: {
                  screen: 'Profile',
                  params: { screen: 'SettingsNavigator' },
                },
              });
            }}
          />
        </View>
        <View className="px-5 mt-16">
          <Text className="mt-4 mb-6 text-center text-lg italic font-medium text-black">
            - "{getRandomElementsByDay<string>(quoteData, 1)[0]}"
          </Text>

          <Title className="mb-5" t="אתגר מיליון דקות מדיטציה:" />
          <Card>
            <View className="flex-row justify-between mb-4">
              <Text>{totalMinutesMeditated} דקות סך הכל</Text>
              <Text>{Math.round(progress * 100)}%</Text>
            </View>
            <ProgressBar progress={Math.round(progress * 100)} />
          </Card>
          <Divider className="mb-6 mt-4" />

          <Title className="mb-5" t="הרגעים שלי" />
          <Card>
            <UserMetrics />
            <View className="my-3" />
            <Badges />
          </Card>
          <Divider className="mb-6 mt-4" />
        </View>
        <View className="px-5">
          <Title className="mb-5" t="המסלול שלי" />
          <Card>
            <Strikes dates={dates} />
          </Card>
          <Divider className="mb-6 mt-4" />
        </View>
        <View className="pb-4">
          <MyCollections />
        </View>
      </ScrollView>
    </View>
  );
};
export default MyWay;
