/* eslint-disable react-native/no-inline-styles */
import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import { BoldTitle, SubTitle, TouchableIcon } from '@common/components/Styled';
import useInstructor from '@services/hooks/useInstructor';
import React from 'react';
import {
  Image,
  Linking,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Modal from 'react-native-modal';
import styled from 'styled-components';

const Header = styled.View`
  position: absolute;
  top: 30px;
  right: 10px;
`;

const MeditationInfo = ({ isVisible, instructor, setShowModal }) => {
  const onClose = () => setShowModal(false);
  const { updateIstructorTractionData } = useInstructor();

  return (
    <Modal
      isVisible={isVisible}
      animationIn="fadeInUpBig"
      animationInTiming={1000}
      animationOutTiming={1000}
      animationOut="fadeOutDownBig">
      <TouchableOpacity
        style={{ height: '100%', backgroundColor: 'transparent' }}
        onPress={onClose}>
        <View
          style={{
            backgroundColor: '#fdedd6',
            height: '75%',
            paddingHorizontal: 10,
            paddingVertical: 10,
            marginTop: 100,
          }}>
          <ScrollView
            contentContainerStyle={{
              alignItems: 'center',
              justifyContent: 'center',
            }}
            showsVerticalScrollIndicator={false}>
            <Header>
              <TouchableIcon name="close" onPress={onClose} color={'#000'} />
            </Header>
            <View style={{ alignSelf: 'center' }}>
              {instructor?.image ? (
                <Image
                  source={{ uri: instructor?.image }}
                  style={{ width: 140, height: 140, borderRadius: 70 }}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              ) : (
                <Image
                  source={image('placeHolder')}
                  style={{ width: 140, height: 140, borderRadius: 70 }}
                  resizeMethod="resize"
                  resizeMode="cover"
                />
              )}
              <BoldTitle
                t={instructor?.name}
                style={{ fontSize: 24, textAlign: 'center', marginTop: 10 }}
              />
            </View>
            <View style={{ paddingBottom: 13 }}>
              {/* <BoldTitle t={"כותרת"} /> */}
              <SubTitle
                t={instructor?.title}
                style={{ fontSize: 23, paddingTop: 5 }}
              />
            </View>
            {instructor?.description && (
              <Text style={{ textAlign: 'left', paddingVertical: 10 }}>
                {instructor.description}
              </Text>
            )}
            {instructor?.buttonLabel && (
              <View>
                <AppButton
                  onPress={() => {
                    const data = {
                      ...instructor,
                      button_press: true,
                    };
                    updateIstructorTractionData(data);
                    const url = instructor?.buttonLink;
                    Linking.canOpenURL(url);
                    Linking.openURL(url);
                  }}>
                  {instructor.buttonLabel}
                </AppButton>
              </View>
            )}
            {instructor?.SocialIconLink && (
              <Pressable
                style={{ marginVertical: 20 }}
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
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default MeditationInfo;
