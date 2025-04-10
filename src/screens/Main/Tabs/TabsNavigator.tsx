import MeditationPicker from '@common/components/MeditationPicker';
import theme from '@common/theme';
import Theme from '@common/theme';
import {
  BottomTabBarButtonProps,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  NavigationProp,
  getFocusedRouteNameFromRoute,
  useNavigation,
} from '@react-navigation/native';
import i18n from '@services/localization/i18n';
import {
  ChatControllerSteps,
  useCategorizedChatFlowStore,
} from '@store/useCategorizedChatFlowStore';
import { useChatsStore } from '@store/useChatsStore';
import { useStarterChatStore } from '@store/useStarterChatStore';
import React, { useLayoutEffect } from 'react';
import { Pressable, StatusBar, Text } from 'react-native';
import Animated from 'react-native-reanimated';
import { Edges, SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path, SvgProps } from 'react-native-svg';

import ChatController from './Chat/ChatController';
import Courses from './Courses';
import Home from './Home';
import Profile from './Profile';

const Tab = createBottomTabNavigator();
const TABS = { Home, Chat: ChatController, Courses, Profile };

const HomeIcon = (props: SvgProps) => (
  <Svg fill="none" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M19.359 7.89 10.444.178a.233.233 0 0 0-.05-.038A.54.54 0 0 0 9.68.13L.765 7.84a.5.5 0 0 0-.043.72c.105.113.25.17.394.17.124 0 .25-.042.35-.129l1.606-1.39v8.994c0 .704.592 1.281 1.325 1.281H7.21c.686 0 1.243-.539 1.243-1.202v-4.573c0-.101.086-.184.19-.184h2.841c.105 0 .191.082.191.184v4.573c0 .663.557 1.202 1.243 1.202h2.813c.74 0 1.325-.705 1.325-1.606v-8.62l1.605 1.39a.536.536 0 0 0 .351.129.534.534 0 0 0 .394-.17.507.507 0 0 0-.047-.72ZM16 10.405v5.469c0 .366-.187.588-.273.588h-2.813a.188.188 0 0 1-.19-.185v-4.565c0-.663-.558-1.202-1.244-1.202H8.64c-.686 0-1.243.539-1.243 1.202v4.573a.188.188 0 0 1-.191.184H4.393a.27.27 0 0 1-.273-.263V6.299l5.915-5.111L16 6.348v4.057Z"
      clipRule="evenodd"
    />
  </Svg>
);

const CoursesIcon = props => (
  <Svg viewBox="0 0 24 24" width="25px" height="25px" {...props}>
    <Path
      fill={props.color}
      d="M6 2c-1.094 0-2 .906-2 2v16c0 1.094.906 2 2 2h12c1.094 0 2-.906 2-2V6.586L15.414 2H6zm0 2h8v4h4v12H6V4zm2 6v2h8v-2H8zm0 3v2h8v-2H8zm0 3v2h5v-2H8z"
    />
  </Svg>
  // <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
  //   <Path
  //     fill={props.color}
  //     fillRule="evenodd"
  //     d="M9.388 6.882c1.49-1.68 1.139-4.326-.57-5.47-1.728 1.374-2.06 4.427-.533 5.313V5.222c-.002-.387.068-.751.541-.759.471-.008.563.346.562.739v1.68Zm-3.974 3.125c-.04-2.111-2.142-3.924-3.99-3.601-.13.023-.3.318-.304.49a3.837 3.837 0 0 0 2.84 3.77c.187.05.384.066.576.098-.297-.462-.636-.789-.97-1.122-.272-.271-.373-.588-.067-.88.28-.267.587-.172.835.084.328.338.642.689 1.08 1.161Zm-4.263 3.37c-.368 2.567 1.967 4.435 3.581 4.225-.439-.377-.788-.663-1.12-.968-.296-.273-.424-.613-.095-.927.308-.294.614-.142.871.135.313.338.63.674 1.04 1.112-.108-2.267-2.07-3.84-4.277-3.576Zm11.808-2.09c2.178-.016 3.938-2.225 3.537-4.265-1.964-.43-4.403 1.472-4.162 3.297.307-.283.596-.546.882-.813.288-.268.607-.545.96-.155.364.403.078.719-.235 1.004-.303.277-.596.564-.982.931Zm-1.41 7.263c2.037.688 4.286-.732 4.701-2.855-1.978-.987-4.5-.134-5.173 1.81.34-.152.631-.3.936-.415.426-.16.952-.642 1.256.05.284.649-.389.735-.78.945-.283.153-.576.286-.94.465Zm-4.084.269c.2-1.542.394-2.989.56-4.438.017-.142-.108-.325-.211-.452-.174-.214-.4-.385-.575-.598-.763-.936-1.628-1.442-2.94-1.487C2.16 11.772.331 9.828.07 7.684a8.484 8.484 0 0 1-.04-1.779c.019-.219.3-.571.493-.594 3.099-.36 5.31 1.196 5.988 3.882.057.229.133.481.092.702-.245 1.318.688 1.945 1.653 2.657v-2.168c0-.12-.006-.24.009-.357.113-.925-.114-1.64-.813-2.371-1.716-1.8-1.648-4.634.006-6.496.301-.339.634-.652.96-.968.273-.265.55-.245.841-.005 3.224 2.66 2.569 6.244.458 8.054-.162.139-.315.39-.319.593-.028 1.385-.014 2.772-.014 4.132.793-.28 1.628-1.382 1.66-2.264.1-2.74 2.247-4.847 4.973-4.877 1.698-.019 1.698-.019 1.652 1.689-.076 2.852-2.213 4.983-5.047 4.962-.707-.006-1.176.262-1.719.681-1.333 1.028-2.1 2.274-2.076 3.996.006.464-.148.93-.237 1.439.714-.052.987-.47 1.199-1.05.815-2.236 2.712-3.54 5.016-3.362.807.063 1.603.38 2.379.653.178.063.399.456.355.638-.68 2.835-2.664 4.562-5.485 4.366-.503-.035-1.013-.18-1.486-.363-.425-.164-.765-.101-1.174.054-.802.304-1.32.766-1.617 1.627-.237.685-.749 1.284-1.19 1.884-.226.31-.59.444-.912.09-.295-.326-.122-.6.132-.878.25-.275.488-.574.673-.896.66-1.158.576-1.593-.525-2.33-.245-.163-.636-.136-.961-.144-2.416-.06-4.412-1.631-4.86-3.918-.134-.692-.13-1.421-.102-2.13.009-.21.303-.566.497-.588 3.126-.36 5.344 1.264 5.976 3.897.105.437.15.909.114 1.356-.05.619.275.94.846 1.32Z"
  //     clipRule="evenodd"
  //   />
  // </Svg>
);

const ProfileIcon = props => (
  <Svg xmlns="http://www.w3.org/2000/svg" fill="none" {...props}>
    <Path
      fill={props.color}
      fillRule="evenodd"
      d="M15.957 11.05c-.533-1.074-1.019-2.027-1.476-2.994a2.208 2.208 0 0 1-.213-.814c-.176-3.543-3.12-6.29-6.693-6.228-3.484.06-6.32 2.916-6.38 6.426-.035 2.018.544 3.928 1.05 5.85.493 1.874.913 3.76.95 5.71l.008.323c.007.36-.017.732-.488.742-.464.009-.484-.348-.528-.713-.18-1.51-.322-3.028-.61-4.518-.307-1.598-.822-3.155-1.139-4.751C.06 8.18.014 6.281.853 4.443 2.259 1.359 5.646-.475 8.929.107c3.503.622 6.067 3.41 6.33 6.86.024.312.118.635.253.917.52 1.083 1.073 2.149 1.607 3.224.32.645.139.931-.594.944-.392.006-.783 0-1.248 0 0 .63.003 1.199 0 1.768-.01 1.456-.811 2.245-2.28 2.25-.555.002-1.11 0-1.746 0v2.47c0 .323.003.646-.003.968-.006.334-.171.608-.507.54-.192-.038-.469-.325-.475-.507-.041-1.307-.028-2.616-.02-3.924.002-.407.263-.557.642-.556.7.002 1.4.004 2.1-.002.929-.006 1.274-.35 1.277-1.26.002-.664-.003-1.327.002-1.99.004-.615.139-.747.767-.758.266-.005.533 0 .923 0Z"
      clipRule="evenodd"
    />
  </Svg>
);

const ChatIcon = props => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 51 61"
    fill="none"
    {...props}>
    <Path
      fill={props.color}
      d="M24.722 12.58C21.833 9.69 19.856 4.642 18.875.051c-.983 4.592-2.958 9.64-5.847 12.53C10.138 15.468 5.09 17.445.5 18.43c4.592.98 9.639 2.957 12.527 5.846 2.89 2.89 4.866 7.936 5.85 12.528.98-4.593 2.957-9.64 5.845-12.53 2.889-2.888 7.937-4.864 12.527-5.848-4.591-.98-9.638-2.958-12.528-5.847ZM43.486 35.717c-1.724-1.725-2.908-4.742-3.494-7.484-.587 2.742-1.766 5.759-3.492 7.485-1.727 1.724-4.742 2.906-7.484 3.493 2.743.587 5.758 1.768 7.484 3.494 1.726 1.725 2.907 4.741 3.494 7.484.586-2.744 1.767-5.759 3.493-7.485 1.725-1.725 4.741-2.907 7.483-3.495-2.742-.586-5.758-1.767-7.484-3.492ZM12.886 41.619c-.493 2.302-1.483 4.835-2.932 6.284-1.449 1.448-3.98 2.44-6.283 2.933 2.302.494 4.834 1.483 6.283 2.933 1.449 1.448 2.44 3.98 2.934 6.283.492-2.304 1.483-4.835 2.932-6.284 1.448-1.449 3.98-2.44 6.282-2.934-2.302-.492-4.834-1.483-6.283-2.932-1.448-1.448-2.44-3.98-2.933-6.283Z"
    />
  </Svg>
);

const ICONS = {
  home: HomeIcon,
  chat: ChatIcon,
  courses: CoursesIcon,
  profile: ProfileIcon,
};

const tabScreen = (name: string) => ({
  tabBarIcon: ({ focused }: { focused: boolean }) => {
    // @ts-ignore
    const Icon = ICONS[name];

    return (
      <Animated.View
        className="mt-1"
        style={{
          transform: [{ scale: focused ? 1.2 : 1 }],
        }}>
        <Icon
          className="w-6 h-6"
          color={focused ? theme.colors.selected : theme.colors.inactive}
        />
      </Animated.View>
    );
  },
  tabBarLabel: ({ focused }: { focused: boolean }) => (
    <Text
      className="text-sm text-center mb-2"
      style={{
        color: focused ? theme.colors.selected : theme.colors.inactive,
        textAlign: 'center',
      }}>
      {i18n.t(`${name.toLowerCase()}`)}
    </Text>
  ),
});

const CustomTabBarButton = ({
  navigation,
  link,
  isSessionStarted,
  hasPassedStarterChat,
  chatStep,
  route,
  setIsLeaveModalVisible,
  setNavCallback,
  ...other
}: BottomTabBarButtonProps & {
  navigation: NavigationProp<any>;
  link: string;
  chatStep: ChatControllerSteps;
  route: any;
  hasPassedStarterChat: boolean;
  isSessionStarted: boolean;
  setIsLeaveModalVisible: (visible: boolean) => void;
  setNavCallback: (cb: Function | null) => void;
}) => {
  const setCurrentStep = useCategorizedChatFlowStore(
    state => state.setCurrentStep,
  );
  const handlePress = () => {
    const currRoute = getFocusedRouteNameFromRoute(route);
    const cb = () => {
      if (currRoute === 'Chat' && chatStep !== 'selection') {
        setCurrentStep('selection');
      }
      navigation.navigate(link);
    };
    if (!isSessionStarted) {
      cb();
      return;
    }
    setNavCallback(cb);
    setIsLeaveModalVisible(true);
  };

  return <Pressable {...other} onPress={handlePress} />;
};

const TabNavigator = ({ route }) => {
  const navigation = useNavigation();
  const hasPassedStarterChat = true;
  const { isStartedChatActivated } = useStarterChatStore(state => ({
    isStartedChatActivated: state.isStartedChatActivated,
  }));
  const chatStep = useCategorizedChatFlowStore(state => state.currentStep);
  const [isTabbarVisible, setIsTabbarVisible] = React.useState(true);
  const { isSessionStarted, setNavCallback, setIsLeaveModalVisible } =
    useChatsStore(state => ({
      isSessionStarted: state.isSessionStarted,
      setIsLeaveModalVisible: state.setIsLeaveModalVisible,
      setNavCallback: state.setNavCallback,
    }));

  const routeName = getFocusedRouteNameFromRoute(route);

  const safeAreaEdges =
    routeName === 'Home' || !routeName
      ? ['left', 'right', 'bottom']
      : ['top', 'left', 'right', 'bottom'];

  useLayoutEffect(() => {
    if (
      routeName === 'Chat' &&
      chatStep === 'selection' &&
      !hasPassedStarterChat &&
      !isStartedChatActivated
    ) {
      setIsTabbarVisible(false);
    } else {
      setIsTabbarVisible(true);
    }
  }, [
    route,
    chatStep,
    routeName,
    hasPassedStarterChat,
    isStartedChatActivated,
  ]);

  return (
    <SafeAreaView
      className="flex-1"
      edges={safeAreaEdges as Edges}
      style={{
        backgroundColor: Theme.colors.bgColor,
      }}>
      <StatusBar hidden={false} />
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          tabBarStyle: {
            height: 64,
            display: isTabbarVisible ? 'flex' : 'none',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: Theme.colors.bgColor,
          },
        }}>
        {Object.entries(TABS).map(([key, value]) => (
          <Tab.Screen
            key={key}
            name={key}
            component={value}
            options={{
              tabBarItemStyle: {
                flex: 1,
                paddingBottom: 2,
                paddingTop: 2,
                height: 64,
              },
              tabBarButton: props => (
                <CustomTabBarButton
                  {...props}
                  route={route}
                  hasPassedStarterChat={hasPassedStarterChat}
                  chatStep={chatStep}
                  setNavCallback={setNavCallback}
                  isSessionStarted={isSessionStarted}
                  setIsLeaveModalVisible={setIsLeaveModalVisible}
                  navigation={navigation}
                  link={key}
                />
              ),
              ...tabScreen(key.toLowerCase()),
              headerShown: false,
            }}
          />
        ))}
      </Tab.Navigator>
      <MeditationPicker />
    </SafeAreaView>
  );
};

export default TabNavigator;
