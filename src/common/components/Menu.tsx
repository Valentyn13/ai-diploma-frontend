import React from 'react';
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome6';

import Divider from './Divider';

type MenuItem = {
  id: number;
  name: string;
  category: string;
  icon: string;
};

type MenuProps = {
  items: MenuItem[];
};

const Item = ({ item }: { item: MenuItem }) => (
  <TouchableOpacity className="w-full flex flex-row items-center my-2 bg-[#FCE8CD] rounded-lg p-2">
    <Icon name={'lock'} size={16} />
    <Text className="ml-6 text-xl font-medium text-[#333]">{item.name}</Text>
  </TouchableOpacity>
);

const Menu: React.FC<MenuProps> = ({ items }) => {
  const groupedItems: Record<string, MenuItem[]> = {};
  items.forEach(item => {
    groupedItems[item.category] = groupedItems[item.category] || [];
    groupedItems[item.category].push(item);
  });

  return (
    <View style={{ flex: 1, width: '100%', alignItems: 'flex-start' }}>
      {Object.entries(groupedItems).map(([category, items]) => (
        <View className="w-full items-start" key={category}>
          <View className="w-full" style={{ marginLeft: 16 }}>
            {items.map(item => (
              <Item key={item.id} item={item} />
            ))}
          </View>
          <Divider className="my-1" />
        </View>
      ))}
    </View>
  );
};

export default Menu;
