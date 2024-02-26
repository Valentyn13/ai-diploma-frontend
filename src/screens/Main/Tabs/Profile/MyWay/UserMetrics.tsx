import { fonts } from '@common/theme';
import i18n from '@services/localization/i18n';
import React, { FC } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { useSelector } from 'react-redux';

const ICONS = {
  minutes: ({ ...props }) => (
    <Svg viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M11 0C8.82441 0 6.69767 0.645139 4.88873 1.85383C3.07979 3.06253 1.66989 4.78049 0.83733 6.79048C0.00476617 8.80047 -0.213071 11.0122 0.211367 13.146C0.635804 15.2798 1.68345 17.2398 3.22183 18.7782C4.76021 20.3166 6.72022 21.3642 8.85401 21.7886C10.9878 22.2131 13.1995 21.9952 15.2095 21.1627C17.2195 20.3301 18.9375 18.9202 20.1462 17.1113C21.3549 15.3023 22 13.1756 22 11C22 8.08262 20.8411 5.28473 18.7782 3.22183C16.7153 1.15893 13.9174 0 11 0ZM15 12H11C10.7348 12 10.4804 11.8946 10.2929 11.7071C10.1054 11.5196 10 11.2652 10 11V5C10 4.73478 10.1054 4.48043 10.2929 4.29289C10.4804 4.10536 10.7348 4 11 4C11.2652 4 11.5196 4.10536 11.7071 4.29289C11.8946 4.48043 12 4.73478 12 5V10H15C15.2652 10 15.5196 10.1054 15.7071 10.2929C15.8946 10.4804 16 10.7348 16 11C16 11.2652 15.8946 11.5196 15.7071 11.7071C15.5196 11.8946 15.2652 12 15 12Z"
        fill="#160F29"
      />
    </Svg>
  ),
  sessions: ({ ...props }) => (
    <Svg viewBox="0 0 22 22" fill="none" {...props}>
      <Path
        d="M11 0C4.92448 0 0 4.92448 0 11C0 17.0755 4.92448 22 11 22C17.0755 22 22 17.0755 22 11C22 4.92448 17.0755 0 11 0ZM14.08 14.8201C14.08 14.9528 14.0448 15.0831 13.9781 15.1977C13.9113 15.3124 13.8155 15.4074 13.7001 15.473C13.5848 15.5386 13.4542 15.5725 13.3215 15.5713C13.1889 15.5701 13.0589 15.5337 12.9448 15.466L6.52696 11.6459C6.41519 11.5793 6.32265 11.4848 6.25838 11.3716C6.19411 11.2585 6.16033 11.1306 6.16033 11.0004C6.16033 10.8703 6.19411 10.7424 6.25838 10.6293C6.32265 10.5161 6.41519 10.4216 6.52696 10.355L12.9448 6.53488C13.0588 6.46689 13.1887 6.43034 13.3214 6.42893C13.4541 6.42753 13.5848 6.46133 13.7002 6.52689C13.8156 6.59245 13.9115 6.68743 13.9782 6.80215C14.045 6.91686 14.0801 7.04721 14.08 7.17992V14.8201Z"
        fill="#160F29"
      />
    </Svg>
  ),
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
      className="flex flex-1 text-center justify-center items-center text-white rounded-lg"
      {...props}>
      <MetricIcon
        style={{
          height: 22,
          width: 22,
        }}
      />
      <Text
        style={{ fontFamily: fonts?.regular }}
        className="text-xl text-black text-left mt-2">
        {title}
      </Text>
      <Text className="text-5xl font-bold text-black text-left mt-4">
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
    <View className="flex flex-row flex-wrap content-center items-center gap-4 overflow-hidden pt-10 px-4">
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
