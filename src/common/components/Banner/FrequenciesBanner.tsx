import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const FrequenciesBanner = () => {
  const navigation = useNavigation();
  return (
    <View className="px-[18px] my-[30px]">
      <TouchableOpacity
        onPress={() => navigation.navigate('Chat')}
        className="relative h-[130px] w-full flex items-end">
        <FastImage
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          className="rounded-[10px]"
          source={require('./imgs/purple_bg.png')}
        />
        <FastImage
          className="w-[95px] h-[103px] absolute bottom-[12px] left-[-15px]"
          resizeMode="cover"
          source={require('./imgs/network.png')}
        />
        <View className="flex-1 p-4  ">
          <Text className="font-medium mb-1.5 text-left text-[#34435B] text-[18px]">
            Поділись своїми емоціями
          </Text>
          <Text className="max-w-[80%] text-left text-[#52668A] leading-[16px]">
            Не соромся висловлювати свої думки та почуття. Якщо тебе турбуть
            стрес, негативні емоції або ви хочете покращити себе, ми тут, щоб
            допомогти.
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FrequenciesBanner;
