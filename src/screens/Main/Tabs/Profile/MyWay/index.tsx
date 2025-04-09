import Divider from '@common/components/Divider';
import { CircleButton } from '@common/components/buttons/CircleButton';
import { useNavigation } from '@react-navigation/native';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import Badges from './Badges';
import Card from './Card';
import Quote from './Quote';
import UserMetrics from './UserMetrics';

const MyWay = () => {
  const { navigate } = useNavigation();

  return (
    <View className="flex-1 bg-[#FFF8EE]">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="absolute left-5 top-5">
          <CircleButton
            backgroundColor="#00000060"
            color="white"
            size={40}
            icon="gear"
            onPress={() => {
              // @ts-ignore
              navigate('Main', {
                screen: 'Tabs',
                params: {
                  screen: 'Profile',
                  params: { screen: 'SettingsNavigator' },
                },
              });
            }}
          />
        </View>
        <View className="px-5 mt-16">
          <Quote />
          <View className="mt-16" />
          <Divider className="mb-6 mt-4" />

          <Text className="mb-5 font-bold text-2xl mx-auto">
            {' '}
            Таблиця досягнень
          </Text>
          <Card>
            <UserMetrics />
            <Divider className="b-[#160F29] border-opacity-30 w-1/2 self-center" />
            <Badges />
          </Card>
          <Divider className="mb-6 mt-4" />
        </View>
      </ScrollView>
    </View>
  );
};
export default MyWay;
