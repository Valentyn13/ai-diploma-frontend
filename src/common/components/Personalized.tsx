import BgSelector from '@common/components/buttons/BgSelector';
import { TIME_SLOTS } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { BlurView } from '@react-native-community/blur';
import { useNavigation } from '@react-navigation/native';
import { usePersonalized } from '@services/hooks/usePersonalized';
import { useUser } from '@services/hooks/useUser';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';

import CircularSlider from './CircularSlider';
import Clouds from './Clouds';
import { Button } from './buttons/Button';
import Badge from './common/Badge';

const sliderSize = 220;
const strokeWidth = 4;

const Personalized = () => {
  const { hasPremium } = usePurchases();
  const { navigate } = useNavigation();
  const {
    getSessionIdsByStateAndTime,
    pickSession,
    getTitle,
    getSubtitle,
    getOrderedStatesByTime,
  } = usePersonalized();
  const states = getOrderedStatesByTime();

  const [selectedBadge, setSelectedBadge] = useState<string>(states[0].key);
  const { user } = useUser();
  const [step, setStep] = useState(1);

  const handleSliderChange = (newStep: number) => setStep(newStep);
  const selected = states.find(b => b.key === selectedBadge)!;

  const currentSteps = [
    1,
    ...TIME_SLOTS.slice(1, TIME_SLOTS.length).filter((_, i) => {
      return !!getSessionIdsByStateAndTime(selected.label, i + 1).length;
    }),
  ];

  function getRangeString(index: number) {
    if (index === 0) {
      return '1-7';
    } else if (index === currentSteps.length) {
      return '60+';
    } else {
      const start = currentSteps[index - 1];
      const end = currentSteps[index];
      const formattedStart = start < 10 && end > 9 ? ` ${start}` : `${start}`;
      const formattedEnd = end;
      return `${formattedStart}-${formattedEnd}`;
    }
  }

  const [isLoading, setIsLoading] = useState(false);

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
          {states.map(badge => (
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
              ? states.find(b => b.key === selectedBadge)?.color
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

      <Clouds className="absolute -bottom-9 right-0 w-full h-[252px]" />

      <View className="self-center mt-12">
        <Button
          bgColor="#1E2340"
          title={
            <View
              style={{ width: 160, height: 28 }}
              className="flex flex-row items-center justify-center gap-1">
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text className="text-white text-base font-semibold">
                    התאם לי מדיטציה
                  </Text>
                  <Svg viewBox="0 0 51 61" fill="none" className="w-6 h-6">
                    <Path
                      fill="#fff"
                      d="M24.722 12.58C21.833 9.69 19.856 4.642 18.875.051c-.983 4.592-2.958 9.64-5.847 12.53C10.138 15.468 5.09 17.445.5 18.43c4.592.98 9.639 2.957 12.527 5.846 2.89 2.89 4.866 7.936 5.85 12.528.98-4.593 2.957-9.64 5.845-12.53 2.889-2.888 7.937-4.864 12.527-5.848-4.591-.98-9.638-2.958-12.528-5.847ZM43.486 35.717c-1.724-1.725-2.908-4.742-3.494-7.484-.587 2.742-1.766 5.759-3.492 7.485-1.727 1.724-4.742 2.906-7.484 3.493 2.743.587 5.758 1.768 7.484 3.494 1.726 1.725 2.907 4.741 3.494 7.484.586-2.744 1.767-5.759 3.493-7.485 1.725-1.725 4.741-2.907 7.483-3.495-2.742-.586-5.758-1.767-7.484-3.492ZM12.886 41.619c-.493 2.302-1.483 4.835-2.932 6.284-1.449 1.448-3.98 2.44-6.283 2.933 2.302.494 4.834 1.483 6.283 2.933 1.449 1.448 2.44 3.98 2.934 6.283.492-2.304 1.483-4.835 2.932-6.284 1.448-1.449 3.98-2.44 6.282-2.934-2.302-.492-4.834-1.483-6.283-2.932-1.448-1.448-2.44-3.98-2.933-6.283Z"
                    />
                  </Svg>
                </>
              )}
            </View>
          }
          onPress={() => {
            setIsLoading(true);

            setTimeout(() => {
              const session = pickSession(
                states.find(b => b.key === selectedBadge)!.label,
                step,
              );

              if (!hasPremium && session.isCategoryLocked) {
                navigate('Subscribe');
              } else {
                navigate('MeditationPlayer', { item: session });
              }

              setIsLoading(false);
            }, 2500);
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
