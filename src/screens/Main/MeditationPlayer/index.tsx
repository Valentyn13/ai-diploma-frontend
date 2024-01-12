import { getCategoryImgName } from '@common/assets/images';
import FavoriteButton from '@common/components/FavoriteButton';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation, useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useInstructor from '@services/hooks/useInstructor';
import useUpdateMeditation from '@services/hooks/useUpdateMeditation';
import { meditationStarted, minutesPracticed } from '@store/actions';
import { meditationInstructor } from '@store/selectors';
import { useBgTrackStore } from '@store/useBgTrackStore';
import logger from '@utils/logger';
import { getVideoName } from '@utils/video';
import PropTypes from 'prop-types';
import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StatusBar,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import TrackPlayer, {
  State,
  useIsPlaying,
  usePlayWhenReady,
  useProgress,
} from 'react-native-track-player';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import RNFetchBlob from 'rn-fetch-blob';
import styled from 'styled-components';

import AudioPlayer from './AudioPlayer';
import PlayerControls from './PlayerButtons';
import TimesLabel from './TimesLabel';

const ASSETS_URL = 'https://d137rfe7jg135q.cloudfront.net/';
const OLD_ASSETS_URL = 'https://regameditation.s3.us-east-2.amazonaws.com/';

const BGS_ASSETS_URL = 'https://d137rfe7jg135q.cloudfront.net/bgs/';

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

const MeditationPlayer: FC = () => {
  const [cachedVideoUri, setCachedVideoUri] = useState(null);
  const route = useRoute();
  const { updateIstructorTractionData } = useInstructor();
  const { goBack, navigate } = useNavigation();
  const { updateMeditationCount } = useUpdateMeditation();
  const { position, duration } = useProgress();
  const [startTime, setStartTime] = useState(0);
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

  const { name, title, categoryName, url, id, animation, thumbnail } =
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
    const minutesPlayed = (position - startTime) / 60;

    dispatch(minutesPracticed({ minutesPlayed }));
  }, [dispatch, position, startTime]);

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
    setIsLoading(false);
  };

  const onProgress = useCallback(
    ({ currentTime: value }) => {
      if (!sliderEditing) {
        TrackPlayer.seekTo(value);
      }
    },
    [sliderEditing],
  );

  const onError = error => {
    captureException(error);
    Alert.alert('בעיה בהשמעת המדיטציה, נסה שנית');
  };

  onLoad.propTypes = {
    duration: PropTypes.number.isRequired,
  };

  onProgress.propTypes = {
    currentTime: PropTypes.number.isRequired,
  };

  const poster = useMemo(
    () => `${BGS_ASSETS_URL}${getCategoryImgName(categoryName, 0, thumbnail)}`,
    [categoryName, thumbnail],
  );

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

    downloadAndCacheVideo();
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

  const isPlayWhenReady = usePlayWhenReady();
  const { state } = useIsPlaying();

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
          poster={poster}
          posterResizeMode="cover"
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

      <AudioPlayer
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
            {isPlayWhenReady &&
            (state === State.Loading || state === State.Buffering) ? (
              <>
                <TimesLabel position={position} duration={duration} />
                <PlayerControls />
              </>
            ) : (
              <ActivityIndicator size="large" />
            )}
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
