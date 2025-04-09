import image from '@common/assets/images';
import { ExploreElement } from '@common/constants';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';

type ExploreLinksProps = {
  data: ExploreElement[];
};

const ExploreLinkButton = ({
  imageName,
  design,
  title,
  screenNavigation,
}: ExploreElement) => {
  const navigation = useNavigation();
  const handleLinkPress = () => {
    if (screenNavigation) {
      // @ts-ignore
      navigation.navigate('Main', {
        screen: screenNavigation,
      });
      return;
    }
  };

  return (
    <View className="ml-[40px]">
      <TouchableOpacity
        onPress={handleLinkPress}
        className="w-[75px] h-[75px] bg-[#ACB8E426] mb-[12px] items-center justify-center rounded-[17px]">
        <FastImage style={{ ...design }} source={image(imageName)} />
      </TouchableOpacity>
      <Text className="text-center text-[#586DB7] font-medium">{title}</Text>
    </View>
  );
};

const ExploreLinks: FC<ExploreLinksProps> = ({ data, onShowAll }) => {
  return (
    <View className="flex-row justify-center px-5">
      {data.map((item, index) => (
        <ExploreLinkButton {...item} onShowAll={onShowAll} key={index} />
      ))}
    </View>
  );
};

export default ExploreLinks;
