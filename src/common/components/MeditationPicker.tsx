import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Button, FlatList, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';

import { useSheetStore } from '../../store/useSheetStore';

const FEELINGS = {
  calm: { label: 'רגוע', emoji: '😌' },
  stressed: { label: 'מתוסכל', emoji: '😓' },
  anxious: { label: 'חרד', emoji: '😰' },
  sad: { label: 'עצוב', emoji: '😢' },
  happy: { label: 'שמח', emoji: '😄' },
  angry: { label: 'כועס', emoji: '😡' },
};

const Feeling = ({
  name,
  onPress,
  selected,
}: {
  name: keyof typeof FEELINGS;
  onPress: () => void;
  selected: boolean;
}) => {
  const { label, emoji } = FEELINGS[name];

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
      <Text style={{ fontSize: 18 }}>{emoji}</Text>
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
};

const HowUFeel = ({ onNext }: { onNext: () => void }) => {
  const [selectedFeeling, setSelectedFeeling] = useState<
    keyof typeof FEELINGS | null
  >(null);

  const renderItem = useCallback(
    ({ item }) => (
      <Feeling
        name={item as keyof typeof FEELINGS}
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

      <FlatList
        style={{ marginBottom: 20 }}
        data={Object.keys(FEELINGS)}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3}
        scrollEnabled={false}
      />
      <View className="mb-2">
        <Button title="המשך" disabled={!selectedFeeling} onPress={onNext} />
      </View>
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

const Place = ({
  name,
  onPress,
  selected,
}: {
  name: keyof typeof PLACES;
  onPress: () => void;
  selected: boolean;
}) => {
  const { label, icon } = PLACES[name];

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
      <Text style={{ fontSize: 18 }}>{icon}</Text>
      <Text style={{ fontSize: 16 }}>{label}</Text>
    </TouchableOpacity>
  );
};

const WhereYouAt = ({ onNext }: { onNext: () => void }) => {
  const [selectedPlace, setSelectedPlace] = useState<
    keyof typeof PLACES | null
  >(null);

  const renderItem = useCallback(
    ({ item }) => (
      <Place
        name={item as keyof typeof PLACES}
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

      <FlatList
        style={{ marginBottom: 20 }}
        data={Object.keys(PLACES)}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3}
        scrollEnabled={false}
      />
      <View className="mb-2">
        <Button title="המשך" disabled={!selectedPlace} onPress={onNext} />
      </View>
    </View>
  );
};

const MeditationPicker = () => {
  const navigation = useNavigation();
  const setIsOpen = useSheetStore(state => state.setIsOpen);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showWhereYouAt, setShowWhereYouAt] = useState(false);

  const snapPoints = useMemo(() => ['20%', 300], []);

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
