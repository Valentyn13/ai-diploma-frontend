import { getCategoryImgName } from '@common/assets/images';
import FavoriteButton from '@common/components/FavoriteButton';
import { CircleButton } from '@common/components/buttons/CircleButton';
import {
  ASSETS_URL,
  BGS_ASSETS_URL,
  KEY_PLAYED_FIRST,
  OLD_ASSETS_URL,
  VIDEO_URL,
} from '@common/constants';
import { usePurchases } from '@common/context/PurchaseContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute } from '@react-navigation/native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useTrigger from '@services/hooks/useTrigger';
import useUpdateMeditation from '@services/hooks/useUpdateMeditation';
import { meditationStarted, minutesPracticed } from '@store/actions';
import { meditationInstructor } from '@store/selectors';
import { useBgTrackStore } from '@store/useBgTrackStore';
import { useMichaelStore } from '@store/useMichaelStore';
import logger from '@utils/logger';
import { getVideoName } from '@utils/video';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StatusBar,
  Text,
} from 'react-native';
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  State,
  useIsPlaying,
  usePlaybackState,
  useProgress,
} from 'react-native-track-player';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import styled from 'styled-components';

import AudioPlayer from './AudioPlayer';
import PlayerControls from './PlayerButtons';
import TimesLabel from './TimesLabel';

const VideoPlayer = styled(Video).attrs(() => ({
  resizeMode: 'cover',
  repeat: true,
}))`
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
`;

const MeditationPlayer: FC = ({ navigation }) => {
  const { goBack, navigate } = navigation;

  const route = useRoute();

  const { updateMeditationCount } = useUpdateMeditation();
  const { position, duration } = useProgress();
  const { state } = usePlaybackState();
  const { playing } = useIsPlaying();
  const { hasPremium } = usePurchases();

  const { setIsOpen } = useMichaelStore(state => state);
  const { selectedTrack } = useBgTrackStore(state => state);

  const [loading, setLoading] = useState(true);
  const [cachedVideoUri, setCachedVideoUri] = useState<string>();
  const [hideControls, setHideControls] = useState(false);

  const hideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const controlsOpacity = useSharedValue(1);

  // const value = useFlag<number>('push_to_michael', 1);

  const triggerMichael = useTrigger(
    // () => setIsOpen(false),
    () => {},
    'push_to_michael',
    1,
  );

  useEffect(() => {
    if (state === State.Ready) {
      setLoading(false);
    } else if (state === State.Error) {
      setLoading(false);
      Alert.alert('שגיאה', 'אירעה שגיאה בזמן הטעינה, נסה שנית מאוחר יותר', [
        {
          text: 'אוקיי',
          onPress: () => {
            goBack();
          },
        },
      ]);
    }
  }, [state]);

  const toggleBgMenu = () => {
    // @ts-ignore
    navigate('Main', {
      screen: 'BGMusicPicker',
    });
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: controlsOpacity.value,
    };
  });

  const fadeOutControls = useCallback(() => {
    controlsOpacity.value = withTiming(0, { duration: 500 }, () => {
      'worklet';
      runOnJS(setHideControls)(true);
    });
  }, [controlsOpacity]);

  const amplitudeInstance = useAmplitude();
  const dispatch = useDispatch();

  const { name, title, categoryName, url, id, animation, thumbnail } =
    route.params?.item || {};

  const instructor = useSelector(state => meditationInstructor(state, id));

  useEffect(() => {
    updateMeditationCount(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const video = useMemo(
    () => getVideoName(categoryName, animation),
    [animation, categoryName],
  );

  useEffect(() => {
    dispatch(meditationStarted({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const onClose = async () => {
    amplitudeInstance.logEvent('MEDITATION_STOP', { categoryName });
    amplitudeInstance.uploadEvents();
    // @ts-ignore
    if (route.params?.isFirstTime && !hasPremium) {
      // @ts-ignore
      navigation.replace('Subscribe', {
        isFirstTime: true,
      });
      // @ts-ignore
    } else if (route.params?.isFirstTime && hasPremium) {
      await AsyncStorage.setItem(KEY_PLAYED_FIRST, true.toString());
      navigation.replace('Main', {
        screen: 'Home',
      });
    } else {
      goBack();
      triggerMichael();
    }
  };

  const listenTime = useRef(0);
  const listenInterval = useRef<NodeJS.Timeout | undefined>();

  const updatePlayedTime = useCallback(() => {
    if (!listenTime.current) {
      return;
    }

    dispatch(minutesPracticed({ minutesPlayed: listenTime.current / 60 }));
  }, [dispatch]);

  useEffect(() => {
    if (playing) {
      listenInterval.current = setInterval(() => {
        listenTime.current += 1;
      }, 1000);
    }

    return () => {
      if (listenInterval.current) {
        clearInterval(listenInterval.current);
        listenInterval.current = undefined;
      }
    };
  }, [playing]);

  useEffect(() => {
    return () => {
      updatePlayedTime();
    };
  }, [updatePlayedTime]);

  const poster = useMemo(
    () => `${BGS_ASSETS_URL}${getCategoryImgName(categoryName, 0, thumbnail)}`,
    [categoryName, thumbnail],
  );

  const audio = url;

  useEffect(() => {
    const downloadAndCacheFile = async (
      fileBaseUrl: string,
      fileName: string,
    ) => {
      const { dirs } = RNFetchBlob.fs;
      const filePath = `${dirs.CacheDir}/${fileName}`;

      try {
        await RNFetchBlob.fs.stat(filePath);
        return `file://${filePath}`;
      } catch (error) {
        try {
          await RNFetchBlob.config({ fileCache: true, path: filePath }).fetch(
            'GET',
            fileBaseUrl,
          );
          return `file://${filePath}`;
        } catch (downloadError) {
          console.error(`Error downloading ${fileName}:`, downloadError);
          return null;
        }
      }
    };

    const downloadAndCacheVideo = async () => {
      const videoUri = await downloadAndCacheFile(
        `${VIDEO_URL}${video}`,
        video,
      );
      if (videoUri) {
        setCachedVideoUri(videoUri);
      }
    };

    downloadAndCacheVideo();
  }, [video, audio]);

  const resetHideControlsTimer = useCallback(() => {
    controlsOpacity.value = withTiming(1); // Show controls
    setHideControls(false);

    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
    }

    hideTimerRef.current = setTimeout(() => {
      if (playing) {
        fadeOutControls();
      }
    }, 3000);
  }, [controlsOpacity, fadeOutControls, playing]);

  useEffect(() => {
    resetHideControlsTimer();

    return () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
      }
    };
  }, [playing, resetHideControlsTimer]);

  const renderOverlay = () => {
    if (hideControls) {
      return null;
    }

    return (
      <Animated.View
        style={[animatedStyle]}
        className="absolute top-0 left-0 w-full h-full bg-black/50"
      />
    );
  };

  const renderControls = () => (
    <Animated.View
      style={[animatedStyle]}
      className="absolute flex flex-col items-center justify-center h-full w-full">
      {loading ? (
        <ActivityIndicator color="#fff" size="large" />
      ) : (
        <>
          <TimesLabel position={position} duration={duration} />
          <PlayerControls />
        </>
      )}
    </Animated.View>
  );

  const renderHeader = () => (
    <Animated.View
      style={[animatedStyle]}
      className="absolute top-0 flex flex-row items-center w-full justify-between p-4 z-10">
      <CircleButton
        size={40}
        icon="x"
        onPress={onClose}
        backgroundColor="#00000060"
        color="white"
      />
      <CircleButton
        size={40}
        icon="music"
        onPress={toggleBgMenu}
        backgroundColor={selectedTrack === 'off' ? '#00000060' : 'white'}
        color={selectedTrack === 'off' ? 'white' : 'black'}
      />
    </Animated.View>
  );

  const onPressInfo = useCallback(() => {
    amplitudeInstance.logEvent('MEDITATION_MODAL_CLICKED', {
      id,
      categoryName,
    });
    amplitudeInstance.uploadEvents();
    // @ts-ignore
    navigate('SessionModal', { id });
  }, [amplitudeInstance, categoryName, id, navigate]);

  const renderFooter = () => (
    <Animated.View
      style={[animatedStyle]}
      className="absolute bottom-20 w-full flex-col items-center">
      <Text className="text-2xl font-bold text-white">{name || title}</Text>
      <Text className="text-base font-light text-white mb-2">
        {instructor?.name}
      </Text>

      <CircleButton
        backgroundColor="#00000060"
        color="white"
        size={40}
        icon="info"
        onPress={onPressInfo}
      />
    </Animated.View>
  );

  const renderFavorite = () => (
    <Animated.View style={[animatedStyle]} className="absolute bottom-5 left-5">
      <FavoriteButton id={id} />
    </Animated.View>
  );

  const renderView = () => {
    if (hideControls) {
      return null;
    }

    return (
      <Animated.View
        style={[animatedStyle]}
        className="relative flex flex-col items-center justify-center w-full h-full">
        {renderHeader()}
        {renderControls()}
        {renderFooter()}
        {renderFavorite()}
      </Animated.View>
    );
  };

  return (
    <>
      <StatusBar animated hidden={true} />
      <Pressable
        className="flex flex-col items-center justify-center w-full h-full bg-black"
        onPress={resetHideControlsTimer}>
        {renderOverlay()}

        <VideoPlayer
          poster={poster}
          posterResizeMode="cover"
          style={{ zIndex: -1, backgroundColor: 'black' }}
          source={{
            uri: cachedVideoUri || `${VIDEO_URL}${video}`,
          }}
          paused={!playing}
          onError={error => logger.log('error', error)}
          progressUpdateInterval={1000}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 4000,
          }}
        />

        <AudioPlayer
          onFinish={onClose}
          id={id}
          url={url.replace(OLD_ASSETS_URL, ASSETS_URL)}
          title={name}
          artist={instructor?.name}
          artwork={`${BGS_ASSETS_URL}${getCategoryImgName(
            categoryName,
            0,
            thumbnail,
          )}`}
        />
        <SafeAreaView className="h-full w-full">{renderView()}</SafeAreaView>
      </Pressable>
    </>
  );
};

export default MeditationPlayer;
