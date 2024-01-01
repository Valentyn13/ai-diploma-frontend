import React, { FC } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';

interface OptionProps {
  t: string;
  onPress: () => void;
  active: boolean;
}

const Option: FC<OptionProps> = ({ t, onPress, active }) => (
  <TouchableOpacity
    className="flex-row items-center justify-center w-full h-7"
    onPress={onPress}>
    <Text
      className="text-white text-sm font-bold"
      style={{ opacity: active ? 1 : 0.5 }}>
      {t}
    </Text>
  </TouchableOpacity>
);

interface BgMusicSelectorProps {
  toggleBgMenu: () => void;
  whiteColor: string;
  bgMenuOpen: boolean;
  handleBgTrack: (id: number) => void;
  isPlayingBgMusic: boolean;
  currentBgTrack: number;
  bgTracks: { id: number; name: string }[];
}

const BgMusicSelector: FC<BgMusicSelectorProps> = ({
  toggleBgMenu,
  whiteColor,
  bgMenuOpen,
  handleBgTrack,
  isPlayingBgMusic,
  currentBgTrack,
  bgTracks,
}) => (
  <View>
    <TouchableOpacity
      className="flex-row items-center justify-center w-[72px] h-9 rounded-md border border-white bg-transparent border-opacity-50 px-2 py-1 relative"
      style={{
        borderBottomWidth: bgMenuOpen ? 0 : 1,
        borderBottomRightRadius: bgMenuOpen ? 0 : 6,
        borderBottomLeftRadius: bgMenuOpen ? 0 : 6,
      }}
      onPress={toggleBgMenu}>
      <Icon
        name="music"
        color={whiteColor}
        size={16}
        style={{ marginRight: 8 }}
      />
      <Icon name="chevron-down" color={whiteColor} size={12} />
    </TouchableOpacity>
    <View
      className="absolute top-[36px] border border-white w-full rounded-b-lg border-t-0 border-x-radius-[14px] bg-transparent border-opacity-50"
      style={{
        display: bgMenuOpen ? 'flex' : 'none',
      }}>
      <FlatList
        className="w-full py-2"
        data={[{ id: -1, name: 'כיבוי' }, ...bgTracks]}
        renderItem={({ item }) => (
          <Option
            t={item.name}
            onPress={() => handleBgTrack(item.id)}
            active={
              isPlayingBgMusic ? currentBgTrack === item.id : item.id === -1
            }
          />
        )}
      />
    </View>
  </View>
);

export default BgMusicSelector;
