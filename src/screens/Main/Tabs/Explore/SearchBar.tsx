import React, { FC, useRef } from 'react';
import { Platform, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface Props {
  searchQuery: string;
  setSearchQuery: (v: string) => void;
}

const INPUT_VERTICAL_PADDING = Platform.OS === 'ios' ? 16 : 0;

const SearchBar: FC<Props> = ({ searchQuery, setSearchQuery }) => {
  const ref = useRef<TextInput>(null);

  return (
    <View
      style={{ paddingVertical: INPUT_VERTICAL_PADDING }}
      className="relative px-2 rounded-full mt-8 flex-row items-center w-full mx-auto mb-4 border border-[#A39E98]">
      <Icon
        style={{
          // transform: [{ rotateY: '180deg' }],
          marginLeft: scale(10),
        }}
        size={scale(18)}
        color="#9A9692"
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
        placeholder="חיפוש מדיטציה, תרגיל נשימה או מורה"
        className="w-5/6 mx-3 text-[17px] text-right text-[#4444448A] leading-[19px]"
      />
      {searchQuery.length > 0 && (
        <TouchableOpacity
          className="absolute right-0"
          style={{ padding: 16 }}
          onPress={() => {
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
