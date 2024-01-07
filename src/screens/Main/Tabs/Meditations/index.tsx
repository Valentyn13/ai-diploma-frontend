import Collection from '@common/components/Collection';
import Divider from '@common/components/Divider';
import SessionsGrid from '@common/components/SessionsGrid';
import Meditate from '@common/components/animation/Meditate';
import NotFound from '@common/components/animation/NotFound';
import { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useDebouncedState } from '@services/hooks/useDebouncedState';
import { searchInCategories } from '@utils/category';
import { shuffleArray } from '@utils/rand';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';
import { Category } from 'types/Category';
import { Meditation } from 'types/Meditation';

import SearchBar from './SearchBar';

const Meditations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useDebouncedState('', 500);
  const { navigate } = useNavigation();
  const categories = useSelector(categoriesSelector) as Category[];

  useEffect(() => {
    setIsLoading(false);
  }, [searchQuery]);

  const onShowAll = (title: string, meditations: any[]) => {
    // @ts-ignore
    navigate('Main', {
      screen: 'GroupedMeditations',
      params: { title, meditations },
    });
  };

  const filteredCategories = useMemo(
    () =>
      searchQuery.length > 2
        ? searchInCategories(categories, searchQuery.toLowerCase())
        : categories,
    [categories, searchQuery],
  );

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: colors.bgColor,
        display: 'flex',
        flex: 1,
      }}>
      <View className="mb-8 px-5">
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
          <ActivityIndicator size="large" color={colors.primary} />
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
        filteredCategories.length === 0 && (
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

      {!isLoading &&
        searchQuery.length === 0 &&
        filteredCategories.length > 0 && (
          <View>
            {filteredCategories
              .sort((a, b) => a.order - b.order)
              .map(category => (
                <View key={category.id}>
                  <Collection
                    items={category.meditations}
                    title={category.title}
                    onShowAll={() =>
                      onShowAll(category.title, category.meditations)
                    }
                  />
                  <Divider className="my-6" />
                </View>
              ))}
          </View>
        )}

      {searchQuery.length > 2 && filteredCategories.length > 0 && (
        <SessionsGrid
          meditations={shuffleArray(
            filteredCategories.reduce(
              (acc, curr) => [...acc, ...curr.meditations],
              [] as Meditation[],
            ),
          )}
        />
      )}
    </ScrollView>
  );
};

export default Meditations;
