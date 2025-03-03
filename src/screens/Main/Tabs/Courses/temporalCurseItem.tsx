import { getCategoryImg } from '@common/assets/images';
import meditationTime from '@utils/time';
import { ImageBackground, Pressable, Text, View } from 'react-native';
import { Session } from 'types/Meditation';

type Course = {
  id: string;
  info: string;
  isCategoryLocked: boolean;
  meditations: Session[];
  name: string;
  subTitle: string;
  title: string;
};

const CourseItem = ({ item, index, onPress }) => {
  const sessionCount = item.meditations.length;
  const totalTime = item.meditations.reduce((a, b) => a + b.duration, 0);

  return (
    <Pressable
      className="flex-1 bg-f6f6f6 rounded-10 overflow-hidden h-64 rounded-xl"
      onPress={onPress}>
      <ImageBackground
        resizeMode="cover"
        className="absolute w-full h-full opacity-50"
        source={{ uri: getCategoryImg('starthere', index) }}
      />
      <View className="p-5 z-10 flex flex-col justify-between h-full">
        <View>
          <Text className="text-2xl font-semibold text-left text-black tracking-wide">
            {item.title}
          </Text>
          <Text className="font-medium text-lg text-gray-700 text-left mb-4">
            {item.subTitle}
          </Text>
          <Text className="text-sm text-gray-800 text-left" numberOfLines={3}>
            {item.info}
          </Text>
        </View>
        <View className="flex flex-row justify-between items-center mt-8">
          <View className="bg-black/50 px-2 py-1 rounded-full">
            <Text className="text-sm text-white">{sessionCount} שיעורים</Text>
          </View>
          <View className="bg-black/50 px-2 py-1 rounded-full">
            <Text className="text-sm text-white">
              {meditationTime(totalTime)}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

// const courses = []

// const renderItem = ({ item, index }) => (
//   <CourseItem
//     item={item}
//     index={index}
//     onPress={() => {
//       navigation.navigate('Course', {
//         id: item.id,
//         image: getCategoryImg('starthere', index),
//       });
//     }}
//   />
// );
