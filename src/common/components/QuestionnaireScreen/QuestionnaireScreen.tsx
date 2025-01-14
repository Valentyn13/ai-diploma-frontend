import AlertSvgIcon from '@common/assets/icons/AlertSvgIcon';
import image from '@common/assets/images';
import { AMPLITUDE_EVENTS } from '@common/constants';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/native';
import { useLogViewedScreenEvent } from '@services/hooks/amplitude';
import { InsightSteps, useStarterChatStore } from '@store/useStarterChatStore';
import { logAmplitudeEvent } from '@utils/amplitude-helpers';
import { useState } from 'react';
import * as React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const AGREEMENT_LIST = [
  {
    title:
      'שדרגנו את מיכאל כדי להכיר אתכם טוב יותר ולהתאים את התמיכה שלו במיוחד בשבילכם',
    icon: image('stars_agreement'),
    size: 25,
  },
  {
    title:
      'כמה שאלות קצרות (וקצת אישיות) יעזרו למיכאל להעניק לכם הכוונה מדויקת ותובנות משמעותיות ',
    icon: image('notes_agreement'),
    size: 26,
  },
  {
    title: 'אל דאגה – הכל נשמר אנונימי ומאובטח!',
    icon: image('lock_agreement'),
    size: 25,
  },
];

type Props = {
  setStep: (step: InsightSteps) => void;
  shouldShowPaywall: boolean;
};

const QuestionnaireScreen = ({ setStep, shouldShowPaywall }: Props) => {
  const navigation = useNavigation();

  const { setIsStarterChatActivated } = useStarterChatStore(state => ({
    setIsStarterChatActivated: state.setIsStarterChatActivated,
  }));

  const [isAgreementAccepted, setIsAgreementAccepted] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleAgreedPress = async () => {
    logAmplitudeEvent(
      AMPLITUDE_EVENTS.STARTER_CHAT.PRESSED_START_STARTER_CHAT_FLOW,
    );

    if (!isAgreementAccepted) {
      setIsError(true);
      return;
    }

    setIsStarterChatActivated(true);
    setStep('poll');
  };

  const handleLaterPress = () => {
    logAmplitudeEvent(AMPLITUDE_EVENTS.STARTER_CHAT.PRESSED_NOT_NOW_BUTTON);
    navigation.goBack();
  };

  useLogViewedScreenEvent(
    AMPLITUDE_EVENTS.STARTER_CHAT.VIEWED_STARTER_CHAT_AGREEMENT_SCREEN,
    { shouldIgnore: shouldShowPaywall },
  );

  return (
    <ScrollView
      contentContainerStyle={{
        flexGrow: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF8EE',
        paddingHorizontal: 18,
        paddingTop: 10,
        paddingBottom: 20,
      }}>
      <FastImage
        source={image('questionnaire')}
        resizeMode="contain"
        className="w-full aspect-[4/4] mt-[-20px]"
      />

      <Text className="text-[#273051] mt-[-20px] text-[24px] font-semibold text-left">
        מיכאל התחדש! כמה שאלות קצרות יעזרו לו להכיר אותך טוב יותר
      </Text>
      <View className="mt-[18px] w-full">
        {AGREEMENT_LIST.map((item, index) => (
          <View key={index} className="flex-row gap-[11px] w-[95%] mb-[20px]">
            <View
              style={{
                width: item.size,
                height: item.size,
              }}>
              <FastImage source={item.icon} className="w-full h-full" />
            </View>

            <Text className="text-[#494949] text-[16px] text-left">
              {item.title}
            </Text>
          </View>
        ))}
        <View className="w-full flex-row gap-[12px] mt-[20px] mb-[15px]">
          <View className="pt-1">
            <CheckBox
              value={isAgreementAccepted}
              boxType="square"
              style={{ width: 20, height: 20 }}
              onCheckColor="#fff"
              onTintColor="#273051"
              animationDuration={0.1}
              tintColor="#273051"
              onFillColor="#273051"
              tintColors={{ true: '#273051', false: '#273051' }}
              onValueChange={newValue => {
                logAmplitudeEvent(
                  AMPLITUDE_EVENTS.STARTER_CHAT
                    .MARKED_STARTER_CHAT_AGREEMENT_CHECKBOX,
                );

                if (newValue && isError) {
                  setIsError(false);
                }
                setIsAgreementAccepted(newValue);
              }}
            />
          </View>
          <Text className="text-[#00000087] text-[13px] font-medium max-w-[320px] font-medium text-left">
            אני מאשר/ת כי אני מבין/ה שהשירות בבטא ואינו תחליף לייעוץ מקצועי, וכי
            'רגע' אינה אחראית על תוצאות השימוש בצ'אט.
          </Text>
        </View>
        <View className="pt-[35px] relative">
          {isError && (
            <View className="flex-row absolute top-2 left-2 items-center">
              <AlertSvgIcon />
              <Text className="text-[#F90007] text-[13px] font-medium ml-[15px]">
                רגע, שכחת לאשר את התנאים!
              </Text>
            </View>
          )}

          <TouchableOpacity
            onPress={handleAgreedPress}
            className="bg-[#283A7E] p-[16px] w-full rounded-[8px]">
            <Text className="font-bold text-[#FFFFFF] text-center">
              למילוי השאלון
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleLaterPress}
            className="p-[16px] w-full rounded-[8px]">
            <Text className="text-[#3C3C3CB5] font-bold text-center">
              לא עכשיו
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default QuestionnaireScreen;
