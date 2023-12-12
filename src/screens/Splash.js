import { Container, Icon, TopTitle } from '@common/components/Styled';
import { useNavigation } from '@react-navigation/native';
import useAppData from '@services/hooks/useAppData';
import React, { useEffect } from 'react';
import Sound from 'react-native-sound';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';

const AppNameTitle = styled(TopTitle)`
  margin-top: 19px;
`;

const Splash = ({ navigation }) => {
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
        navigation.navigate('IntroScreens');
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [accessToken, getAppData, navigate, navigation]);

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
