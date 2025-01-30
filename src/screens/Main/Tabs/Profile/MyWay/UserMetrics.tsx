import Gradient from '@common/components/Gradient';
import i18n from '@services/localization/i18n';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSelector } from 'react-redux';

const ICONS = {
  minutes: ({ ...props }) => (
    <Svg viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        fill="#000"
        d="M9 17.283C4.433 17.283.717 13.567.717 9 .717 4.433 4.433.717 9 .717c4.567 0 8.283 3.716 8.283 8.283 0 4.567-3.716 8.283-8.283 8.283Zm8.293-11.786a8.971 8.971 0 0 0-1.93-2.86A8.97 8.97 0 0 0 9 0a8.97 8.97 0 0 0-6.364 2.636A8.966 8.966 0 0 0 0 9a8.966 8.966 0 0 0 2.636 6.364A8.971 8.971 0 0 0 9 18a8.971 8.971 0 0 0 6.364-2.636A8.971 8.971 0 0 0 18 9a8.943 8.943 0 0 0-.707-3.503Z"
      />
      <Path
        fill="#000"
        d="M13.314 12.038 9.359 8.83V4.573a.359.359 0 0 0-.718 0V9c0 .108.05.21.133.278l4.088 3.317a.357.357 0 0 0 .504-.053.358.358 0 0 0-.052-.504Z"
      />
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
      <Text className="text-lg text-left text-black mt-2">{title}</Text>
      <Text className="text-4xl font-medium text-black text-left my-4">
        {value}
      </Text>
    </View>
  );
};

const UserMetrics = () => {
  const { meditationsPracticed, minutesPracticed } = useSelector(
    state => state.userProgress,
  );

  return (
    <View className="flex flex-row flex-wrap content-center items-center gap-4 overflow-hidden pt-6 px-2">
      <MetricBox
        value={Math.round(minutesPracticed)}
        title={i18n.t('minutesSessions')}
        id="minutes"
      />
      <MetricBox
        value={meditationsPracticed.length}
        title={i18n.t('sessions')}
        id="sessions"
      />
    </View>
  );
};

export default UserMetrics;
