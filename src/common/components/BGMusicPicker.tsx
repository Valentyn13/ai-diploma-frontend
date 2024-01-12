import { BG_TRACKS } from '@common/constants';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useBgTrackStore } from '@store/useBgTrackStore';
import React, { useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import Volume from './Volume';
import { CircleButton } from './buttons/CircleButton';

const Option = ({ label, onPress, emoji, isSelected, ...props }) => (
  <TouchableOpacity
    className="flex-col items-center justify-center rounded-lg border px-4 py-2 h-24"
    style={{
      width: 100,
      backgroundColor: isSelected ? '#D66366' : 'transparent',
      borderWidth: 2,
      borderColor: isSelected ? '#D66366' : '#273051',
    }}
    onPress={onPress}>
    <Text
      style={{
        color: isSelected ? '#fff' : '#273051',
        fontSize: 18,
        fontWeight: '600',
      }}>
      {label}
    </Text>
    <Text style={{ color: isSelected ? '#D66366' : '#273051', fontSize: 22 }}>
      {emoji}
    </Text>
  </TouchableOpacity>
);

const MusicModal = () => {
  const { selectedTrack, setSelectedTrack, volume, setVolume } =
    useBgTrackStore(state => state);
  const { goBack } = useNavigation();

  const renderItem = useCallback(
    ({ item }) => (
      <Option
        key={item.id}
        label={item.name}
        emoji={item.emoji}
        onPress={() => {
          setSelectedTrack(item.id);
          goBack();
        }}
        isSelected={selectedTrack === item.id}
      />
    ),
    [selectedTrack, setSelectedTrack],
  );

  return (
    <View
      style={{
        position: 'relative',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        backgroundColor: '#FFEFD7',
      }}>
      <View className="absolute left-4 top-4">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={goBack}
          size={40}
          icon="chevron-down"
        />
      </View>
      <View className="w-full flex flex-col">
        <Text
          className="text-center text-3xl font-bold mb-6 text-black"
          style={{ fontFamily: theme.fonts.regular }}>
          עוצמת קול
        </Text>
        <Volume volume={volume} setVolume={setVolume} />

        <Text
          className="text-center text-3xl font-bold mt-12 mb-6 text-black"
          style={{ fontFamily: theme.fonts.regular }}>
          בחרו מוזיקת רקע
        </Text>
        <FlatList
          className="w-full"
          contentContainerStyle={{
            gap: 10,
            width: '100%',
            justifyContent: 'center',
          }}
          columnWrapperStyle={{ gap: 10, justifyContent: 'center' }}
          scrollEnabled={false}
          data={[
            ...BG_TRACKS,
            { id: 'off', name: 'ללא מוזיקה', value: '', emoji: '🔇' },
          ]}
          renderItem={renderItem}
          keyExtractor={item => item.id.toString()}
          numColumns={3}
        />
      </View>
    </View>
  );
};

export default MusicModal;
