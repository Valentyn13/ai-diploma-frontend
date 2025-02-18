import ParallaxScrollView from '@common/components/ParallaxScrollView';
import SessionsGrid from '@common/components/SessionsGrid';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import useInstructor from '@services/hooks/useInstructor';
import React, { useMemo } from 'react';
import { Linking, Text, View } from 'react-native';
import { useSelector } from 'react-redux';

const Instructor = () => {
  const { goBack } = useNavigation();
  const route = useRoute();

  const instructorId = route.params?.id;
  const instructor = useSelector(state => state.appData.instructors).find(
    x => !!x && x._id === instructorId,
  );

  const allMeditations = useMemo(() => [], []);

  const meditations = useMemo(
    () =>
      allMeditations.filter(({ id }) => instructor?.categories?.includes(id)),
    [allMeditations, instructor?.categories],
  );

  const { updateIstructorTractionData } = useInstructor();

  return (
    <View className="relative w-full h-full">
      <View className="absolute top-5 left-5 z-10">
        <CircleButton
          size={40}
          icon="chevron-down"
          onPress={goBack}
          backgroundColor="#00000060"
          color="white"
        />
      </View>
      {!!instructor && (
        <ParallaxScrollView image={instructor?.image}>
          <View className="px-5 flex-1 mt-8">
            <View className="mb-8">
              <View className="flex flex-row justify-between items-center">
                <Text className="text-2xl font-semibold text-black">
                  {instructor?.name}
                </Text>
                <View className="flex flex-row">
                  {instructor.SocialIconLink && (
                    <View className="mr-1">
                      <CircleButton
                        size={40}
                        icon="instagram"
                        onPress={() => {
                          const data = {
                            ...instructor,
                            social_link_press: true,
                          };
                          updateIstructorTractionData(data);
                          const url = instructor.SocialIconLink;
                          Linking.canOpenURL(url);
                          Linking.openURL(url);
                        }}
                        backgroundColor="#00000060"
                      />
                    </View>
                  )}

                  {instructor.social && instructor.social['spotify'] && (
                    <View className="mr-1">
                      <CircleButton
                        size={40}
                        icon="spotify"
                        onPress={() => {
                          const data = {
                            ...instructor,
                            social_link_press: true,
                          };
                          updateIstructorTractionData(data);
                          const url = instructor.SocialIconLink;
                          Linking.canOpenURL(url);
                          Linking.openURL(url);
                        }}
                        backgroundColor="#00000060"
                      />
                    </View>
                  )}

                  {instructor.buttonLink && (
                    <CircleButton
                      size={40}
                      icon="link"
                      onPress={() => {
                        const data = {
                          ...instructor,
                          button_press: true,
                        };
                        updateIstructorTractionData(data);
                        const url = instructor.buttonLink;
                        Linking.canOpenURL(url);
                        Linking.openURL(url);
                      }}
                      backgroundColor="#00000060"
                    />
                  )}
                </View>
              </View>
              <Text className="text-left text-base leading-none font-normal mt-4 text-black">
                {instructor?.description}
              </Text>
            </View>
            <Text className="text-center text-base leading-none font-normal text-gray-700">
              {meditations.length} תרגולים
            </Text>
            <SessionsGrid meditations={meditations} />
          </View>
        </ParallaxScrollView>
      )}
    </View>
  );
};

export default Instructor;
