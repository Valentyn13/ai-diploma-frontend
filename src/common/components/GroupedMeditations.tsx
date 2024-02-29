import ParallaxScrollView from '@common/components/ParallaxScrollView';
import { CircleButton } from '@common/components/buttons/CircleButton';
import theme from '@common/theme';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Gradient from './Gradient';
import SessionsGrid from './SessionsGrid';

const Header = ({ title }) => <Text style={styles.headerTitle}>{title}</Text>;

const MAX_MEDITATIONS = 40;

const GroupedMeditations = () => {
  const route = useRoute();
  const { title, meditations } = route.params || { title: '', meditations: [] };
  const { goBack } = useNavigation();

  return (
    <SafeAreaView edges={['top', 'right', 'left']} style={styles.safeAreaView}>
      <ParallaxScrollView
        image={meditations[0]?.thumbnail}
        backgroundColor="#fdedd6"
        contentBackgroundColor="#fdedd6"
        parallaxHeaderHeight={250}
        renderForeground={() => (
          <View style={styles.foreground}>
            <Gradient seed={title} />
            <Header title={title} />
          </View>
        )}
        renderStickyHeader={() => (
          <View style={styles.stickyHeader}>
            <CircleButton
              backgroundColor="#00000080" // Slightly more opaque for better visibility
              color="#fff"
              onPress={goBack}
              size={50} // Larger touch area
              icon="chevron-right"
            />
          </View>
        )}>
        <View style={styles.sessionsContainer}>
          <SessionsGrid meditations={meditations.slice(0, MAX_MEDITATIONS)} />
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
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'black',
    fontFamily: theme.fonts.regular,
    lineHeight: 32, // Increased line spacing
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

export default GroupedMeditations;
