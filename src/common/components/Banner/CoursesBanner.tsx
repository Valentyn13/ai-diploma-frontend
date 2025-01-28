import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const CoursesBanner = () => {
  const navigation = useNavigation();
  return (
    <View className="px-[18px]">
      <TouchableOpacity
        onPress={() => navigation.navigate('Courses')}
        className="h-[98px] w-full flex items-start relative rounded-[10px] p-4">
        <FastImage
          resizeMode="cover"
          className="rounded-[10px]"
          style={StyleSheet.absoluteFill}
          source={require('./imgs/courses_bg.png')}
        />
        <FastImage
          className="w-[128px] h-[128px] absolute top-[-25px] right-[-15px]"
          resizeMode="cover"
          source={require('./imgs/learn.png')}
        />

        <Text className="font-medium mb-1.5 text-left text-[#623F1A] text-[18px] leading-[21px]">
          קורסים במיינדפולנס והעצמה
        </Text>
        <View>
          <Text className="max-w-[65%] text-left leading-[16px] text-[#623F1A]">
            למדו מיינדפולנס, התחברו לגוף וטפחו שיח פנימי חיובי בסדרת שיעורים
            קצרים
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default CoursesBanner;
