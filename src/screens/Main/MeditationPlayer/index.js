import categoryVideo from '@common/assets/videos';
import FavoriteIndicator from '@common/components/FavoriteIndicator';
import {
  BoldTitle,
  MeditationContainer,
  SubTitle,
  TopTitle,
  TouchableIcon,
} from '@common/components/Styled';
import { BG_TRACKS } from '@common/constants';
import { useNavigation, useRoute } from '@react-navigation/native';
import { captureException } from '@sentry/react-native';
import { useAmplitude } from '@services/hooks/useAmplitude';
import useInstructor from '@services/hooks/useInstructor';
import useUpdateMeditation from '@services/hooks/useUpdateMeditation';
import logger from '@utils/logger';
import PropTypes from 'prop-types';
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { Alert, StatusBar, TouchableOpacity, View } from 'react-native';
import Video from 'react-native-video';
import { useDispatch, useSelector } from 'react-redux';
import { meditationStarted, minutesPracticed } from 'store/actions';
import { meditationInstructor } from 'store/selectors';
import styled, { withTheme } from 'styled-components';

import MeditationInfo from '../MeditationInfo';
import BgMusicSelector from './BgMusicSelector';
import CircularPlayer from './CircularPlayer';
import TimesLabel from './TimesLabel';

const Dummy = styled.View`
  background-color: transparent;
  width: 30;
  height: 30;
  margin: ${({ theme: { dimens } }) => dimens.margin}px;
`;

const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 50px;
  padding-left: 25px;
  padding-right: 25px;
`;

// need to verify title is centered (width is the same as BgMusicSelector's width)
const CloseButtonWrapper = styled.View`
  width: 72px;
  flex-direction: row;
  justify-content: flex-end;
`;

const FavoriteIndicatorWrapper = styled.View`
  position: absolute;
  bottom: 50px;
  left: 25px;
`;

const HeaderTitle = styled(TopTitle)`
  flex: 1;
  text-align: center;
`;

const ButtonsContainer = styled(MeditationContainer)`
  justify-content: space-between;
`;

const ButtonsInnerContainer = styled(MeditationContainer)`
  justify-content: flex-start;
`;

const StartHereTitle = styled(BoldTitle)`
  margin-top: 10px;
`;

const InstructorName = styled(SubTitle)`
  margin-bottom: 10px;
`;

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

const BgMusicPlayer = ({ source, paused }) => (
  <Video
    source={{ uri: source }}
    onError={error => {
      logger.log('error', JSON.stringify(error));
    }}
    disableFocus
    audioOnly
    playInBackground
    repeat
    playWhenInactive
    paused={paused}
  />
);

const MeditationPlayer = ({
  theme: {
    colors: { whiteColor, itemBgColor },
  },
}) => {
  const [destroyed, setDestroyed] = useState(false);
  const route = useRoute();
  const audioPlayerRef = useRef(null);
  const { updateIstructorTractionData } = useInstructor();
  const { goBack } = useNavigation();
  const { updateMeditationCount } = useUpdateMeditation();
  const [currentTime, setCurrentTime] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [sliderEditing, setSliderEditing] = useState(false);
  const { autoPlay } = route.params || {};
  const [isPlaying, setIsPlaying] = useState(autoPlay || true);
  const [isFirstPlay, setIsFirstPlay] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isPlayingBgMusic, setIsPlayingBgMusic] = useState(true);

  const bgTrack = useRef(0);
  const [bgMenuOpen, toggleBgMenu] = useReducer(s => !s, false);

  const amplitudeInstance = useAmplitude();
  const dispatch = useDispatch();

  const { name, title, categoryName, url, id, animation } =
    route.params?.item || {};

  const instructor = useSelector(state => meditationInstructor(state, id));

  useEffect(() => {
    updateMeditationCount(id);
    // TODO: fix dependencies, currently updateMeditationCount is NOT in dependencies array since it causes 'Maximum update depth exceeded' error
  }, [id]);

  const video = categoryVideo(categoryName, animation);

  const hasAnimation = animation !== null && animation !== undefined;

  const updateTimePlayed = useCallback(() => {
    const minutesPlayed = (currentTime - startTime) / 60;

    dispatch(minutesPracticed({ minutesPlayed }));
  }, [currentTime, dispatch, startTime]);

  const togglePlay = useCallback(() => {
    if (duration > 0) {
      if (!isPlaying) {
        if (isFirstPlay) {
          dispatch(meditationStarted({ id }));
          setIsFirstPlay(false);
        }
        setStartTime(currentTime);
      } else {
        updateTimePlayed();
      }
      setIsPlaying(!isPlaying);
    }
  }, [
    currentTime,
    dispatch,
    duration,
    id,
    isFirstPlay,
    isPlaying,
    updateTimePlayed,
  ]);

  const onClose = () => {
    // amplitudeInstance.logEvent('MEDITATION_STOP', { categoryName });
    // amplitudeInstance.uploadEvents();

    togglePlay();
    setIsPlayingBgMusic(false);
    setTimeout(() => goBack(), 0);
  };

  const onLoad = ({ duration: value }) => {
    if (destroyed) {
      setIsPlaying(false);
      return;
    }

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

  const handleBgTrack = trackId => {
    toggleBgMenu();
    if (trackId === -1) {
      setIsPlayingBgMusic(false);
      return;
    }

    if (trackId !== bgTrack.current) {
      bgTrack.current = trackId;
    }
    setIsPlayingBgMusic(true);
  };

  onLoad.propTypes = {
    duration: PropTypes.number.isRequired,
  };

  onProgress.propTypes = {
    currentTime: PropTypes.number.isRequired,
  };

  useEffect(() => {
    return () => {
      setDestroyed(true);
      setIsPlayingBgMusic(false);
      setIsPlaying(false);
      audioPlayerRef.current = null;
    };
  }, []);

  // const poster = useMemo(() => categoryImage(categoryName), [categoryName]);
  const poster = useMemo(() => 'https://picsum.photos/200', []);

  return (
    <MeditationContainer>
      <StatusBar animated hidden={true} />
      <VideoPlayer
        source={{
          uri: `https://regameditation.s3.us-east-2.amazonaws.com/videos/${video}`,
        }}
        paused={!isPlaying}
        poster={poster}
        posterResizeMode="cover"
        onError={error => logger.log('error', error)}
        progressUpdateInterval={1000}
        bufferConfig={{
          minBufferMs: 15000,
          maxBufferMs: 50000,
          bufferForPlaybackMs: 2500,
          bufferForPlaybackAfterRebufferMs: 4000,
        }}
      />

      <View
        style={{
          borderWidth: 0,
          height: 0,
          width: 100,
          backgroundColor: 'red',
        }}>
        {hasAnimation === false && (
          <BgMusicPlayer
            source={`https://regameditation.s3.us-east-2.amazonaws.com/sounds/${
              BG_TRACKS[bgTrack.current].asset
            }`}
            paused={!isPlayingBgMusic}
          />
        )}
      </View>
      <AudioPlayer
        audioOnly
        disableFocus
        playInBackground
        playWhenInactive
        ignoreSilentSwitch="ignore"
        ref={audioPlayerRef}
        allowsExternalPlayback
        canStepForward
        source={{ uri: url }}
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
      <Header>
        {hasAnimation === false ? (
          <BgMusicSelector
            {...{
              toggleBgMenu,
              whiteColor,
              bgMenuOpen,
              handleBgTrack,
              isPlayingBgMusic,
            }}
            currentBgTrack={bgTrack.current}
            bgTracks={BG_TRACKS}
          />
        ) : (
          <Dummy />
        )}
        <HeaderTitle
          t={name || title}
          color={itemBgColor}
          style={{ flex: 1 }}
        />
        <CloseButtonWrapper>
          <TouchableIcon name="close" onPress={onClose} color={whiteColor} />
        </CloseButtonWrapper>
      </Header>
      <MeditationContainer style={{ zIndex: -1 }} flex={1} />
      <ButtonsContainer flex={1.1}>
        <ButtonsInnerContainer>
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
          <TimesLabel {...{ currentTime, duration }} color={whiteColor} />
          <StartHereTitle color={whiteColor} t={name || title} />
          <TouchableOpacity
            onPress={() => {
              // navigate('MeditationInfo', {item, instructor});
            }}
            style={{ alignSelf: 'center' }}>
            <InstructorName
              t={instructor?.name}
              color={whiteColor}
              style={{ textAlign: 'center' }}
            />
            <TouchableIcon
              name="info"
              onPress={() => {
                updateIstructorTractionData(instructor);
                setShowModal(true);
              }}
              color={whiteColor}
            />
          </TouchableOpacity>
        </ButtonsInnerContainer>
        <MeditationInfo
          isVisible={showModal}
          instructor={instructor}
          setShowModal={setShowModal}
        />
        <FavoriteIndicatorWrapper>
          <FavoriteIndicator id={id} />
        </FavoriteIndicatorWrapper>
      </ButtonsContainer>
    </MeditationContainer>
  );
};

MeditationPlayer.propTypes = {
  theme: PropTypes.shape({
    colors: PropTypes.shape({
      whiteColor: PropTypes.string.isRequired,
      itemBgColor: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

BgMusicPlayer.propTypes = {
  paused: PropTypes.bool.isRequired,
  source: PropTypes.number.isRequired,
};

export default withTheme(MeditationPlayer);
