import PageTitle from '@screens/Onboarding/PageTitle';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useCache from '@services/hooks/useCache';
import { INTRO_METADATA_KEY, IntroMetadata } from '@services/hooks/useIntro';
import i18n from '@services/localization/i18n';
import { chooseCategories } from '@store/actions';
import React, { useEffect, useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

const CATEGORIES = [
  {
    key: 'Sleep',
    intro: 'sleepIntro',
    emoji: '💤',
  },
  {
    key: 'Stress',
    intro: 'stressIntro',
    emoji: '😰',
  },
  {
    key: 'army',
    intro: 'armyIntro',
    emoji: '🪖',
  },

  {
    key: 'South',
    intro: 'southIntro',
    emoji: '🧠',
  },
] as const;

type Category = (typeof CATEGORIES)[number]['key'];

const MAX_SELECTION = 3;

const Intro = () => {
  const dispatch = useDispatch();
  const { width } = Dimensions.get('screen');
  const [value, setValue] = useCache<IntroMetadata>(INTRO_METADATA_KEY, {
    categories: [],
  });

  const [selectedItems, setSelectedItems] = useState<Category[]>(
    value.categories as Category[],
  );
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'categories' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectCategory = (newCategories: Category[]) => {
    setSelectedItems(newCategories);
    dispatch(chooseCategories({ categories: selectedItems || [] }));
    setValue({
      ...value,
      categories: selectedItems,
    });
  };

  const canSelect = selectedItems.length < MAX_SELECTION;
  const isSelected = (itemKey: Category) => selectedItems.includes(itemKey);

  return (
    <View className="flex-1 bg-[#fdedd6] justify-center items-center">
      <PageTitle
        title="במה רגע יכולה לעזור לך?"
        subTitle="ניתן לבחור עד 3 נושאים"
      />
      <View className="flex flex-row flex-wrap gap-2 items-center justify-center">
        {CATEGORIES.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              let newSelectedItems: Category[] = [];
              if (isSelected(item.key)) {
                newSelectedItems = selectedItems.filter(i => i !== item.key);
              } else if (canSelect) {
                newSelectedItems = [...selectedItems, item.key];
              }

              selectCategory(newSelectedItems);
            }}
            style={{
              width: width / 2 - 20,
              backgroundColor: selectedItems.includes(item.key)
                ? '#D66366'
                : 'white',
            }}
            className="rounded-lg h-32 justify-center items-center">
            <Text
              className="text-center mb-2 px-10"
              style={{
                color: selectedItems.includes(item.key) ? 'white' : 'black',
              }}>
              {i18n.t(item.intro)}
            </Text>

            <Text className="text-3xl">{item.emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Intro;
