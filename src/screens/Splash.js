import { Container, Icon, TopTitle } from '@common/components/Styled';
import useAppData from '@services/hooks/useAppData';
import React, { useEffect } from 'react';
import Sound from 'react-native-sound';
import { useNavigation } from 'react-navigation-hooks';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const AppNameTitle = styled(TopTitle)`
  margin-top: 19px;
`;

const Splash = () => {
  const { navigate } = useNavigation();
  const { getAppData } = useAppData();
  const dispatch = useDispatch();

  const appDataloaded = useSelector(state => state.appData.loaded);
  const accessToken = useSelector(state => state.userDetails.accessToken);

  Sound.setCategory('Playback');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (accessToken) {
        getAppData();
      } else {
        navigate('IntroSleep');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [accessToken, getAppData, navigate]);

  useEffect(() => {
    if (appDataloaded) {
      navigate('Main');
    }
  }, [appDataloaded, dispatch, navigate]);

  return (
    <Container>
      <Icon name="logo" size={100} />
      <AppNameTitle k="appName" />
    </Container>
  );
};

export default Splash;
