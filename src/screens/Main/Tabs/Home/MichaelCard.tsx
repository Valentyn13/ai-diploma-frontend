import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const MichaelCard = () => {
  const navigation = useNavigation();

  return (
    <View className="h-[146px] flex items-start relative overflow-hidden rounded-[10px] mx-[22px] mt-0 mb-12 p-[15px]">
      <FastImage
        source={require('./bgs/michael_card.png')}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <Image
        className="w-[140px] h-[110px] absolute bottom-0 right-0"
        source={require('./bgs/michael_person.png')}
      />
      <Text className="font-bold text-[16px] text-[#273051]">
        לשתף, להתייעץ, או סתם לפרוק.
      </Text>
      <Text className="text-[#494949] mt-1.5 font-medium">
        אני כאן בשבילך, כל הזמן.
      </Text>
      <Text />
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        className=" h-[40px] flex justify-center items-center mt-[15px] bg-[#273051] px-[16px] rounded-[20px]">
        <Text className="text-lg font-semibold text-[14px] text-white">
          לשיחה עם מיכאל
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MichaelCard;
