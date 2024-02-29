import { MEDITATIONS_FEELING_LOCATION } from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@services/hooks/useUser';
import { allMeditations } from '@store/selectors';
import { useSheetStore } from '@store/useSheetStore';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { StyleSheet, Text } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

const FEELINGS = {
  calm: { label: 'רגוע', emoji: '😌' },
  stressed: { label: 'מתוסכל', emoji: '😓' },
  anxious: { label: 'חרד', emoji: '😰' },
  sad: { label: 'עצוב', emoji: '😢' },
  unfocused: { label: 'חסר מיקוד', emoji: '😵‍💫' },
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

const HowUFeel: FC<{ onNext: (f: Feeling) => void; isMale: boolean }> = ({
  onNext,
  isMale,
}) => {
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
    <BottomSheetView
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          alignSelf: 'center',
          marginBottom: 10,
        }}>
        {isMale ? ' איך אתה מרגיש היום?' : ' איך את מרגישה היום?'}
      </Text>

      <BottomSheetFlatList
        style={{ marginBottom: 20 }}
        data={Object.keys(FEELINGS)}
        renderItem={renderItem}
        keyExtractor={item => item}
        numColumns={3}
        scrollEnabled={true}
      />
      <TouchableOpacity
        style={{
          padding: 8,
          marginBottom: 20,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          backgroundColor: !selectedFeeling ? '#ddd' : '#273051',
        }}
        disabled={!selectedFeeling}
        onPress={() => onNext(selectedFeeling!)}>
        <Text className="text-lg text-white">המשך 👈</Text>
      </TouchableOpacity>
    </BottomSheetView>
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
    <BottomSheetView
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
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
        scrollEnabled={true}
      />
      <TouchableOpacity
        style={{
          padding: 8,
          marginBottom: 20,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          backgroundColor: !selectedPlace ? '#ddd' : '#273051',
        }}
        disabled={!selectedPlace}
        onPress={() => onNext(selectedPlace!)}>
        <Text className="text-lg text-white">המשך 👈</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );
};

const MeditationPicker = () => {
  const {
    user: { sex },
  } = useUser();
  const { hasPremium } = usePurchases();
  const meditations = useSelector(allMeditations);
  const navigation = useNavigation();
  const { isOpen, setIsOpen } = useSheetStore(state => state);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [showWhereYouAt, setShowWhereYouAt] = useState(false);
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);

  const snapPoints = useMemo(() => ['20%', 380], []);

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
        // @ts-ignore
        navigation.navigate('Main', {
          screen: 'Subscribe',
        });
        setSelectedFeeling(null);
        setShowWhereYouAt(false);
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
        item = meditations.find(m => m.name === 'שחרור היום') || meditations[0];
      }

      // @ts-ignore
      navigation.navigate('Main', {
        screen: 'MeditationPlayer',
        params: { item },
      });

      setSelectedFeeling(null);
      setShowWhereYouAt(false);
    },
    [hasPremium, meditations, navigation, selectedFeeling],
  );

  const renderBackdrop = useCallback(
    props => (
      <BottomSheetBackdrop
        {...props}
        opacity={0.5}
        enableTouchThrough={false}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
        style={[
          { backgroundColor: 'rgba(0, 0, 0, 1)' },
          StyleSheet.absoluteFillObject,
        ]}
      />
    ),
    [],
  );

  useEffect(() => {
    if (isOpen) {
      bottomSheetRef.current!.present();
    } else {
      bottomSheetRef.current!.close();
    }
  }, [isOpen]);

  return (
    <BottomSheetModal
      animateOnMount={false}
      backdropComponent={renderBackdrop}
      containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      handleStyle={{ backgroundColor: '#FFF8EE' }}
      enablePanDownToClose
      ref={bottomSheetRef}
      index={1}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <BottomSheetView
        style={{
          backgroundColor: '#FFF8EE',
          flex: 1,
        }}>
        <TouchableOpacity
          style={{
            zIndex: 100,
            position: 'absolute',
            top: 0,
            left: 8,
            padding: 6,
            borderRadius: 100,
          }}
          onPress={() => bottomSheetRef.current!.close()}>
          <Icon name="x" size={24} color="#000" />
        </TouchableOpacity>
        <BottomSheetView
          style={{
            flex: 1,
            marginTop: scale(32),
            marginBottom: 20,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {showWhereYouAt ? (
            <WhereYouAt onNext={onFinish} />
          ) : (
            <HowUFeel onNext={handleNext} isMale={sex === 'M'} />
          )}
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default MeditationPicker;
