import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

const Feeling = ({ onClick = () => {}, isMale = true }) => (
  <TouchableOpacity
    onPress={onClick}
    className="w-full h-16 rounded-xl flex-row justify-between px-4 items-center border border-black bg-transparent">
    <View className="flex-row justify-center items-center">
      <Icon name="smile" size={24} color="black" />
      <Text className="text-black font-bold text-lg ml-2">
        {isMale ? ' איך אתה מרגיש היום?' : ' איך את מרגישה היום?'}
      </Text>
    </View>
    <Icon name="chevron-left" size={24} color="black" />
  </TouchableOpacity>
);

export default Feeling;
