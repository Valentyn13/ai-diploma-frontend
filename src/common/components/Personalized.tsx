import { useUser } from '@services/hooks/useUser';
import React, { useState } from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import CircularSlider from './Circular';
import Gradient from './Gradient';
import { Button } from './buttons/Button';
import Badge from './common/Badge';

const badges = [
  { key: 'selfConfidence', label: 'לחזק ביטחון עצמי', emoji: '💪' },
  { key: 'stressRelease', label: 'לשחרר לחצים', emoji: '🍃' },
  { key: 'sleepAid', label: 'עזרה בלהירדם', emoji: '🌙' },
  { key: 'focus', label: 'לתפוס פוקוס', emoji: '🎯' },
  { key: 'panicReduction', label: 'להוריד פאניקה', emoji: '🧘‍♂️' },
  { key: 'innerPeace', label: 'למצוא שלווה פנימית', emoji: '☮️' },
  { key: 'mentalResilience', label: 'חיזוק החוסן הנפשי', emoji: '🏋️‍♂️' },
  { key: 'selfCompassion', label: 'לפתח חמלה עצמית', emoji: '❤️' },
  { key: 'emotionRegulation', label: 'וויסות רגשות', emoji: '🌡️' },
  { key: 'selfAwarenessDevelopment', label: 'פיתוח מודעות עצמית', emoji: '🪞' },
  { key: 'processingDifficultEmotions', label: 'לעבד רגשות קשים', emoji: '💔' },
  { key: 'nature', label: 'חיבור לטבע', emoji: '🌱' },
  { key: 'goalAchievement', label: 'הגשמת מטרות', emoji: '🏆' },
  { key: 'justPractice', label: 'פשוט לתרגל', emoji: '🔄' },
];

const colorMappings = {
  selfConfidence: ['#FFD54F', '#FFCA28', '#FFC107'],
  stressRelease: ['#B2EBF2', '#80DEEA', '#4DD0E1'],
  sleepAid: ['#D1C4E9', '#B39DDB', '#9575CD'],
  focus: ['#81C784', '#66BB6A', '#4CAF50'], // Concentrated, focused greens
  panicReduction: ['#B3E5FC', '#81D4FA', '#4FC3F7'], // Peaceful, calming light blues
  innerPeace: ['#CFD8DC', '#B0BEC5', '#90A4AE'], // Tranquil, inner peace greys
  mentalResilience: ['#FFAB91', '#FF8A65', '#FF7043'], // Strong, resilient oranges
  selfCompassion: ['#F8BBD0', '#F48FB1', '#F06292'], // Warm, compassionate pinks
  emotionRegulation: ['#B2DFDB', '#80CBC4', '#4DB6AC'], // Balanced, stable teals
  selfAwarenessDevelopment: ['#C8E6C9', '#A5D6A7', '#81C784'], // Growing, self-aware greens
  processingDifficultEmotions: ['#E57373', '#EF5350', '#F44336'], // Intense, emotional reds
  nature: ['#C8E6C9', '#A5D6A7', '#81C784'], // Natural, earthy greens
  goalAchievement: ['#FFD180', '#FFAB40', '#FF9100'], // Motivating, achievement oranges
  justPractice: ['#FFF176', '#FFEE58', '#FFEB3B'], // Persistent, practice yellows
};

const Personalized = () => {
  const [selectedBadge, setSelectedBadge] = useState<string>();
  const { user } = useUser();
  const [minutes, setMinutes] = useState(15);

  const handleSliderChange = (step: number) => {
    setMinutes(step * 5);
  };

  const sliderSize = 260;
  const strokeWidth = 10;

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.card}>
        <Image
          source={{ uri: 'https://rega.co.il/images/michael.png' }}
          style={styles.avatar}
        />
        <Text style={styles.title}>ערב טוב {user.name ?? ''},</Text>
        <Text style={styles.subtitle}>איזה תרגול תרצה לבצע היום?</Text>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.badgeScrollContainer}>
          {badges.map(badge => (
            <Badge
              key={badge.key}
              label={badge.label}
              emoji={badge.emoji}
              isSelected={selectedBadge === badge.key}
              onPress={() => setSelectedBadge(badge.key)}
            />
          ))}
        </ScrollView>

        <Text style={styles.subtitle}>כמה זמן תרצה להקדיש לתרגול?</Text>

        <View style={styles.sliderContainer}>
          <Text style={styles.percentageText}>{`${minutes} דקות`}</Text>

          <CircularSlider
            initStep={minutes / 5}
            size={sliderSize}
            strokeWidth={strokeWidth}
            onStepChange={handleSliderChange}>
            <View
              style={{
                position: 'absolute',
                top: 30 + strokeWidth,
                left: strokeWidth,
                width: sliderSize - strokeWidth * 2,
                height: sliderSize - strokeWidth * 2,
                borderRadius: 99,
                overflow: 'hidden',
              }}>
              <Gradient
                colors={
                  selectedBadge ? colorMappings[selectedBadge] : ['#F7F7F7']
                }
              />
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  borderRadius: 99,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.percentageText}>{`${minutes} דקות`}</Text>
              </View>
            </View>
          </CircularSlider>
        </View>

        <Button
          title="התאם מדיטציה ✨"
          onPress={() => {
            console.log('התאם מדיטציה');
          }}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    position: 'absolute',
    top: -30,
    borderColor: 'white',
    borderWidth: 2,
    backgroundColor: '#F1F1F1',
    alignSelf: 'center',
  },
  sliderContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  percentageText: {
    position: 'absolute',
    fontSize: 32,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    overflow: 'visible',
  },
  badgeScrollContainer: {
    flexDirection: 'row',
    paddingVertical: 20,
    paddingLeft: 20,
  },
  card: {
    overflow: 'visible',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingBottom: 20,
    paddingTop: 70,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  title: {
    textAlign: 'right',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: 'gray',
  },
  buttonText: {
    color: 'white',
  },
  slider: {
    width: 200,
    height: 40,
  },
});

export default Personalized;
