import CoursesBanner from '@common/components/Banner/CoursesBanner';
import FrequenciesBanner from '@common/components/Banner/FrequenciesBanner';
import Feeling from '@common/components/Feeling';
import HorizontalCollection from '@common/components/HorizontalCollection';
import Personalized from '@common/components/Personalized';
import Welcome from '@common/components/animation/Welcome';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '@screens/RootNavigator';
import useAppData from '@services/hooks/useAppData';
import useAppState from '@services/hooks/useAppState';
import { useOnboarding } from '@services/hooks/useOnboarding';
import { useUser } from '@services/hooks/useUser';
import { ChatCategoriesEnum } from '@store/useCategorizedChatFlowStore';
import { useSheetStore } from '@store/useSheetStore';
import { FC, useCallback, useEffect, useState } from 'react';
import { Button, Modal, Text, View } from 'react-native';
import { CopilotStep, walkthroughable } from 'react-native-copilot';

import ParallaxScroll from './ParallaxScroll';

type FeedProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const CopilotView = walkthroughable(View);

const SAMPLE = [
  {
    id: '1',
    title: 'Спеціалісти з вузьких областей',

    items: [
      {
        id: 'medicine',
        name: 'Поради з медичних питань',
        duration: 10,
        categoryName: 'South',
        image:
          'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/medicine_3.jpeg',
      },
      {
        id: 'engineering',
        name: 'Допомога з точних наук',
        duration: 10,
        categoryName: 'Emergency',
        image:
          'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/engine-best.jpg',
      },
      {
        id: 'law',
        name: 'Юридичні консультації',
        duration: 10,
        categoryName: 'Advance',
        image:
          'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/law-3.jpg',
      },
    ],
  },
];

const SAMPLE_2 = [
  {
    id: '1',
    title: 'Поділись своїми думками',

    items: [
      {
        id: ChatCategoriesEnum.BAD_HABITS,
        name: 'Позбавлення шкідливих звичок',
        duration: 10,
        categoryName: 'Work',
        image:
          'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/55.jpeg',
      },
      {
        id: ChatCategoriesEnum.SELF_DEV,
        name: 'Покращення себе',
        duration: 10,
        categoryName: 'South',
        image:
          'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/44.webp',
      },
      {
        id: ChatCategoriesEnum.ANXIETY,
        name: 'Ліки від тривоги',
        duration: 10,
        categoryName: 'PocketMeditation',
        image:
          'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/abs_4.jpeg',
      },
      {
        id: ChatCategoriesEnum.NEGATIVE,
        name: 'Керування емоціями',
        duration: 10,
        categoryName: 'Sleep',
        image:
          'https://pdf-files-for-ai.s3.eu-north-1.amazonaws.com/images/abs_5.jpeg',
      },
    ],
  },
];

const Feed: FC<FeedProps> = ({ navigation, copilot }) => {
  const { getAppData } = useAppData();

  const {
    user: { sex },
  } = useUser();

  const { isOldUser, updateIsOldUser } = useOnboarding(navigation);

  const onForeground = useCallback(() => {
    getAppData();
  }, [getAppData]);

  useAppState({
    onForeground,
  });

  const setIsOpen = useSheetStore((state: any) => state.setIsOpen);

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      <View className="flex-1">
        <ParallaxScroll>
          <View className="relative">
            <Personalized />
            <View className="relative bg-[#FFF7EE] pb-[20px]">
              <View className="mt-10" />

              <CopilotStep
                text="Як ви зараз себе почуваєте?"
                order={3}
                name="howufeel">
                <CopilotView copilot={copilot} className="mt-[24px] my-[20px]">
                  <View className="flex w-full items-center px-5 flex-1">
                    <Text className="text-[20px] w-full text-left font-medium text-[#414141] leading-[23px]">
                      Карта настрою
                    </Text>
                    <View className="w-full flex items-center mt-5">
                      <Feeling
                        onClick={() => setIsOpen(true)}
                        isMale={sex === 'M'}
                      />
                    </View>
                  </View>
                </CopilotView>
              </CopilotStep>
              <View className="my-[40px]">
                <CoursesBanner />
              </View>
              {/* RECENTLY UPLOADED */}
              <View className="bg-[#FFF7EE]">
                {SAMPLE.map(({ id, title, items }) => (
                  <View className="flex-1 mt-[22px]" key={id}>
                    <HorizontalCollection
                      key={id}
                      title={title}
                      items={items}
                    />
                  </View>
                ))}

                <FrequenciesBanner />

                {/* RECOMMENDED */}
                {SAMPLE_2.map(({ id, title, items }) => (
                  <View className="flex-1 mt-[22px]" key={id}>
                    <HorizontalCollection
                      key={id}
                      title={title}
                      items={items}
                    />
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ParallaxScroll>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal && !isOldUser}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
          <WelcomeMessage
            onPress={() => {
              setShowModal(false);
              updateIsOldUser();
            }}
          />
        </View>
      </Modal>
    </>
  );
};

export default Feed;

const WelcomeMessage = ({ onPress }) => {
  return (
    <View
      className="flex flex-col items-center w-11/12"
      style={{
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      }}>
      <Text style={{ fontSize: 24, fontWeight: '600', textAlign: 'center' }}>
        Ласкаво просимо
      </Text>
      <Text style={{ fontSize: 18, marginTop: 10, textAlign: 'center' }}>
        Почніть свій шлях до щасливого життя.
      </Text>

      <View className="w-64 h-64 bg-[#513F73]/20 rounded-full mt-6 mb-4">
        <Welcome />
      </View>
      <View className="mt-6">
        <Button title="Розпочати" onPress={onPress} />
      </View>
    </View>
  );
};
