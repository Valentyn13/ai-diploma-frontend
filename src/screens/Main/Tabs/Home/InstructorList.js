import image from '@common/assets/images';
import { SubTitle } from '@common/components/Styled';
import { useNavigation } from '@react-navigation/native';
import { captureMessage } from '@sentry/react-native';
import useInstructor from '@services/hooks/useInstructor';
import { shuffleArray } from '@utils/rand';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const InstructorContainer = styled.View`
  align-self: stretch;
  align-items: flex-start;
  flex: 1;
`;
// const ListTitle = styled(SubTitle)`
//   margin-bottom: 10px;
//   font-size: 18px;
//   font-weight: bold;
//   align-self: flex-start;
// `;

const InstructorList = () => {
  const { updateIstructorTractionData } = useInstructor();
  const navigation = useNavigation();
  const instructors = useSelector(state => state.appData.instructors);
  const onPressProfile = item => {
    updateIstructorTractionData(item);
    navigation.navigate('Instructor', { id: item._id });
  };

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        style={{ display: 'flex', justifyContent: 'center' }}
        onPress={() => onPressProfile(item)}>
        <View
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            margin: 5,
            marginHorizontal: 10,
            marginVertical: 10,
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

        <SubTitle
          k={item?.name}
          style={{ textAlign: 'center', fontSize: 14 }}
        />
      </TouchableOpacity>
    );
  };
  return (
    <InstructorContainer>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          justifyContent: 'center',
          display: 'flex',
          alignItems: 'center',
        }}
        data={shuffleArray(instructors, instructors.length)}
        renderItem={renderItem}
        initialNumToRender={20}
        keyExtractor={item => item._id}
        getItemLayout={(_data, index) => ({
          length: 110,
          offset: (110 + 10) * index,
          index,
        })}
        onScrollToIndexFailed={info => {
          captureMessage(
            `scrollToIndex failed in InstructorList. index=${info.index}`,
          );
        }}
      />
    </InstructorContainer>
  );
};

export default InstructorList;
