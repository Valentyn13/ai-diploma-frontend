import FrequenciesBanner from '@common/components/Banner/FrequenciesBanner';
import CategoriesSelectionList from '@common/components/CategoriesSelectionList';
import HorizontalCollection from '@common/components/HorizontalCollection';
import SessionsGrid from '@common/components/SessionsGrid';
import Meditate from '@common/components/animation/Meditate';
import NotFound from '@common/components/animation/NotFound';
import {
  CATEGORIES_TO_SHOW_IN_EXPLORE_CAROUSEL,
  CategoriesObject,
  MeditationCategoryKey,
  PICK_MEDITATION_CATEGORY_IDS,
  REGA_INSTRUCTOR_ID,
} from '@common/constants';
import { useNavigation } from '@react-navigation/native';
import { useDebouncedState } from '@services/hooks/useDebouncedState';
import useDiscovery from '@services/hooks/useDiscovery';
import {
  categoriesSelector,
  favoriteMeditationsSelector,
} from '@store/selectors';
import { querySessions } from '@utils/category';
import { shuffleArray } from '@utils/rand';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { walkthroughable } from 'react-native-copilot';
import { useSelector } from 'react-redux';
import { Category } from 'types/Category';
import { Session } from 'types/Meditation';

import SearchBar from './SearchBar';

function removeEmojis(text: string) {
  return text?.replace(
    /[\p{Emoji}\u200B-\u200D\uFE0F\u2122\uD83C-\uDBFF\uDC00-\uDFFF\u2300-\u23FF]/gu,
    '',
  );
}

const Explore = ({ navigation, copilot }) => {
  //const [firstCollection, ...collections] = useDiscovery();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useDebouncedState('', 500);
  const { navigate } = useNavigation();
  const instructors = useMemo(() => [], []);
  const categories = useMemo(() => [], []);
  const allAppMeditations = useMemo(() => [], []);
  const regaInstructor = instructors.find(
    i => !!i && i._id === REGA_INSTRUCTOR_ID,
  );

  const regaInstructorMeditations = useMemo(
    () =>
      allAppMeditations.filter(({ id }) =>
        regaInstructor?.categories?.includes(id),
      ),
    [allAppMeditations, regaInstructor],
  );

  const regaCollection = {
    id: regaInstructor?.id,
    title: '🎧 תדרים',
    meditations: regaInstructorMeditations,
    order: 1,
  } as Category;

  const favoriteMeditations = useSelector(favoriteMeditationsSelector);

  const categoriesArrayToObject: CategoriesObject = useMemo(() => {
    return categories.reduce((acc, category) => {
      acc[category.id] = category;
      return acc;
    }, {} as CategoriesObject);
  }, [categories]);

  function getMeditationData(id: MeditationCategoryKey) {
    return categoriesArrayToObject[PICK_MEDITATION_CATEGORY_IDS[id]] || [];
  }

  const stress = getMeditationData('stress');

  const empover = getMeditationData('empover');

  const emergency = getMeditationData('emergency');

  const pocketMeditation = getMeditationData('pocket_meditation');

  const focus = getMeditationData('focus');

  const categoriesToShowInCarousel = useMemo(() => {
    const forShow = categories.filter(c =>
      CATEGORIES_TO_SHOW_IN_EXPLORE_CAROUSEL.includes(c.id),
    );
    forShow.unshift(regaCollection);
    return forShow;
  }, [categories]);

  const onShowAll = (title: string, sessions: Session[]) => {
    // @ts-ignore
    navigate('Main', {
      screen: 'Collection',
      params: { title, sessions },
    });
  };

  const filteredSessions = useMemo(
    () => querySessions(categories, instructors, searchQuery.toLowerCase()),
    [categories, instructors, searchQuery],
  );

  useEffect(() => {
    setIsLoading(false);
  }, [searchQuery]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#FFF7EE',
        flexGrow: 1,
      }}>
      <View className="px-5">
        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={v => {
            if (!isLoading) {
              setIsLoading(true);
            }

            setSearchQuery(v);
          }}
        />
      </View>

      {isLoading && (
        <View className="px-4 py-2 w-full h-48 flex items-center justify-center">
          <ActivityIndicator size="large" color="#000" />
          <Text className="text-gray-500 mt-2">מחפש...</Text>
        </View>
      )}

      {!isLoading && searchQuery.length > 0 && searchQuery.length <= 2 && (
        <View className="flex-1 flex items-center justify-center">
          <View className="px-4 py-2">
            <Text className="text-gray-500 text-center">
              אנא הכניסו לפחות 3 תווים לחיפוש
            </Text>
          </View>
          <View className="h-48 w-8/12">
            <Meditate />
          </View>
        </View>
      )}

      {!isLoading &&
        searchQuery.length > 2 &&
        filteredSessions.length === 0 && (
          <View className="flex-1 flex items-center justify-center">
            <View className="px-4 py-2">
              <Text className="text-gray-500 text-center">
                אין תוצאות עבור "{searchQuery}"
              </Text>
            </View>
            <View className="h-48 w-8/12">
              <NotFound />
            </View>
          </View>
        )}

      {!isLoading && searchQuery.length === 0 && (
        <View className="">
          {/* <View>
            <HorizontalCollection
              items={firstCollection.items}
              title={firstCollection.title}
              onShowAll={() =>
                onShowAll(firstCollection.title, firstCollection.items)
              }
            />
            <Divider className="my-6" />
          </View> */}

          {/* Liked Meditations */}
          {favoriteMeditations.length > 0 && (
            <View className="mt-[4px]">
              <HorizontalCollection
                items={favoriteMeditations}
                title={'מדיטציות שאהבת'}
                onShowAll={() =>
                  onShowAll('מדיטציות שאהבת', favoriteMeditations)
                }
              />
            </View>
          )}

          {/* Stress Category */}
          <View className="mt-[28px]">
            <HorizontalCollection
              items={stress.meditations}
              title={removeEmojis(stress.title)}
              onShowAll={() => onShowAll(stress.title, stress.meditations)}
            />
          </View>

          {/* Empover Category */}
          <View className="mt-[28px]">
            <HorizontalCollection
              items={empover.meditations}
              title={removeEmojis(empover.title)}
              onShowAll={() => onShowAll(empover.title, empover.meditations)}
            />
          </View>

          <View className="my-[40px]">
            <FrequenciesBanner />
          </View>
          {/* {shuffleArray(collections).map(category => (
            <View key={category.id}>
              <HorizontalCollection
                items={category.items}
                title={category.title}
                onShowAll={() => onShowAll(category.title, category.items)}
              />
              <Divider className="my-6" />
            </View>
          ))} */}

          {/* Emergency Category */}
          <View className="">
            <HorizontalCollection
              items={emergency.meditations}
              title={removeEmojis(emergency.title)}
              onShowAll={() =>
                onShowAll(emergency.title, emergency.meditations)
              }
            />
          </View>

          {/* Pocket Meditation Category */}
          <View className="mt-[28px]">
            <HorizontalCollection
              items={pocketMeditation.meditations}
              title={removeEmojis(pocketMeditation.title)}
              onShowAll={() =>
                onShowAll(pocketMeditation.title, pocketMeditation.meditations)
              }
            />
            {/* <Divider className="my-6" /> */}
          </View>

          {/* Focus Category */}
          <View className="mt-[28px]">
            <HorizontalCollection
              items={focus.meditations}
              title={removeEmojis(focus.title)}
              onShowAll={() => onShowAll(focus.title, focus.meditations)}
            />
          </View>

          {/* Categories Carousel */}
          <View className="mb-16 mt-[28px]">
            <Text className="text-[#414141] text-left text-[20px] mb-[10px] font-medium leading-[23px] pl-5">
              קטגוריות נוספות
            </Text>
            <CategoriesSelectionList
              categories={categoriesToShowInCarousel}
              onPress={(c: Category) => {
                if (!c) {
                  return;
                }
                onShowAll(c.title, c.meditations);
              }}
            />
          </View>
        </View>
      )}

      {searchQuery.length > 2 && filteredSessions.length > 0 && (
        <View className="px-5">
          <SessionsGrid meditations={shuffleArray(filteredSessions)} />
        </View>
      )}
    </ScrollView>
  );
};

export default Explore;
