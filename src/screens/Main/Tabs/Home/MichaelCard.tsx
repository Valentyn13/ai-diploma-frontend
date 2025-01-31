import image from '@common/assets/images';
import React, { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import IconAwesome from 'react-native-vector-icons/FontAwesome6';

type MichaelCardProps = {
  title: string;
  subtitle: string;
  handleButtonPress: () => void;
};

const MichaelCard: FC<MichaelCardProps> = ({
  title,
  subtitle,
  handleButtonPress,
}) => {
  return (
    <View className="relative mt-[-10px]">
      {/*<FastImage*/}
      {/*  source={image('home_card_cloud')}*/}
      {/*  resizeMode="cover"*/}
      {/*  className="absolute top-[-55px] z-10 right-0 w-[132px] h-[65px]"*/}
      {/*/>*/}
      <TouchableOpacity onPress={handleButtonPress}>
        <View className="h-[91px] overflow-hidden bg-[#FFECD5] relative border border-[#AC8C7A2E] justify-center rounded-[16px] p-[18px] mx-[18px]">
          <View className="flex-row items-center justify-between">
            <View className="flex-row gap-[5px] relative">
              <View className="rounded-full w-[57px] h-[57px] bg-[#DDE2F4] relative">
                <FastImage
                  className="w-full h-full"
                  resizeMode="cover"
                  source={image('michael_home')}
                />
                {/*<FastImage*/}
                {/*  source={image('home_stars')}*/}
                {/*  resizeMode="cover"*/}
                {/*  className="absolute top-[-7px] right-0 z-10 w-[22px] h-[22px]"*/}
                {/*/>*/}
              </View>
              <View />
              <View className="h-[57px] justify-center">
                <Text className="font-medium text-left text-[16px] leading-[19px] text-[#3F5194] mb-[4px]">
                  {title}
                </Text>
                <Text className="text-[#273051A6] text-[16px] text-left leading-[19px]">
                  {subtitle}
                </Text>
              </View>
            </View>
            <View>
              <IconAwesome name="chevron-left" size={18} color="#3F5194" />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MichaelCard;
