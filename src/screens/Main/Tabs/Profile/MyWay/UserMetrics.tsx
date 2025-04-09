import Gradient from '@common/components/Gradient';
import { useChatsStore } from '@store/useChatsStore';
import { useDocumentChatStore } from '@store/useDocumentChatsStore';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const ICONS = {
  minutes: ({ ...props }) => (
    <Svg viewBox="0 0 24 24" width="26px" height="26px" {...props}>
      <Path d="M6 2c-1.094 0-2 .906-2 2v16c0 1.094.906 2 2 2h12c1.094 0 2-.906 2-2V6.586L15.414 2H6zm0 2h8v4h4v12H6V4zm2 6v2h8v-2H8zm0 3v2h8v-2H8zm0 3v2h5v-2H8z" />
    </Svg>
  ),
  sessions: ({ ...props }) => (
    <Svg viewBox="0 0 21 24" fill="none" {...props}>
      <Path
        fill="#000"
        fillRule="evenodd"
        d="M18.046 18.577v-7.236c0-2.49-2.008-4.518-4.475-4.518h-.44c.567-.658.911-1.516.911-2.454v-.624C14.042 1.68 12.378 0 10.333 0 8.29 0 6.625 1.68 6.625 3.745v.624c0 .938.344 1.796.91 2.454h-.618c-2.467 0-4.473 2.027-4.473 4.518v7.246A2.706 2.706 0 0 0 0 21.287C0 22.784 1.205 24 2.686 24H17.98c1.48 0 2.686-1.217 2.686-2.712 0-1.474-1.17-2.676-2.621-2.71ZM7.904 4.37v-.624c0-1.353 1.09-2.454 2.43-2.454s2.43 1.101 2.43 2.454v.624c0 1.353-1.09 2.454-2.43 2.454s-2.43-1.1-2.43-2.454Zm-4.182 6.972c0-1.779 1.433-3.226 3.195-3.226h6.654c1.762 0 3.196 1.447 3.196 3.226v7.234h-1.28v-6.631a.642.642 0 0 0-.639-.646.642.642 0 0 0-.64.646v6.631H6.28v-6.631a.642.642 0 0 0-.64-.646.642.642 0 0 0-.639.646v6.631H3.722v-7.234ZM8.543 22.71H2.686a1.416 1.416 0 0 1-1.407-1.421c0-.784.631-1.421 1.407-1.421h7.249a2.33 2.33 0 0 0-.24 1.033v.775A1.03 1.03 0 0 1 8.67 22.71h-.128Zm9.438 0h-7.249c.154-.312.24-.663.24-1.034V20.9c0-.57.46-1.033 1.024-1.033h5.985c.776 0 1.407.637 1.407 1.42 0 .784-.631 1.422-1.407 1.422Z"
        clipRule="evenodd"
      />
    </Svg>
  ),
};

const GRADIENTS = {
  minutes: ['#BFE9FF', '#6190E8'],
  sessions: ['#FFB799', '#A7BFE8'],
};

type MetricBoxProps = {
  id: 'minutes' | 'sessions';
  value: number;
  title: string;
};

const MetricBox: FC<MetricBoxProps> = ({ id, value, title, ...props }) => {
  const MetricIcon = ICONS[id];

  return (
    <View
      className="flex flex-1 text-center justify-center items-center text-white rounded-lg overflow-hidden"
      {...props}>
      <Gradient colors={GRADIENTS[id]} angle={45} />
      <MetricIcon
        style={{
          marginTop: 16,
          height: 22,
          width: 22,
        }}
      />
      <Text className="text-xl text-left text-black mt-2">{title}</Text>
      <Text className="text-4xl font-medium text-black text-left my-4">
        {value}
      </Text>
    </View>
  );
};

const UserMetrics = () => {
  const { documentChats } = useDocumentChatStore(state => ({
    documentChats: state.documentChats,
  }));

  const { chats } = useChatsStore(state => ({
    chats: state.chats,
  }));

  return (
    <View className="flex flex-row flex-wrap content-center items-center gap-4 overflow-hidden pt-6 px-2">
      <MetricBox
        value={documentChats.length}
        title={'Активних документів'}
        id="minutes"
      />
      <MetricBox value={chats.length} title={'Чатів з Майклом'} id="sessions" />
    </View>
  );
};

export default UserMetrics;
