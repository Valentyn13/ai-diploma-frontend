import { CircleButton } from '@common/components/buttons/CircleButton';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { allMeditations as allMeditationsSelector } from '@store/selectors';
import { shuffleArray } from '@utils/rand';
import React, { useCallback, useMemo } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useSelector } from 'react-redux';

const Instructors = () => {
  const navigation = useNavigation();
  const instructors = useSelector((state: any) => state.appData.instructors);

  const instructorsWithNoRega = useMemo(
    () => instructors.filter(({ name }) => name !== 'כלים מבית רגע'),
    [instructors],
  );

  const allMeditations = useSelector(allMeditationsSelector);

  const getSessionsByInstructor = useCallback(
    (id: string) => {
      const instructor = instructors.find(({ _id }) => _id === id);

      return allMeditations.filter(({ id }) =>
        instructor.categories.includes(id),
      );
    },
    [allMeditations, instructors],
  );

  return (
    <SafeAreaView className="relative w-full h-full flex-1 bg-primary-bg">
      <View className="relative p-5 flex flex-row items-center">
        <View className="absolute top-5 left-5 z-10">
          <CircleButton
            size={40}
            icon="chevron-right"
            onPress={navigation.goBack}
            backgroundColor="#00000060"
            color="#fff"
          />
        </View>
        <Text
          className="flex-1 text-3xl font-bold text-center text-black"
          style={{ fontFamily: theme.fonts!.regular }}>
          המורים שלנו
        </Text>
      </View>
      <View className="w-full border-b border-[#513F73]/10" />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={[
          ...instructors.filter(({ name }) => name === 'כלים מבית רגע'),
          ...shuffleArray(instructorsWithNoRega),
        ]}
        keyExtractor={item => item._id}
        renderItem={({ item: instructor }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Instructor', { id: instructor._id })
            }
            className="flex flex-row items-center py-4 px-5 border-b border-[#513F73]/10">
            <Image
              source={{ uri: instructor.image }}
              style={{ width: 50, height: 50, borderRadius: 25 }}
            />
            <View>
              <Text className="text-lg font-bold ml-3 text-left text-black">
                {instructor.name}
              </Text>
              <Text className="text-sm ml-3 text-left text-black">
                {getSessionsByInstructor(instructor._id).length} תרגולים
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Instructors;
