import Collection from '@common/components/Collection';
import SessionsGrid from '@common/components/SessionsGrid';
import { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useDebouncedState } from '@services/hooks/useDebouncedState';
import { searchInCategories } from '@utils/category';
import React, { useEffect, useMemo, useState } from 'react';
import { ActivityIndicator, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { useSelector } from 'react-redux';
import { categoriesSelector } from 'store/selectors';
import { Category } from 'types/Category';
import { Meditation } from 'types/Meditation';

const Meditations = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useDebouncedState('', 200);
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
    <View
      style={{
        backgroundColor: colors.bgColor,
        display: 'flex',
        flex: 1,
      }}>
      <View className="py-3 px-2 rounded-full mt-8 flex-row items-center w-11/12 mx-auto mb-4 border border-gray-300">
        <Icon
          style={{
            transform: [{ rotateY: '180deg' }],
            marginLeft: scale(10),
          }}
          size={scale(20)}
          color="grey"
          name="magnifying-glass"
        />
        <TextInput
          onChangeText={v => {
            setIsLoading(true);
            setSearchQuery(v);
          }}
          placeholderTextColor="grey"
          keyboardType="default"
          returnKeyType="done"
          placeholder="חיפוש מדיטציה..."
          className="w-5/6 mx-5 text-2xl text-right text-black leading-7"
        />
      </View>

      {isLoading && (
        <View className="px-4 py-2 w-full h-48 flex items-center justify-center">
          <ActivityIndicator size="large" color={colors.primary} />
          <Text className="text-gray-500 mt-2">מחפש...</Text>
        </View>
      )}

      {!isLoading && searchQuery.length > 0 && searchQuery.length <= 2 && (
        <View className="px-4 py-2 w-full h-48 flex items-center justify-center">
          <Text className="text-gray-500">נא להזין לפחות 3 תווים לחיפוש</Text>
        </View>
      )}

      {!isLoading &&
        searchQuery.length > 2 &&
        filteredCategories.length === 0 && (
          <View className="px-4 py-2 w-full h-48 flex items-center justify-center">
            <Text className="text-gray-500">לא נמצאו תוצאות</Text>
          </View>
        )}

      {!isLoading &&
        searchQuery.length === 0 &&
        filteredCategories.length > 0 && (
          <ScrollView>
            {filteredCategories
              .sort((a, b) => a.order - b.order)
              .map(category => (
                <View className="mb-4" key={category.id}>
                  <Collection
                    items={category.meditations}
                    title={category.title}
                    onShowAll={() =>
                      onShowAll(category.title, category.meditations)
                    }
                  />
                </View>
              ))}
          </ScrollView>
        )}

      {searchQuery.length > 2 && filteredCategories.length > 0 && (
        <SessionsGrid
          meditations={filteredCategories.reduce(
            (acc, curr) => [...acc, ...curr.meditations],
            [] as Meditation[],
          )}
        />
      )}
    </View>
  );
};

export default Meditations;
