import MeditationItem from '@common/components/MeditationItem';
import ParallaxScrollView from '@common/components/ParallaxScrollView';
import theme from '@common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import useInstructor from '@services/hooks/useInstructor';
import React, { useCallback } from 'react';
import { FlatList, Linking, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { allMeditations } from 'store/selectors';
import styled from 'styled-components';

const scaledSheet = ScaledSheet.create({
  resFont: {
    fontSize: '14@ms0.5',
  },
});

const ButtonContainer = styled.View`
  margin: 10px 23px 0px;
`;

const Instructor = () => {
  const { goBack } = useNavigation();
  const route = useRoute();

  const instructorId = route.params?.id;
  const instructor = useSelector(state => state.appData.instructors).find(
    x => x._id === instructorId,
  );
  // const categories = useSelector(categoriesSelector);
  const allMeditation = useSelector(allMeditations);
  const dataArray = [];
  instructor.categories.map((item, index) => {
    let data;
    const findmed = allMeditation.find(medId => medId.id === item);

    if (findmed) {
      data = {
        ...findmed,
      };
      dataArray.push(data);
    }
  });

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
                <Icon
                  name="instagram"
                  size={28}
                  color={theme.colors.textColor}
                />
              </TouchableOpacity>
            )}
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
                <Icon name="link" size={28} color={theme.colors.textColor} />
              </TouchableOpacity>
            )}
          </View>
        </View>
        <Text className="text-left text-base leading-none font-normal mt-4">
          {instructor?.description}
        </Text>
        <View>
          <ButtonContainer />
        </View>
      </View>
      <Text className="text-center text-base leading-none font-normal mt-2 text-gray-500">
        {dataArray.length} מדיטציות
      </Text>
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          paddingVertical: 10,
          paddingHorizontal: 10,
        }}
        data={dataArray}
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
