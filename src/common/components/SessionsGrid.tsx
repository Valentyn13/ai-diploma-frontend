import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { FlatList, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Meditation } from 'types/Meditation';

import MeditationItem from './MeditationItem';
import { CircleButton } from './buttons/CircleButton';

const Header: FC<{ title: string }> = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <View className="relative flex flex-row items-start justify-center mt-5">
      <View className="absolute left-0">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={goBack}
          size={40}
          icon="chevron-right"
        />
      </View>
      <Text
        className="text-3xl font-bold text-center"
        style={{ fontFamily: theme.fonts!.regular }}>
        {title}
      </Text>
    </View>
  );
};

const SessionsGrid: FC<{ meditations: Meditation[]; title?: string }> = ({
  meditations,
  title = null,
}) => {
  const { goBack } = useNavigation();
  const renderMeditationItem = useCallback(
    ({ item, index }) => (
      <MeditationItem key={item.id} item={item} index={index} />
    ),
    [],
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {title && <Header title={title} />}
      <FlatList
        contentContainerStyle={{
          paddingTop: 40,
          paddingBottom: 100,
          rowGap: 20,
        }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        scrollEnabled={false}
        data={meditations}
        keyExtractor={item => item.id}
        renderItem={renderMeditationItem}
        numColumns={2}
      />
    </ScrollView>
  );
};

export default SessionsGrid;
