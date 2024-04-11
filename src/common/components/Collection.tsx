import ParallaxScrollView from '@common/components/ParallaxScrollView';
import { CircleButton } from '@common/components/buttons/CircleButton';
import theme from '@common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Session } from 'types/Meditation';

import Gradient from './Gradient';
import SessionsGrid from './SessionsGrid';

const Header: FC<{ title: string; subTitle?: string }> = ({
  title,
  subTitle,
}) => (
  <View className="flex flex-col items-center">
    <Text style={styles.headerTitle}>{title}</Text>
    {subTitle && <Text className="text-black mt-2">{subTitle}</Text>}
  </View>
);

const MAX_MEDITATIONS = 40;

interface CollectionRouteParams {
  title: string;
  sessions: Session[];
}

const Collection = () => {
  const route = useRoute();
  const { title, sessions }: CollectionRouteParams =
    (route.params as CollectionRouteParams) || {
      title: '',
      sessions: [],
    };

  const { goBack } = useNavigation();

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.safeAreaView}>
      <ParallaxScrollView
        image={sessions[0]?.thumbnail}
        backgroundColor="#fdedd6"
        contentBackgroundColor="#fdedd6"
        parallaxHeaderHeight={250}
        renderForeground={() => (
          <View style={styles.foreground}>
            <Gradient seed={title} angle={45} />
            <Header title={title} subTitle={`${sessions.length} סשנים`} />
          </View>
        )}
        renderStickyHeader={() => (
          <View style={styles.stickyHeader}>
            <CircleButton
              backgroundColor="#00000060"
              color="#fff"
              onPress={goBack}
              size={40}
              icon="chevron-right"
            />
          </View>
        )}>
        <View style={styles.sessionsContainer}>
          <SessionsGrid meditations={sessions.slice(0, MAX_MEDITATIONS)} />
        </View>
      </ParallaxScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    backgroundColor: '#fdedd6',
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: theme.fonts.bold,
    lineHeight: 32,
  },
  foreground: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    height: 300,
  },
  stickyHeader: {
    position: 'absolute',
    left: 20,
    top: 20,
    zIndex: 10,
  },
  sessionsContainer: {
    paddingHorizontal: 20,
  },
});

export default Collection;
