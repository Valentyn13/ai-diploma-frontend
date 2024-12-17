import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

const MichaelCard = () => {
  const navigation = useNavigation();

  return (
    <View className="h-[156px] flex items-start relative overflow-hidden rounded-[10px] mx-[22px] mt-0 mb-12 p-4">
      <FastImage
        source={require('./bgs/michael_card_2.png')}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <FastImage
        className="w-[130px] h-[120px] absolute bottom-3 right-2"
        source={require('./bgs/chat_heart.png')}
      />
      <Text className="font-bold max-w-[50%] text-left text-[16px] text-[#273051]">
        לשתף, להתייעץ, או סתם לפרוק
      </Text>
      <Text
        style={{ marginBottom: Platform.OS === 'ios' ? 8 : 0 }}
        className="text-[#494949] mt-1.5 font-medium">
        מיכאל כאן בשבילך, כל הזמן
      </Text>
      <Text />
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        className="h-[40px] flex justify-center items-center bg-[#002136ed] px-[16px] rounded-[20px]">
        <Text className="text-lg font-semibold text-[14px] text-white">
          לשיחה עם מיכאל
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MichaelCard;
