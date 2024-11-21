import { useTiming } from '@services/hooks/useTiming';
import { useCategorizedChatFlowStore } from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import React, { useMemo } from 'react';
import { Dimensions, FlatList, StyleSheet } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Animated, {
  Extrapolation,
  interpolate,
  interpolateColor,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { ChatForDrawer } from 'types/Chat';

import { bgDrawerExiting } from '../animation/CustomDrawer';
import DrawerListHeader from './DrawerHeader';
import DrawerItem from './DrawerItem';

const WINDOW_WIDTH = Dimensions.get('window').width;

// 65% of the screen width
const DRAWER_SIDEBAR_WIDTH = WINDOW_WIDTH * 0.65;
const DRAWER_WIDTH = WINDOW_WIDTH * 2;
const CLOSE_AREA_WIDTH = WINDOW_WIDTH - DRAWER_SIDEBAR_WIDTH;

const renderItem = ({ item }: { item: ChatForDrawer }) => {
  return <DrawerItem chat={item} />;
};

type CustomDrawerProps = {
  toggleDrawer: (isOpen: boolean) => void;
  isDrawerOpen: boolean;
};

const CustomDrawer = ({ isDrawerOpen, toggleDrawer }: CustomDrawerProps) => {
  const { selectedCategory } = useCategorizedChatFlowStore(state => ({
    selectedCategory: state.selectedCategory,
  }));
  const { chats } = useChatsStore(state => ({
    chats: state.chats,
  }));

  const chatsToShow = useMemo(() => {
    return chats.filter(chat => {
      if (!selectedCategory && !chat.category) {
        return true;
      }
      return chat.category === selectedCategory;
    });
  }, [chats, selectedCategory]);

  const animationProgress = useTiming(isDrawerOpen, {
    duration: 150,
  });

  const rTranslateXStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: interpolate(
            animationProgress.value,
            [0, 1],
            [DRAWER_WIDTH, 0],
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  });

  const rBgStyle = useAnimatedStyle(() => {
    return {
      backgroundColor: interpolateColor(
        animationProgress.value,
        [0, 1],
        ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.376)'],
        'RGB',
      ),
    };
  });

  return (
    <Animated.View
      exiting={bgDrawerExiting}
      style={[
        StyleSheet.absoluteFill,
        rBgStyle,
        { width: DRAWER_WIDTH, zIndex: 10 },
      ]}
      className="flex flex-row justify-start">
      <Animated.View
        style={[
          rTranslateXStyle,
          {
            width: DRAWER_SIDEBAR_WIDTH,
          },
        ]}
        className="h-full bg-[#FFF8EE] py-[10px]">
        <FlatList
          ListHeaderComponent={<DrawerListHeader />}
          data={chatsToShow}
          renderItem={renderItem}
        />
      </Animated.View>
      <TouchableWithoutFeedback
        style={{
          width: CLOSE_AREA_WIDTH,
        }}
        className="bg-transparent h-full"
        onPress={() => {
          toggleDrawer(false);
        }}
      />
    </Animated.View>
  );
};

export default CustomDrawer;
