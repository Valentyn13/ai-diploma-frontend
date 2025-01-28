import { REGA_INSTRUCTOR_ID } from '@common/constants';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const FrequenciesBanner = () => {
  const navigation = useNavigation();
  return (
    <View className="px-[18px]">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('Instructor', { id: REGA_INSTRUCTOR_ID })
        }
        className="relative h-[95px] w-full flex items-start">
        <FastImage
          resizeMode="cover"
          style={StyleSheet.absoluteFill}
          className="rounded-[10px]"
          source={require('./imgs/purple_bg.png')}
        />
        <FastImage
          className="w-[95px] h-[103px] absolute bottom-[-1px] right-[-15px]"
          resizeMode="cover"
          source={require('./imgs/network.png')}
        />
        <View className="flex-1 p-4">
          <Text className="font-medium mb-1.5 text-left text-[#34435B] text-[18px]">
            תדרים ומוזיקה מבית רגע
          </Text>
          <Text className="max-w-[60%] text-left text-[#52668A] leading-[16px]">
            מוזיקה ותדרים מרגיעים לשיפור השינה, הריכוז ולהפגת מתחים
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default FrequenciesBanner;
