import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type MichaelCardProps = {
  title: string;
  subtitle: string;
  buttonText: string;
  handleButtonPress: () => void;
};

const MichaelCard: FC<MichaelCardProps> = ({
  title,
  subtitle,
  buttonText,
  handleButtonPress,
}) => {
  return (
    <View className="h-[145px] border-[#ECECEC] border justify-between flex items-start relative overflow-hidden rounded-[10px] mx-[18px] py-[20px] px-[16px]">
      <FastImage
        source={require('./bgs/michael_card_3.png')}
        resizeMode="cover"
        style={StyleSheet.absoluteFill}
      />
      <FastImage
        className="w-[112px] h-[106px] absolute bottom-3 right-5"
        source={require('./bgs/chat_heart_2.png')}
      />
      <View>
        <Text className="font-semibold max-w-[55%] text-left text-[18px] leading-[18px] text-[#273051]">
          {title}
        </Text>
        <Text className="text-[#666D89] mt-0.5 text-left">{subtitle}</Text>
      </View>
      <TouchableOpacity
        onPress={handleButtonPress}
        className="h-[33px] flex justify-center items-center bg-[#002136] px-[16px] rounded-[34px]">
        <Text className="font-semibold text-[14px] text-white">
          {buttonText}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MichaelCard;
