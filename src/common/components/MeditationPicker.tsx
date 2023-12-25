import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { useSheetStore } from '../../store/useSheetStore';
import Button from './HighlightButton';

const FEELINGS = {
  calm: { label: 'רגוע', emoji: '😌' },
  stressed: { label: 'מתוסכל', emoji: '😓' },
  anxious: { label: 'חרד', emoji: '😰' },
  sad: { label: 'עצוב', emoji: '😢' },
  happy: { label: 'שמח', emoji: '😄' },
  angry: { label: 'כועס', emoji: '😡' },
};

const Option = ({
  label,
  icon,
  onPress,
  selected,
}: {
  label: string;
  icon: string;
  onPress: () => void;
  selected: boolean;
}) => {
  return (
    <TouchableOpacity
      style={{
        padding: 10,
        margin: 4,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: selected ? '#FFC4B2' : '#ddd',
        width: 100,
        backgroundColor: selected ? '#FFEFD7' : 'transparent',
      }}
      onPress={onPress}>
      <Text className="text-lg">{icon}</Text>
      <Text className="text-black text-[16px]">{label}</Text>
    </TouchableOpacity>
  );
};

const HowUFeel = ({ onNext }: { onNext: () => void }) => {
  const [selectedFeeling, setSelectedFeeling] = useState<
    keyof typeof FEELINGS | null
  >(null);

  const renderItem = useCallback(
    ({ item }: { item: keyof typeof FEELINGS }) => (
      <Option
        label={FEELINGS[item].label}
        icon={FEELINGS[item].emoji}
        onPress={() => setSelectedFeeling(item)}
        selected={selectedFeeling === item}
      />
    ),
    [selectedFeeling],
  );

  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        איך אתה מרגיש היום?
      </Text>

      <BottomSheetFlatList
        style={{ marginBottom: 20 }}
        data={Object.keys(FEELINGS)}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3}
        scrollEnabled={false}
      />
      <Button
        className="mb-2"
        onPress={onNext}
        disabled={!selectedFeeling}
        text="המשך"
      />
    </View>
  );
};
const PLACES = {
  home: { label: 'בבית', icon: '🏠' },
  work: { label: 'בעבודה', icon: '💼' },
  park: { label: 'בפארק', icon: '🌳' },
  way: { label: 'בדרך', icon: '🚗' },
  gym: { label: 'חדר כושר', icon: '🏋️‍♂️' },
  bed: { label: 'במיטה', icon: '🛌' },
};

const WhereYouAt = ({ onNext }: { onNext: () => void }) => {
  const [selectedPlace, setSelectedPlace] = useState<
    keyof typeof PLACES | null
  >(null);

  const renderItem = useCallback(
    ({ item }: { item: keyof typeof PLACES }) => (
      <Option
        label={PLACES[item].label}
        icon={PLACES[item].icon}
        onPress={() => setSelectedPlace(item)}
        selected={selectedPlace === item}
      />
    ),
    [selectedPlace],
  );

  return (
    <View>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        איפה אתה נמצא כרגע?
      </Text>

      <BottomSheetFlatList
        style={{ marginBottom: 20 }}
        data={Object.keys(PLACES)}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3}
        scrollEnabled={false}
      />
      <Button
        className="mb-2"
        text="המשך"
        disabled={!selectedPlace}
        onPress={onNext}
      />
    </View>
  );
};

const MeditationPicker = () => {
  const navigation = useNavigation();
  const setIsOpen = useSheetStore(state => state.setIsOpen);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showWhereYouAt, setShowWhereYouAt] = useState(false);

  const snapPoints = useMemo(() => ['20%', 320], []);

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

  const handleNext = useCallback(() => {
    setShowWhereYouAt(true);
  }, []);

  const onFinish = useCallback(() => {
    bottomSheetRef.current!.close();

    const item = {
      animation: undefined,
      categoryName: 'PocketMeditation',
      id: '64daea785d57908b4359d27a',
      name: 'שחרור היום',
      url: 'https://regameditation.s3.us-east-2.amazonaws.com/ReleaseTheDay_MayaKramer.mp3',
    };

    // @ts-ignore
    navigation.navigate('Main', {
      screen: 'MeditationPlayer',
      params: { item, autoPlay: true },
    });
  }, [navigation]);

  return (
    <BottomSheet
      containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      handleStyle={{ backgroundColor: '#FFF8EE' }}
      enablePanDownToClose
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <View className="bg-[#FFF8EE] flex-1">
        <TouchableOpacity
          className="absolute top-0 left-4"
          onPress={() => bottomSheetRef.current!.close()}>
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity>
        <View className="flex-1 mt-8 justify-center items-center">
          {showWhereYouAt ? (
            <WhereYouAt onNext={onFinish} />
          ) : (
            <HowUFeel onNext={handleNext} />
          )}
        </View>
      </View>
    </BottomSheet>
  );
};

export default MeditationPicker;
