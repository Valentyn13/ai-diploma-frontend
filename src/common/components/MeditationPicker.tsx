import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView,
  TouchableOpacity,
} from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { useUser } from '@services/hooks/useUser';
import {
  ChatCategories,
  ChatCategoriesEnum,
  useCategorizedChatFlowStore,
} from '@store/useCategorizedChatFlowStore';
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

const FEELINGS = {
  unsure: { label: 'Задумливо', emoji: '🤔' },
  anxious: { label: 'Тривожно', emoji: '😟' },
  tired: { label: 'Втомлено', emoji: '😪' },
  sad: { label: 'Сумно', emoji: '😢' },
  unfocused: { label: 'Розсіяно ', emoji: '🙄' },
  panicked: { label: 'Панічно', emoji: '😖' },
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
        backgroundColor: selected ? '#FFF8EE' : 'transparent',
      }}
      onPress={onPress}>
      <Text className="text-lg">{icon}</Text>
      <Text className="text-black text-[14px] text-center">{label}</Text>
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
        {isMale ? ' Як ти почуваєшся сьогодні?' : ' Як ти почуваєшся сьогодні?'}
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
        <Text className="text-lg text-white">Далі 👈</Text>
      </TouchableOpacity>
    </BottomSheetView>
  );
};

const MeditationPicker = () => {
  const {
    user: { sex },
  } = useUser();
  const navigation = useNavigation();
  const { isOpen, setIsOpen } = useSheetStore(state => state);
  const { setCurrentStep, setSelectedCategory } = useCategorizedChatFlowStore(
    state => ({
      setSelectedCategory: state.setSelectedCategory,
      setCurrentStep: state.setCurrentStep,
    }),
  );
  const bottomSheetRef = useRef<BottomSheetModal>(null);

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

  const handleCloseClick = () => {
    bottomSheetRef.current?.close();
  };

  const onFinish = useCallback(
    (f: Feeling) => {
      bottomSheetRef.current?.close();
      const navigateToChats = (category: ChatCategories) => {
        //@ts-ignore
        navigation.navigate('Chat');
        setCurrentStep('list');
        setSelectedCategory(category);
      };

      if (f === 'anxious') {
        navigateToChats(ChatCategoriesEnum.ANXIETY);
      } else if (f === 'unsure') {
        navigateToChats(ChatCategoriesEnum.SELF_DEV);
      } else if (f === 'tired') {
        navigateToChats(ChatCategoriesEnum.BAD_HABITS);
      } else if (f === 'sad') {
        navigateToChats(ChatCategoriesEnum.ANXIETY);
      } else if (f === 'unfocused') {
        navigateToChats(ChatCategoriesEnum.NEGATIVE);
      } else if (f === 'panicked') {
        navigateToChats(ChatCategoriesEnum.NEGATIVE);
      }
    },
    [navigation, setCurrentStep, setSelectedCategory],
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
      bottomSheetRef.current?.present();
    } else {
      bottomSheetRef.current?.close();
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
          onPress={handleCloseClick}>
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
          <HowUFeel onNext={onFinish} isMale={sex === 'M'} />
        </BottomSheetView>
      </BottomSheetView>
    </BottomSheetModal>
  );
};

export default MeditationPicker;
