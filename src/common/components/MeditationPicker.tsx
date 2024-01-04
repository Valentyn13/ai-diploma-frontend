import { MEDITATIONS_FEELING_LOCATION } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';
import { allMeditations } from 'store/selectors';

import { useSheetStore } from '../../store/useSheetStore';
import Button from './HighlightButton';

const FEELINGS = {
  calm: { label: 'רגוע', emoji: '😌' },
  stressed: { label: 'מתוסכל', emoji: '😓' },
  anxious: { label: 'חרד', emoji: '😰' },
  sad: { label: 'עצוב', emoji: '😢' },
  unsure: { label: 'לא בטוח', emoji: '😕' },
  angry: { label: 'כועס', emoji: '😡' },
};

type Feeling = keyof typeof FEELINGS;

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

const HowUFeel: FC<{ onNext: (f: Feeling) => void }> = ({ onNext }) => {
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);

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
        onPress={() => onNext(selectedFeeling)}
        disabled={!selectedFeeling}
        text="המשך"
      />
    </View>
  );
};
const PLACES = {
  home: { label: 'בבית', icon: '🏠' },
  work: { label: 'בעבודה', icon: '💼' },
  study: { label: 'בלימודים', icon: '🎓' },
  way: { label: 'בדרך', icon: '🏃' },
  army: { label: 'בצבא', icon: '🪖' },
  bed: { label: 'במיטה', icon: '🛌' },
};

type Place = keyof typeof PLACES;

const WhereYouAt: FC<{ onNext: (l: Place) => void }> = ({ onNext }) => {
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
        onPress={() => onNext(selectedPlace!)}
      />
    </View>
  );
};

const MeditationPicker = () => {
  const { hasPremium } = usePurchases();
  const meditations = useSelector(allMeditations);
  const navigation = useNavigation();
  const setIsOpen = useSheetStore(state => state.setIsOpen);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const [showWhereYouAt, setShowWhereYouAt] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);

  const snapPoints = useMemo(() => ['20%', 340], []);

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

  const handleNext = useCallback((f: Feeling) => {
    setSelectedFeeling(f);
    setShowWhereYouAt(true);
  }, []);

  const onFinish = useCallback(
    (selectedPlace: Place) => {
      bottomSheetRef.current!.close();

      if (!hasPremium) {
        navigation.navigate('Main', {
          screen: 'Subscribe',
        });
        return;
      }

      const filteredIds = MEDITATIONS_FEELING_LOCATION.filter(
        ({ feeling, location }) =>
          // @ts-ignore
          feeling.includes(selectedFeeling!) &&
          // @ts-ignore
          location.includes(selectedPlace!),
      ).map(({ id }) => id);

      const id = filteredIds[Math.floor(Math.random() * filteredIds.length)];

      let item = meditations.find(m => m.id === id);

      if (!item) {
        item = meditations.find(m => m.name === 'שחרור היום');
      }

      // @ts-ignore
      navigation.navigate('Main', {
        screen: 'MeditationPlayer',
        params: { item },
      });
    },
    [hasPremium, meditations, navigation, selectedFeeling],
  );

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
        <View className="flex-1 mt-8 justify-center items-center mb-4">
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
