import CategoriesSelection from '@common/components/CategoriesSelection';
import Divider from '@common/components/Divider';
import HorizontalCollection from '@common/components/HorizontalCollection';
import SessionsGrid from '@common/components/SessionsGrid';
import { ListTitle } from '@common/components/Styled';
import Meditate from '@common/components/animation/Meditate';
import NotFound from '@common/components/animation/NotFound';
import { usePurchases } from '@common/context/PurchaseContext';
import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useDebouncedState } from '@services/hooks/useDebouncedState';
import useDiscovery from '@services/hooks/useDiscovery';
import { categoriesSelector } from '@store/selectors';
import { searchInCategories } from '@utils/category';
import { shuffleArray } from '@utils/rand';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, ScrollView, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { Category } from 'types/Category';
import { Session } from 'types/Meditation';

import SearchBar from './SearchBar';

const Explore = () => {
  const { hasPremium } = usePurchases();
  const [firstCollection, ...collections] = useDiscovery();
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useDebouncedState('', 500);
  const { navigate } = useNavigation();
  const categories = useSelector(categoriesSelector) as Category[];

  useEffect(() => {
    setIsLoading(false);
  }, [searchQuery]);

  const onShowAll = (title: string, sessions: Session[]) => {
    // @ts-ignore
    navigate('Main', {
      screen: 'Collection',
      params: { title, sessions },
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
        backgroundColor: theme.colors.bgColor,
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
            <View>
              <HorizontalCollection
                prioritizeFree={!hasPremium}
                items={firstCollection.items}
                title={firstCollection.title}
                onShowAll={() =>
                  onShowAll(firstCollection.title, firstCollection.items)
                }
              />
              <Divider className="my-6" />
            </View>
            <View className="px-3">
              <View className="mb-5 px-2">
                <ListTitle t="על פי קטגוריה" />
              </View>
              <CategoriesSelection
                categories={categories}
                onPress={(c: Category) => {
                  if (!c) {
                    return;
                  }
                  onShowAll(c.title, c.meditations);
                }}
              />
              <Divider className="my-6" />
            </View>
            {shuffleArray(collections).map(category => (
              <View key={category.id}>
                <HorizontalCollection
                  prioritizeFree={!hasPremium}
                  items={category.items}
                  title={category.title}
                  onShowAll={() => onShowAll(category.title, category.items)}
                />
                <Divider className="my-6" />
              </View>
            ))}
          </View>
        )}

      {searchQuery.length > 2 && filteredCategories.length > 0 && (
        <View className="px-5">
          <SessionsGrid
            meditations={shuffleArray(
              filteredCategories.reduce(
                (acc, curr) => [...acc, ...curr.meditations],
                [] as Session[],
              ),
            )}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default Explore;
