import React, { FC, useRef } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface Props {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

const SearchBar: FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const ref = useRef(null);

  return (
    <View className="relative py-2 px-2 rounded-full mt-8 flex-row items-center w-11/12 mx-auto mb-4 border border-gray-300">
      <Icon
        style={{
          transform: [{ rotateY: '180deg' }],
          marginLeft: scale(10),
        }}
        size={scale(18)}
        color="grey"
        name="magnifying-glass"
      />
      <TextInput
        blurOnSubmit
        ref={ref}
        onChangeText={v => {
          setSearchQuery(v);
        }}
        placeholderTextColor="grey"
        keyboardType="default"
        returnKeyType="done"
        placeholder="חיפוש מדיטציה..."
        className="w-5/6 mx-5 text-xl text-right text-black leading-6"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          className="absolute right-0 mr-2 p-4"
          onPress={() => {
            ref.current?.blur();
            ref.current?.clear();
            setSearchQuery('');
          }}>
          <Icon size={scale(12)} color="grey" name="x" />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
