/* eslint-disable react-native/no-inline-styles */
import image from '@common/assets/images';
import Button from '@common/components/Button';
import HorizontalList from '@common/components/HorizontalList';
import { BoldTitle, SubTitle } from '@common/components/Styled';
import useInstructor from '@services/hooks/useInstructor';
import isLowResolution from '@utils/isLowResolution';
import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Linking,
  Pressable,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { useNavigationParam } from 'react-navigation-hooks';
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

const InstructorDetail = () => {
  // const vref = useRef();
  const { height, width } = Dimensions.get('window');
  const round = (width * 1.25 + width * 1.25) / 2;
  const isLowRound = (width * 1.15 + width * 1.15) / 2;

  const instructors = useSelector(state => state.appData.instructors);
  // const categories = useSelector(categoriesSelector);
  const allMeditation = useSelector(allMeditations);
  const instructorId = useNavigationParam('id');
  const instructor = instructors.find(x => x._id === instructorId);
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
  return (
    <ImageBackground
      source={require('../../../../common/assets/images/new_i_bg.jpg')}
      resizeMode="stretch"
      style={{ flex: 1, paddingHorizontal: 0, alignItems: 'center' }}>
      <View>
        <View
          style={{
            width: isLowResolution ? width * 1.15 : width * 1.25,
            height: isLowResolution ? width * 1.15 : width * 1.25,
            backgroundColor: '#FFF8EE',
            borderRadius: isLowResolution ? isLowRound : round,
            position: 'absolute',
            top: isLowResolution ? -(width / 1.3) : -(width / 1.25),
            // right: 0,
            // left: 0,
            alignSelf: 'center',
          }}
        />
        {instructor?.image ? (
          <Image
            source={{ uri: instructor?.image }}
            style={{
              width: isLowResolution ? scale(150) : scale(160),
              height: isLowResolution ? scale(150) : scale(160),
              borderRadius: isLowResolution ? scale(75) : scale(80),
            }}
            resizeMethod="auto"
            resizeMode="cover"
          />
        ) : (
          <Image
            source={image('placeHolder')}
            style={{
              width: isLowResolution ? scale(150) : scale(160),
              height: isLowResolution ? scale(150) : scale(160),
              borderRadius: isLowResolution ? scale(75) : scale(80),
              borderWidth: 0.2,
            }}
            resizeMethod="resize"
            resizeMode="cover"
          />
        )}
      </View>
      <View
        style={{
          flex: 1,
          marginTop: scale(3),
          alignItems: 'center',
          // paddingHorizontal: isLowResolution ? scale(20) : scale(30),
          // marginHorizontal: isLowResolution ? scale(30) : scale(40),
        }}>
        <BoldTitle k={instructor.name} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            marginTop: isLowResolution ? scale(7) : scale(10),
          }}>
          <SubTitle
            k={instructor?.description}
            numberOfLines={10}
            style={[
              scaledSheet.resFont,
              {
                textAlign: 'left',
                paddingTop: 5,
                lineHeight: 17,
                paddingHorizontal: 15,
              },
            ]}
          />
          {instructor?.buttonLabel && (
            <ButtonContainer>
              <Button
                onPress={() => {
                  const data = {
                    ...instructor,
                    button_press: true,
                  };
                  updateIstructorTractionData(data);
                  const url = instructor?.buttonLink;
                  Linking.canOpenURL(url);
                  Linking.openURL(url);
                }}
                title={instructor.buttonLabel}
                bgColor="blueColor"
                isText
                big
              />
            </ButtonContainer>
          )}
          {instructor?.SocialIconLink && (
            <Pressable
              style={{ marginVertical: 20, alignSelf: 'center' }}
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
              <Image
                source={{ uri: instructor?.socialIcon }}
                style={{ width: 60, height: 60, borderRadius: 30 }}
                resizeMode="cover"
              />
            </Pressable>
          )}
        </ScrollView>
        <HorizontalList data={dataArray || []} />
      </View>

      {/* <ImageBackground
        source={require('../../../../common/assets/images/new_i_bg.jpg')}
        resizeMode="stretch"
        style={{display: 'flex', flex: 1}}>
        <Image
          source={require('../../../../common/assets/images/i_topbg.png')}
          resizeMethod="auto"
          resizeMode="stretch"
          style={{width: '100%'}}
          onLayout={event => {
            var {x, y, width, height} = event.nativeEvent.layout;
            setImageHeight(height);
          }}
        />
        <View
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',

            justifyContent: 'center',
          }}>
          <View style={{display: 'flex', flex: 1, alignItems: 'center', marginTop: isLowResolution ? 0 : 25}}>
            <Image
              source={image('placeHolder')}
              style={{width: 44, height: 44, borderRadius: 22, borderWidth: 0.1}}
              resizeMethod="resize"
              resizeMode="cover"
            />
            {instructor?.image ? (
              <Image
                source={{uri: instructor?.image}}
                style={{
                  display: 'flex',
                  width: 200,
                  height: 200,
                  borderRadius: 110,
                  marginTop: isLowResolution ? 25 : 30,
                }}
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
                  marginTop: imgheight ? imgheight / 2 : 0,
                }}
                resizeMethod="resize"
                resizeMode="cover"
              />
            )}
            <View style={{marginVertical: 5, alignItems: 'center', paddingHorizontal: isLowResolution ? 20 : 40}}>
              <BoldTitle k={instructor.name} />
              <SubTitle
                k={instructor?.description}
                numberOfLines={10}
                style={{textAlign: 'left', paddingTop: 5, fontSize: 14}}
              />
            </View>
            <View style={{display: 'flex', justifyContent: 'center', position: 'absolute', bottom: 10}}>
              <HorizontalList data={dataArray || []} />
            </View>
          </View>
        </View>
      </ImageBackground> */}
    </ImageBackground>
  );
};

export default InstructorDetail;
