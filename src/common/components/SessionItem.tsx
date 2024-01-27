import theme from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import { logEvent } from '@utils/analytics';
import React, { memo, useCallback } from 'react';
import { Pressable, Text, View } from 'react-native';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome6';

import GradientBackground from './GradientBackground';

interface SessionItemProps {
  item: {
    id: string;
    name: string;
    colors: string[];
  };
}

const SessionItem: React.FC<SessionItemProps> = memo(
  ({ item: { id, name, colors } }) => {
    const { navigate } = useNavigation();
    const amplitudeInstance = useAmplitude();

    const navigateToPlayer = useCallback(() => {
      amplitudeInstance.logEvent('EXERCISE_CLICKED');
      amplitudeInstance.uploadEvents();
      logEvent('EXERCISE_CLICKED', { id });

      // @ts-ignore TODO: fix this
      navigate('Exercises', {
        key: id,
      });
    }, [navigate, amplitudeInstance, id]);

    // const navigateToModal = useCallback(() => {
    //   amplitudeInstance.logEvent('MEDITATION_MODAL_CLICKED');
    //   logEvent('MEDITATION_MODAL_CLICKED', { id, categoryName });
    //   amplitudeInstance.uploadEvents();
    //   // @ts-ignore TODO: fix this
    //   navigate('SessionModal', { id });
    // }, [amplitudeInstance, categoryName, id, navigate]);

    return (
      <Pressable
        onPress={navigateToPlayer}
        style={{
          width: theme.dimens.winWidth / 2.4,
          height: 220,
          maxWidth: theme.dimens.winWidth / 2 - 28,
        }}>
        <View
          className="flex-1 overflow-hidden"
          style={{
            borderRadius: 8,
          }}>
          <View className="flex-1 items-center justify-center">
            <GradientBackground colors={colors} />
          </View>
        </View>
        <View className="flex flex-col items-start justify-center py-1 px-2 h-12">
          <Text className="text-black text-[15px] font-medium text-left tracking-tighter leading-6 w-full">
            {name}
          </Text>
          <View className="flex flex-row items-center">
            <IconFontAwesome color="#000" name="user-large" size={10} />
            <Text className="text-black text-xs ml-1">כלים מבית רגע</Text>
          </View>
        </View>
      </Pressable>
    );
  },
);

export default SessionItem;
