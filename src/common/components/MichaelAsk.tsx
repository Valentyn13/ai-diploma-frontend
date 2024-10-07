import image from '@common/assets/images';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { useUser } from '@services/hooks/useUser';
import { useMichaelStore } from '@store/useMichaelStore';
import { isCreatedThisWeek } from '@utils/session';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/Feather';
import { useSelector } from 'react-redux';

const FEELINGS = {
  wow: { label: 'מרומם', emoji: '🤩' },
  ok: { label: 'בסדר', emoji: '😊' },
  notSure: { label: 'לא בטוח', emoji: '🤔' },
  notGood: { label: 'לא משהו', emoji: '😔' },
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
        width: 120,
        height: 80,
        backgroundColor: selected ? '#FFEFD7' : 'transparent',
      }}
      onPress={onPress}>
      <Text className="text-lg">{icon}</Text>
      <Text className="text-black text-[16px]">{label}</Text>
    </TouchableOpacity>
  );
};

const HowUFeel: FC<{
  name: string;
  numOfSessions: number;
  onCancel: () => void;
  onSelect: (f: Feeling) => void;
}> = ({ name, numOfSessions, onCancel, onSelect }) => {
  return (
    <BottomSheetView
      style={{
        flex: 1,
        width: '100%',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingBottom: 60,
      }}>
      <Text
        style={{
          color: 'black',
          fontSize: 20,
          alignSelf: 'center',
          marginBottom: 10,
          textAlign: 'center',
          maxWidth: 280,
        }}>
        כל הכבוד {name}, זה התירגול ה{numOfSessions} שלך השבוע!
      </Text>
      <Text className="text-sm text-center font-light mt-2 mb-4 max-w-[300px]">
        תרצה לשתף אותי בתחושות שלך לאחר התרגול?
      </Text>

      <View className="flex flex-row flex-wrap justify-center w-[300px]">
        {Object.keys(FEELINGS).map((item: keyof typeof FEELINGS) => (
          <Option
            label={FEELINGS[item].label}
            icon={FEELINGS[item].emoji}
            onPress={onSelect}
          />
        ))}
      </View>
      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 20,
          padding: 8,
          borderRadius: 8,
          justifyContent: 'center',
          alignItems: 'center',
          width: '80%',
          backgroundColor: '#273051',
        }}
        onPress={onCancel}>
        <Text className="text-lg text-white">לא עכשיו</Text>
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
        onPress={() => onNext(selectedPlace!)}>
        <Text className="text-lg text-white">לא עכשיו</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );
};

const MichaelAvatar = () => (
  <Image
    className="absolute -top-7 w-14 h-14 rounded-full bg-[#F1F1F1] border-2 border-[#CAD1D6] left-1/2 transform translate-x-7"
    source={image('michael_2')}
  />
);

const MichaelAsk = () => {
  const {
    user: { name },
  } = useUser();
  const { meditationsPracticed } = useSelector(state => state.userProgress);
  const { isOpen, setIsOpen } = useMichaelStore(state => state);
  const bottomSheetRef = useRef<BottomSheetModal>(null);
  const [selectedFeeling, setSelectedFeeling] = useState<Feeling | null>(null);

  const snapPoints = useMemo(() => [200, '50%'], []);

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

  const numSessionsThisWeek = useMemo(
    () => meditationsPracticed.filter(isCreatedThisWeek).length,
    [meditationsPracticed],
  );

  const onStartConversation = useCallback(() => {}, []);

  const onClose = () => {
    setSelectedFeeling(null);
    setIsOpen(false);
  };

  const onFinish = (place: Place) => {
    // onClose();
    // navigation.navigate('MichaelConversation', { place });
  };

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
      enablePanDownToClose
      ref={bottomSheetRef}
      index={1}
      handleComponent={MichaelAvatar}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}>
      <BottomSheetView
        style={{
          backgroundColor: '#ffffff80',
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
          onPress={onClose}>
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
          {selectedFeeling ? (
            <WhereYouAt onNext={onFinish} />
          ) : (
            <HowUFeel
              name={name}
              numOfSessions={numSessionsThisWeek}
              onCancel={onClose}
              onSelect={setSelectedFeeling}
            />
          )}
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default MichaelAsk;
