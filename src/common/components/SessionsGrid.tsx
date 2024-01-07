import theme, { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import React, { FC, useCallback } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Meditation } from 'types/Meditation';

import MeditationItem from './MeditationItem';
import { CircleButton } from './buttons/CircleButton';

const Header: FC<{ title: string }> = ({ title }) => {
  const { goBack } = useNavigation();

  return (
    <View className="relative flex flex-col items-center justify-center mt-8">
      <View className="absolute left-5 top-0">
        <CircleButton
          backgroundColor="#00000060"
          color="#fff"
          onPress={goBack}
          size={40}
          icon="chevron-right"
        />
      </View>
      <Text
        className="text-center text-3xl font-bold mb-6"
        style={{ fontFamily: theme.fonts!.regular }}>
        {title}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 60,
    paddingHorizontal: 10,
    backgroundColor: colors.bgColor,
  },
  headerText: {
    flex: 1,
    fontFamily: theme.fonts?.regular,
    color: theme.colors.textColor,
    fontSize: 17,
    textAlign: 'center',
    letterSpacing: 5.19,
  },
});

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
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingHorizontal: 20,
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
