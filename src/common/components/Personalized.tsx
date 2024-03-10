import BgSelector from '@common/components/buttons/BgSelector';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { usePersonalized } from '@services/hooks/usePersonalized';
import { useUser } from '@services/hooks/useUser';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { PersonalizedState } from '../../../types/PersonalizedState';
import CircularSlider from './CircularSlider';
import Clouds from './Clouds';
import { Button } from './buttons/Button';
import Badge from './common/Badge';

const badges: PersonalizedState[] = [
  { key: 'sleepAid', label: 'עזרה בלהירדם', emoji: '🌙', color: '#0d47a1' },
  { key: 'stressRelease', label: 'לשחרר לחצים', emoji: '🍃', color: '#00695c' },
  { key: 'focus', label: 'לתפוס פוקוס', emoji: '🎯', color: '#bf360c' },
  {
    key: 'panicReduction',
    label: 'להוריד פאניקה',
    emoji: '🧘‍♂️',
    color: '#004d40',
  },
  {
    key: 'innerPeace',
    label: 'למצוא שלווה פנימית',
    emoji: '☮️',
    color: '#1a237e',
  },
  {
    key: 'selfCompassion',
    label: 'לפתח חמלה עצמית',
    emoji: '❤️',
    color: '#880e4f',
  },
  {
    key: 'emotionRegulation',
    label: 'וויסות רגשות',
    emoji: '🌡️',
    color: '#b71c1c',
  },
  {
    key: 'sadnessReduction',
    label: 'הפחתת עצבים',
    emoji: '😌',
    color: '#263238',
  },
  { key: 'gratitude', label: 'הכרת תודה', emoji: '🙏', color: '#3e2723' },
  { key: 'dayStart', label: 'תחילת יום', emoji: '🌅', color: '#1b5e20' },
  {
    key: 'anxietyReduction',
    label: 'הפחתת חרדה',
    emoji: '🍵',
    color: '#004d40',
  },
  { key: 'justPractice', label: 'פשוט לתרגל', emoji: '🔄', color: '#37474f' },
] as const;

export type PersonalizedLabel = (typeof badges)[number]['label'];
export type TimeSlot = 5 | 10 | 20 | 30 | 45 | 60;

const timeSlots: (TimeSlot | 1)[] = [1, 5, 10, 20, 30, 45, 60];

const sliderSize = 220;
const strokeWidth = 4;

const Personalized = () => {
  const { hasPremium } = usePurchases();
  const { navigate } = useNavigation();
  const { getSessionIdsByStateAndTime, pickSession, getTitle, getSubtitle } =
    usePersonalized();
  const [selectedBadge, setSelectedBadge] = useState<string>(badges[0].key);
  const { user } = useUser();
  const [step, setStep] = useState(1);

  const handleSliderChange = (newStep: number) => setStep(newStep);

  const currentSteps = [
    ...timeSlots
      .slice(0, timeSlots.length - 1)
      .filter(
        (_, i) =>
          !!getSessionIdsByStateAndTime(
            badges.find(b => b.key === selectedBadge)!.label,
            i + 1,
          ).length,
      ),
  ];

  function getRangeString(index: number) {
    if (index === 0) {
      return '1-5';
    } else if (index === currentSteps.length) {
      return '45-60';
    } else {
      const start = currentSteps[index - 1];
      const end = currentSteps[index];
      const formattedStart = start < 10 && end > 9 ? ` ${start}` : `${start}`;
      const formattedEnd = end;
      return `${formattedStart}-${formattedEnd}`;
    }
  }

  return (
    <View style={styles.scrollView}>
      <View className="h-[96px]">
        <BlurView
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 16,
          }}
          blurType="light"
          blurAmount={3}>
          <View>
            <Text className="text-left" style={styles.title}>
              {getTitle()} {user.name ?? ''}
            </Text>
            <Text className="text-left text-[#4F4F4F] font-regular text-base">
              {getSubtitle()}
            </Text>
          </View>
          <BgSelector />
        </BlurView>
      </View>
      <View style={styles.sliderContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgeScrollContainer}>
          {badges.map(badge => (
            <Badge
              emoji={badge.emoji}
              key={badge.key}
              label={badge.label}
              isSelected={selectedBadge === badge.key}
              onPress={() => setSelectedBadge(badge.key)}
            />
          ))}
        </ScrollView>
        <CircularSlider
          sliderColor={
            selectedBadge
              ? badges.find(b => b.key === selectedBadge)?.color
              : '#1E2340'
          }
          steps={currentSteps.length - 1}
          initStep={1}
          size={sliderSize}
          strokeWidth={strokeWidth}
          onStepChange={handleSliderChange}>
          <Text
            style={{
              fontSize: 48,
            }}>
            {getRangeString(step)}
          </Text>
          <Text className="text-2xl font-light">דקות</Text>
        </CircularSlider>
      </View>

      <Clouds className="absolute -bottom-10 right-0 w-full h-[252px]" />

      <View className="w-62 self-center mt-10">
        <Button
          bgColor="#1E2340"
          title=" התאם לי מדיטציה ✨"
          onPress={() => {
            const session = pickSession(
              badges.find(b => b.key === selectedBadge)!.label,
              step,
            );

            if (!hasPremium && session.isCategoryLocked) {
              navigate('Subscribe');
            } else {
              navigate('MeditationPlayer', { item: session });
            }
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    zIndex: 100,
    paddingTop: 20,
  },
  percentageText: {
    position: 'absolute',
    fontSize: 32,
    textAlign: 'center',
  },
  scrollView: {
    zIndex: 100,
    flex: 1,
    overflow: 'visible',
  },
  badgeScrollContainer: {
    flexDirection: 'row',
    paddingLeft: 4,
    paddingBottom: 16,
  },
  header: {
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 96,
  },
  title: {
    color: '#2F2F2F',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: theme.fonts.bold,
  },
});

export default Personalized;
