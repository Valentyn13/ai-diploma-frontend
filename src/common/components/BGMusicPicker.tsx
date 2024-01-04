import { BG_TRACKS } from '@common/constants';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import React, { useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';

import { useBgTrackStore } from '../../store/useBgTrackStore';
import Volume from './Volume';

const Option = ({ label, onPress, emoji, isSelected }) => (
  <TouchableOpacity
    className="flex-col items-center justify-center rounded-lg border px-4 py-2 h-24"
    style={{
      width: '46%',
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
      <TouchableOpacity className="p-4 absolute left-0 top-0" onPress={goBack}>
        <Icon size={20} name="chevron-down" color="#273051" />
      </TouchableOpacity>
      <Text
        className="text-center text-3xl font-bold mb-6"
        style={{ fontFamily: theme.fonts.regular }}>
        בחרו מוזיקת רקע
      </Text>
      <FlatList
        contentContainerStyle={{
          gap: 6,
          width: '100%',
          justifyContent: 'center',
        }}
        columnWrapperStyle={{ gap: 6, justifyContent: 'center' }}
        scrollEnabled={false}
        data={[
          ...BG_TRACKS,
          { id: 'off', name: 'ללא מוזיקה', value: '', emoji: '🔇' },
        ]}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
      />

      <Text
        className="text-center text-3xl font-bold mb-6"
        style={{ fontFamily: theme.fonts.regular }}>
        עוצמת קול
      </Text>
      <Volume volume={volume} setVolume={setVolume} />
    </View>
  );
};

export default MusicModal;
