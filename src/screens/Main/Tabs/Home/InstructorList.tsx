import image from '@common/assets/images';
import { useNavigation } from '@react-navigation/native';
import useInstructor from '@services/hooks/useInstructor';
import { shuffleArray } from '@utils/rand';
import React, { useCallback, useMemo } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InstructorContainer = styled.View`
  align-self: stretch;
  align-items: flex-start;
  flex: 1;
`;

const InstructorList = () => {
  const { updateIstructorTractionData } = useInstructor();
  const navigation = useNavigation();
  const instructors = useSelector(state => state.appData.instructors);

  const onPressProfile = useCallback(
    item => {
      updateIstructorTractionData(item);
      navigation.navigate('Instructor', { id: item._id });
    },
    [navigation, updateIstructorTractionData],
  );

  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <TouchableOpacity
          style={{ display: 'flex', justifyContent: 'center' }}
          onPress={() => onPressProfile(item)}>
          <View
            style={{
              width: 110,
              height: 110,
              borderRadius: 55,
            }}>
            {item?.image ? (
              <Image
                source={{ uri: item?.image }}
                style={{ display: 'flex', flex: 1, borderRadius: 55 }}
                resizeMethod="auto"
                resizeMode="cover"
              />
            ) : (
              <Image
                source={image('placeHolder')}
                style={{
                  width: 110,
                  height: 110,
                  borderRadius: 55,
                  borderWidth: 0.1,
                }}
                resizeMethod="resize"
                resizeMode="cover"
              />
            )}
          </View>

          <Text className="text-center text-black font-medium text-sm mt-4">
            {item?.name}
          </Text>
        </TouchableOpacity>
      );
    },
    [onPressProfile],
  );

  const instructorWithNoRega = useMemo(
    () => instructors.filter(({ name }) => name !== 'כלים מבית רגע'),
    [instructors],
  );

  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        paddingHorizontal: 20,
        gap: 16,
      }}
      data={[
        ...instructors.filter(({ name }) => name === 'כלים מבית רגע'),
        ...shuffleArray(instructorWithNoRega),
      ]}
      renderItem={renderItem}
      keyExtractor={item => item._id}
      getItemLayout={(_data, index) => ({
        length: 110,
        offset: (110 + 10) * index,
        index,
      })}
    />
  );
};

export default InstructorList;
