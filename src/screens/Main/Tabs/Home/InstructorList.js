/* eslint-disable react-native/no-inline-styles */
import image from '@common/assets/images';
import { SubTitle } from '@common/components/Styled';
import { captureMessage } from '@sentry/react-native';
import useInstructor from '@services/hooks/useInstructor';
import React from 'react';
import { FlatList, Image, TouchableOpacity, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
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
  // eslint-disable-next-line camelcase
  const { updateIstructorTractionData } = useInstructor();
  const navigation = useNavigation();
  const instructors = useSelector(state => state.appData.instructors);
  const onPressProfile = item => {
    updateIstructorTractionData(item);
    navigation.navigate('InstructorDetail', { id: item._id });
  };
  instructors.sort(function (a, b) {
    return (
      (a.order === undefined) - (b.order === undefined) ||
      +(a.order > b.order) ||
      -(a.order < b.order)
    );
  });

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
        data={instructors}
        renderItem={renderItem}
        initialNumToRender={20}
        // eslint-disable-next-line no-underscore-dangle
        keyExtractor={item => item._id}
        // getItemLayout={(_data, index) => ({
        //   length: ITEM_WIDTH(big),
        //   offset: ITEM_WIDTH(big) * index,
        //   index,
        // })}
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
