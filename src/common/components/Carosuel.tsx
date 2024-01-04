import { colors } from '@common/theme';
import { useNavigation } from '@react-navigation/native';
import { FC, default as React, useCallback } from 'react';
import type {
  ImageSourcePropType,
  ImageURISource,
  StyleProp,
  ViewProps,
  ViewStyle,
} from 'react-native';
import {
  ActivityIndicator,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { LongPressGestureHandler } from 'react-native-gesture-handler';
import type { AnimateProps } from 'react-native-reanimated';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import Carousel from 'react-native-reanimated-carousel';

import CoursesCarouselItem from './CoursesCarouselItem';

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
  showIndex?: boolean;
  img?: ImageSourcePropType;
}

export const SBImageItem: React.FC<Props> = ({
  style,
  index: _index,
  showIndex = true,
  img,
}) => {
  const index = _index ?? 0;
  const source = React.useRef<ImageURISource>({
    uri: `https://picsum.photos/id/${index}/400/300`,
  }).current;

  return (
    <View style={[styles.container, style]}>
      <ActivityIndicator size="small" />
      <Image
        // cachePolicy={'memory-disk'}
        key={index}
        style={styles.image}
        source={img ?? source}
      />
      {showIndex && (
        <Text
          style={{
            position: 'absolute',
            color: '#6E6E6E',
            fontSize: 40,
            backgroundColor: '#EAEAEA',
            borderRadius: 5,
            overflow: 'hidden',
            paddingHorizontal: 10,
            paddingTop: 2,
          }}>
          {index}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});

interface Props {
  style?: StyleProp<ViewStyle>;
  index?: number;
}

export const SBTextItem: React.FC<Props> = ({ style, index }) => {
  return (
    <View style={[styles2.container, style]}>
      {typeof index === 'number' && (
        <Text style={{ fontSize: 30, color: 'black' }}>{index}</Text>
      )}
    </View>
  );
};

const styles2 = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'red',
  },
});

interface Props extends AnimateProps<ViewProps> {
  style?: StyleProp<ViewStyle>;
  index?: number;
  pretty?: boolean;
  showIndex?: boolean;
  img?: ImageSourcePropType;
}

export const SBItem: React.FC<Props> = props => {
  const {
    style,
    showIndex = true,
    index,
    pretty,
    img,
    testID,
    ...animatedViewProps
  } = props;
  const enablePretty = false;
  const [isPretty, setIsPretty] = React.useState(pretty || enablePretty);
  return (
    <LongPressGestureHandler
      onActivated={() => {
        setIsPretty(!isPretty);
      }}>
      <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
        {isPretty || img ? (
          <SBImageItem
            style={style}
            index={index}
            showIndex={typeof index === 'number' && showIndex}
            img={img}
          />
        ) : (
          <SBTextItem style={style} index={index} />
        )}
      </Animated.View>
    </LongPressGestureHandler>
  );
};

const PAGE_WIDTH = Dimensions.get('window').width;

interface CoursesCarouselProps {
  fullScreen: boolean;
  selectedCourse?: {
    id: string;
  } | null;
  height?: number;
  setSelectedCourse?: (course: any) => void;
  data: any[];
  withParallax?: boolean;
}

const Carousel2: FC<CoursesCarouselProps> = ({
  data,
  fullScreen,
  setSelectedCourse,
  withParallax = false,
}) => {
  const progressValue = useSharedValue<number>(0);

  const { navigate } = useNavigation();

  const onItemPress = useCallback(
    (item: any) => {
      navigate('Courses', { item });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: any; index: number }) => {
      return (
        <CoursesCarouselItem {...{ item, index, fullScreen, onItemPress }} />
      );
    },
    [fullScreen, onItemPress],
  );

  return (
    <View
      style={{
        alignItems: 'center',
      }}>
      {!!progressValue && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: 15 * data.length,
            alignSelf: 'center',
          }}>
          {data.map((item: any, index: number) => {
            return (
              <PaginationItem
                animValue={progressValue}
                index={index}
                key={item.id}
                isRotate={false}
                length={data.length}
              />
            );
          })}
        </View>
      )}
      <Carousel
        width={PAGE_WIDTH}
        height={fullScreen ? 600 : 288}
        loop
        pagingEnabled={true}
        onProgressChange={(_, absoluteProgress) =>
          (progressValue.value = absoluteProgress)
        }
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: withParallax ? 50 : 0,
        }}
        data={data}
        renderItem={renderItem}
      />
    </View>
  );
};

const PaginationItem: React.FC<{
  index: number;
  length: number;
  animValue: Animated.SharedValue<number>;
  isRotate?: boolean;
}> = props => {
  const { animValue, index, length } = props;
  const width = 10;

  const animStyle = useAnimatedStyle(() => {
    let inputRange = [index - 1, index, index + 1];
    let outputRange = [-width, 0, width];

    if (index === 0 && animValue?.value > length - 1) {
      inputRange = [length - 1, length, length + 1];
      outputRange = [-width, 0, width];
    }

    return {
      transform: [
        {
          translateX: interpolate(
            animValue?.value,
            inputRange,
            outputRange,
            Extrapolation.CLAMP,
          ),
        },
      ],
    };
  }, [animValue, index, length]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        width,
        height: width,
        borderRadius: 50,
        overflow: 'hidden',
      }}>
      <Animated.View
        style={[
          {
            borderRadius: 50,
            backgroundColor: colors.selected,
            flex: 1,
          },
          animStyle,
        ]}
      />
    </View>
  );
};

export default Carousel2;
