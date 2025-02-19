import { useNavigation } from '@react-navigation/native';
import React, { FC } from 'react';
import { Button, StatusBar, Text, View } from 'react-native';

const Subscribe: FC = ({ navigation }) => {
  const { goBack } = useNavigation();

  return (
    <>
      <StatusBar hidden />

      <View>
        <Text>SUBSCRIBE PAGE</Text>
        <Button
          title="Go back"
          onPress={() => {
            goBack();
          }}
        />
      </View>
    </>
  );
};

export default Subscribe;
