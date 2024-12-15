import { Image, Text, View } from 'react-native';

import GlitterIcon from '../common/Glitter';

type Props = {
  avatarSrc: number;
  title: string;
  setIsPollEnded: (isEnded: boolean) => void;
};

const StarterChatHeader = ({ avatarSrc, title, setIsPollEnded }: Props) => {
  // const { resetStarterChat } = useStarterChatStore(state => ({
  //   resetStarterChat: state.resetStarterChat,
  // }));

  return (
    <View className="bg-[#FFF8EE] w-full flex-row justify-between items-center p-2 border-b border-gray-300">
      <View className="flex-row items-center">
        <View className="flex-row items-center ml-6">
          <Image source={avatarSrc} className="w-8 h-8 rounded-full" />
          <Text className="text-black font-normal text-xl ml-2">{title}</Text>
          <GlitterIcon className="w-6 h-6 ml-1" />
        </View>
      </View>
      {/* <CircleButton
        backgroundColor="#00000060"
        color="#fff"
        onPress={() => {
          resetStarterChat({ disableTabbar: false });
          setIsPollEnded(false);
        }}
        size={40}
        icon="rotate-right"
      /> */}
    </View>
  );
};

export default StarterChatHeader;
