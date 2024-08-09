import { useNavigation } from '@react-navigation/native';
import { Card, Text, TouchableOpacity, View } from 'react-native-ui-lib';
import Icon from 'react-native-vector-icons/Ionicons';

import Logo from './Logo';

const AppHeader = () => {
  const navigation = useNavigation();

  return (
    <Card
      row
      padding-20
      style={{
        backgroundColor: '#FFF',
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
      <Logo />
      <View row center>
        <TouchableOpacity
          center
          style={{
            width: 40,
            height: 40,
          }}
          onPress={() =>
            navigation.navigate('Main', {
              screen: 'Notifications',
            })
          }>
          <Icon
            name="search-outline"
            size={24}
            color="#2B2B2B"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          center
          style={{
            width: 40,
            height: 40,
          }}
          onPress={() =>
            navigation.navigate('Main', {
              screen: 'Notifications',
            })
          }>
          <Icon
            name="notifications-outline"
            size={24}
            color="#2B2B2B"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => console.log('profile')}>
          <View
            center
            style={{
              backgroundColor: '#FDFAFA',
              width: 40,
              height: 40,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: '#A694F5',
            }}>
            <Text style={{ color: '#A694F5', fontSize: 16 }}>DA</Text>
          </View>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default AppHeader;
