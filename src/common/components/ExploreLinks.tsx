import image from '@common/assets/images';
import { ExploreElement, REGA_INSTRUCTOR_ID } from '@common/constants';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Category } from 'types/Category';
import { Session } from 'types/Meditation';

type ShowAllFn = (title: string, sessions: Session[]) => void;

type ExploreLinksProps = {
  data: ExploreElement[];
  categoryData: {
    sleep: Category;
    breathe: Category;
  };
  onShowAll: ShowAllFn;
};

const ExploreLinkButton = ({
  imageName,
  design,
  title,
  screenNavigation,
  categoryData,
  showAll,
  navigateToRega,
  onShowAll,
}: ExploreElement & {
  onShowAll: ShowAllFn;
  categoryData: {
    sleep: Category;
    breathe: Category;
  };
}) => {
  const navigation = useNavigation();
  const handleLinkPress = () => {
    if (navigateToRega) {
      // @ts-ignore
      navigation.navigate('Instructor', { id: REGA_INSTRUCTOR_ID });
      return;
    }
    if (screenNavigation) {
      // @ts-ignore
      navigation.navigate('Main', {
        screen: screenNavigation,
      });
      return;
    }
    if (showAll) {
      onShowAll(categoryData[showAll].title, categoryData[showAll].meditations);
    }
  };

  return (
    <View>
      <TouchableOpacity
        onPress={handleLinkPress}
        className="w-[75px] h-[75px] bg-[#ACB8E426] mb-[12px] items-center justify-center rounded-[17px]">
        <FastImage style={{ ...design }} source={image(imageName)} />
      </TouchableOpacity>
      <Text className="text-center text-[#586DB7] font-medium">{title}</Text>
    </View>
  );
};

const ExploreLinks: FC<ExploreLinksProps> = ({
  data,
  categoryData,
  onShowAll,
}) => {
  return (
    <View className="flex-row justify-between px-5">
      {data.map((item, index) => (
        <ExploreLinkButton
          {...item}
          categoryData={categoryData}
          onShowAll={onShowAll}
          key={index}
        />
      ))}
    </View>
  );
};

export default ExploreLinks;
