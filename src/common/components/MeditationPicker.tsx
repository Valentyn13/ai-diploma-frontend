import BottomSheet from '@gorhom/bottom-sheet';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { Button, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useSheetStore } from '../../store/useSheetStore';

const FEELINGS = {
  calm: { label: 'רגוע', emoji: '😌' },
  stressed: { label: 'מתוסכל', emoji: '😓' },
  anxious: { label: 'חרד', emoji: '😰' },
  sad: { label: 'עצוב', emoji: '😢' },
  happy: { label: 'שמח', emoji: '😄' },
  angry: { label: 'כועס', emoji: '😡' },
  tired: { label: 'עייף', emoji: '😴' },
  energetic: { label: 'אנרגטי', emoji: '🚀' },
  // unsure: { label: 'לא בטוח', emoji: '🤔' },
};

const Feeling = ({
  name,
  onPress,
}: {
  name: keyof typeof FEELINGS;
  onPress: () => void;
}) => {
  const { label, emoji } = FEELINGS[name];

  return (
    <TouchableOpacity className="w-20 h-20 mb-1" onPress={onPress}>
      <View className="p-2 rounded-md flex flex-col justify-center items-center border border-gray-300">
        <Text className="text-lg">{emoji}</Text>
        <Text className="text-md">{label}</Text>
      </View>
    </TouchableOpacity>
  );
};

const HowUFeel = () => {
  const handleFeelingPress = (feeling: keyof typeof FEELINGS) => {
    console.log(`Feeling selected: ${feeling}`);
  };

  return (
    <View>
      <Text className="text-black text-2xl self-center">
        איך אתה מרגיש היום?
      </Text>

      <View className="flex flex-row justify-between items-center mt-4 flex-wrap px-6 mb-4">
        {Object.keys(FEELINGS).map(feeling => (
          <Feeling
            key={feeling}
            name={feeling as keyof typeof FEELINGS}
            onPress={() => handleFeelingPress(feeling as keyof typeof FEELINGS)}
          />
        ))}
      </View>

      <Button title="המשך" />
    </View>
  );
};

const MeditationPicker = () => {
  const setIsOpen = useSheetStore(state => state.setIsOpen);
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['20%', '45%'], []);

  useEffect(() => {
    if (bottomSheetRef.current) {
      bottomSheetRef.current.snapToIndex(0);
    }
  }, [bottomSheetRef]);

  const handleSheetChanges = useCallback(
    (index: number) => {
      if (index === -1) {
        setIsOpen(false);
      }
    },
    [setIsOpen],
  );

  return (
    <BottomSheet
      handleStyle={{ backgroundColor: '#FFF8EE' }}
      enablePanDownToClose
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View className="bg-[#FFF8EE] flex-1">
        {/* <TouchableOpacity
          className="absolute top-0 left-0 p-4"
          onPress={() => bottomSheetRef.current!.close()}>
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity> */}
        <View className="flex-1 justify-center items-center">
          <HowUFeel />
        </View>
      </View>
    </BottomSheet>
  );
};

export default MeditationPicker;
