import FavoriteButton from '@common/components/FavoriteButton';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useInstructor from '@services/hooks/useInstructor';
import useUpdateMeditation from '@services/hooks/useUpdateMeditation';
import logger from '@utils/logger';
import { getVideoName } from '@utils/video';
import PropTypes from 'prop-types';
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Alert, Pressable, StatusBar, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import { meditationStarted, minutesPracticed } from 'store/actions';
import { meditationInstructor } from 'store/selectors';
import styled from 'styled-components';

import { useBgTrackStore } from '../../../store/useBgTrackStore';
import CircularPlayer from './CircularPlayer';
import TimesLabel from './TimesLabel';

const ASSETS_URL = 'https://d137rfe7jg135q.cloudfront.net/';
const OLD_ASSETS_URL = 'https://regameditation.s3.us-east-2.amazonaws.com/';

const VIDEO_URL = `${ASSETS_URL}videos/`;
const SOUNDS_URL = `${ASSETS_URL}sounds/`;

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

const AudioPlayer = styled(Video).attrs(() => ({}))`
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
`;

const MeditationPlayer: FC = () => {
  const [cachedVideoUri, setCachedVideoUri] = useState(null);
  const route = useRoute();
  const audioPlayerRef = useRef(null);
  const { updateIstructorTractionData } = useInstructor();
  const { goBack, navigate } = useNavigation();
  const { updateMeditationCount } = useUpdateMeditation();
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderEditing, setSliderEditing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { selectedTrack } = useBgTrackStore(state => state);

  const toggleBgMenu = () => {
    navigate('Main', {
      screen: 'BGMusicPicker',
    });
  };

  const amplitudeInstance = useAmplitude();
  const dispatch = useDispatch();

  const { name, title, categoryName, url, id, animation } =
    route.params?.item || {};

  const instructor = useSelector(state => meditationInstructor(state, id));

  useEffect(() => {
    updateMeditationCount(id);
    // TODO: fix dependencies, currently updateMeditationCount is NOT in dependencies array since it causes 'Maximum update depth exceeded' error
  }, [id]);

  const video = useMemo(
    () => getVideoName(categoryName, animation),
    [animation, categoryName],
  );

  const hasAnimation = animation !== null && animation !== undefined;

  const updateTimePlayed = useCallback(() => {
    const minutesPlayed = (currentTime - startTime) / 60;

    dispatch(minutesPracticed({ minutesPlayed }));
  }, [currentTime, dispatch, startTime]);

  useEffect(() => {
    dispatch(meditationStarted({ id }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const togglePlay = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const onClose = () => {
    amplitudeInstance.logEvent('MEDITATION_STOP', { categoryName });
    amplitudeInstance.uploadEvents();

    goBack();
  };

  const onLoad = ({ duration: value }) => {
    setDuration(value);
    setIsLoading(false);
  };

  const onProgress = useCallback(
    ({ currentTime: value }) => {
      if (!sliderEditing) {
        setCurrentTime(value);
      }
    },
    [sliderEditing],
  );

  const onError = error => {
    captureException(error);
    Alert.alert('בעיה בהשמעת המדיטציה, נסה שנית');
  };

  const onSliderEditStart = useCallback(() => {
    updateTimePlayed();
    setSliderEditing(true);
  }, [updateTimePlayed]);

  const onSliderEditEnd = useCallback(endTime => {
    setSliderEditing(false);
    setStartTime(endTime);
  }, []);

  const onSliderEditing = useCallback(value => {
    setCurrentTime(value);
    if (audioPlayerRef.current) {
      audioPlayerRef.current.seek(value);
    }
  }, []);

  const onEnd = () => {
    togglePlay();
  };

  onLoad.propTypes = {
    duration: PropTypes.number.isRequired,
  };

  onProgress.propTypes = {
    currentTime: PropTypes.number.isRequired,
  };

  // const poster = useMemo(() => categoryImage(categoryName), [categoryName]);
  const poster = useMemo(() => 'https://picsum.photos/200', []);

  const audio = url;

  useEffect(() => {
    const downloadAndCacheFile = async (url, fileName) => {
      const { dirs } = RNFetchBlob.fs;
      const filePath = `${dirs.CacheDir}/${fileName}`;

      try {
        await RNFetchBlob.fs.stat(filePath);
        // File already exists, no need to download again
        return `file://${filePath}`;
      } catch (error) {
        // File does not exist, download it
        try {
          await RNFetchBlob.config({ fileCache: true, path: filePath }).fetch(
            'GET',
            url,
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
        setIsLoading(false);
        setCachedVideoUri(videoUri);
      }
    };

    const downloadAndCacheAudio = async () => {
      const audioUri = await downloadAndCacheFile(
        `${SOUNDS_URL}${audio}`,
        audio,
      );
      if (audioUri) {
        // Update the source of the AudioPlayer
        audioPlayerRef.current.setNativeProps({ source: { uri: audioUri } });
      }
    };

    downloadAndCacheVideo();
    // downloadAndCacheAudio();
  }, [video, audio]);

  const [hideControls, setHideControls] = useState(false);

  useEffect(() => {
    if (!hideControls) {
      const timer = setTimeout(() => {
        setHideControls(true);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [hideControls]);

  const onVideoPress = () => {
    if (hideControls) {
      setHideControls(false);
    }
  };

  return (
    <Pressable
      className="flex flex-col items-center justify-center w-full h-full bg-black"
      onPress={onVideoPress}>
      <View className="absolute top-0 left-0 w-full h-full bg-black/20" />
      <StatusBar animated hidden={true} />
      {cachedVideoUri && (
        <VideoPlayer
          style={{ zIndex: -1, backgroundColor: 'black' }}
          source={{
            uri: cachedVideoUri,
          }}
          paused={!isPlaying}
          onError={error => logger.log('error', error)}
          progressUpdateInterval={1000}
          bufferConfig={{
            minBufferMs: 15000,
            maxBufferMs: 50000,
            bufferForPlaybackMs: 2500,
            bufferForPlaybackAfterRebufferMs: 4000,
          }}
        />
      )}

      {/* <AudioPlayer id={id} url={url} title={name} artist={instructor?.name} /> */}
      <AudioPlayer
        audioOnly
        disableFocus
        playWhenInactive
        ignoreSilentSwitch="ignore"
        ref={audioPlayerRef}
        source={{ uri: url.replace(OLD_ASSETS_URL, ASSETS_URL) }}
        paused={!isPlaying}
        onLoad={onLoad}
        onProgress={onProgress}
        onEnd={onEnd}
        onError={onError}
        progressUpdateInterval={1000}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 4000,
        }}
      />
      <SafeAreaView className="flex-col h-full w-full">
        <View className="relative flex flex-col items-center justify-center w-full h-full">
          <View className="absolute top-0 flex flex-row items-center w-full justify-between px-5 z-10">
            <CircleButton
              size={40}
              icon="x"
              onPress={onClose}
              backgroundColor="#00000060"
              color="white"
            />
            {hasAnimation === false && (
              <CircleButton
                size={40}
                icon="music"
                onPress={toggleBgMenu}
                backgroundColor={
                  selectedTrack === 'off' ? '#00000060' : 'white'
                }
                color={selectedTrack === 'off' ? 'white' : 'black'}
              />
            )}
          </View>
          <View
            style={{
              display: hideControls ? 'none' : 'flex',
            }}
            className="absolute flex flex-col items-center justify-center h-full w-full">
            <CircularPlayer
              togglePlay={togglePlay}
              isPlaying={isPlaying}
              currentTime={currentTime}
              onSliderEditStart={onSliderEditStart}
              onSliderEditEnd={onSliderEditEnd}
              onSliderEditing={onSliderEditing}
              duration={duration}
              setCurrentTime={setCurrentTime}
              isLoading={isLoading}
            />
            <TimesLabel {...{ currentTime, duration }} color="#fff" />
          </View>
          <View className="absolute bottom-20 w-full flex-col items-center">
            <Text className="text-2xl font-bold text-white">
              {name || title}
            </Text>
            <Text className="text-base font-light text-white mb-2">
              {instructor?.name}
            </Text>

            <CircleButton
              backgroundColor="#00000060"
              color="white"
              size={40}
              icon="info"
              onPress={() => {
                updateIstructorTractionData(instructor);
                navigate('Instructor', { id: instructor._id });
              }}
            />
          </View>
          <View className="absolute bottom-5 left-5">
            <FavoriteButton id={id} />
          </View>
        </View>
      </SafeAreaView>
    </Pressable>
  );
};

export default MeditationPlayer;
