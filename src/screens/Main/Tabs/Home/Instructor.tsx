import MeditationItem from '@common/components/MeditationItem';
import ParallaxScrollView from '@common/components/ParallaxScrollView';
import theme from '@common/theme';
import { useRoute } from '@react-navigation/native';
import useInstructor from '@services/hooks/useInstructor';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Linking, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { allMeditations as allMeditationsSelector } from 'store/selectors';

const Instructor = () => {
  const route = useRoute();

  const instructorId = route.params?.id;
  const instructor = useSelector(state => state.appData.instructors).find(
    x => x._id === instructorId,
  );

  const allMeditations = useSelector(allMeditationsSelector);

  const meditations = useMemo(
    () => allMeditations.filter(({ id }) => instructor.categories.includes(id)),
    [allMeditations, instructor.categories],
  );

  const { updateIstructorTractionData } = useInstructor();

  const renderMeditationItem = useCallback(
    ({ item, index }) => (
      <MeditationItem key={item.id} item={item} index={index} />
    ),
    [],
  );

  return (
    <ParallaxScrollView image={instructor?.image}>
      <View className="p-5">
        <View className="flex flex-row justify-between items-center mt-2">
          <Text className="text-2xl font-bold">{instructor?.name}</Text>
          <View className="flex flex-row space-x-2">
            {instructor.SocialIconLink && (
              <TouchableOpacity
                onPress={() => {
                  const data = {
                    ...instructor,
                    social_link_press: true,
                  };
                  updateIstructorTractionData(data);
                  const url = instructor.SocialIconLink;
                  Linking.canOpenURL(url);
                  Linking.openURL(url);
                }}>
                <Icon
                  name="instagram"
                  size={28}
                  color={theme.colors.textColor}
                />
              </TouchableOpacity>
            )}
            {instructor.buttonLink && (
              <TouchableOpacity
                onPress={() => {
                  const data = {
                    ...instructor,
                    button_press: true,
                  };
                  updateIstructorTractionData(data);
                  const url = instructor.buttonLink;
                  Linking.canOpenURL(url);
                  Linking.openURL(url);
                }}>
                <Icon name="link" size={28} color={theme.colors.textColor} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text className="text-left text-base leading-none font-normal mt-4">
          {instructor?.description}
        </Text>
      </View>
      <Text className="text-center text-base leading-none font-normal mt-2 text-gray-500">
        {meditations.length} מדיטציות
      </Text>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        data={meditations}
        scrollEnabled={false}
        keyExtractor={item => item.id}
        renderItem={renderMeditationItem}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        getItemLayout={(_, index) => ({
          length: theme.dimens.winWidth / 2 - 16,
          offset: 280 * index,
          index,
        })}
      />
    </ParallaxScrollView>
  );
};

export default Instructor;
