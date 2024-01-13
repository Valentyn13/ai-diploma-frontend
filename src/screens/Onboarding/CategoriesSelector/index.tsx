import image from '@common/assets/images';
import AppButton from '@common/components/AppButton';
import AppText from '@common/components/AppText';
import { Title } from '@common/components/Styled';
import WithFadeIn from '@common/components/transitions/WithFadeIn';
import WithSlideInX from '@common/components/transitions/WithSlideInX';
import WithSlideInY from '@common/components/transitions/WithSlideInY';
import { ProgressView } from '@react-native-community/progress-view';
import { useNavigation } from '@react-navigation/native';
import { captureMessage } from '@sentry/react-native';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useCache from '@services/hooks/useCache';
import { INTRO_METADATA_KEY, IntroMetadata } from '@services/hooks/useIntro';
import { chooseCategories } from '@store/actions';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, Image, Platform, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { scale } from 'react-native-size-matters';
import { useDispatch } from 'react-redux';

const CATEGORIES = [
  {
    key: 'Sleep',
    intro: 'sleepIntro',
  },
  {
    key: 'Stress',
    intro: 'stressIntro',
  },
  {
    key: 'army',
    intro: 'armyIntro',
  },

  {
    key: 'South',
    intro: 'southIntro',
  },
];

const MAX_SELECTION = 3;

const Intro = () => {
  const { navigate } = useNavigation();
  const [value, setValue] = useCache<IntroMetadata>(INTRO_METADATA_KEY, {
    categories: [],
  });
  const dispatch = useDispatch();
  const [selectedItems, setSelectedItems] = useState([]);
  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'categories' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onContinue = () => {
    dispatch(chooseCategories({ categories: selectedItems }));
    setValue({
      ...value,
      categories: selectedItems,
    });

    // @ts-ignore
    navigate('Auth', {
      screen: 'PreLogin',
    });
  };

  const numSelected = selectedItems.length;
  const canSelect = numSelected < MAX_SELECTION;

  const { width } = Dimensions.get('screen');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fdedd6',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        style={{ position: 'absolute', top: 0, width }}
        source={image('ellipse_pink')}
      />
      <View
        style={{ position: 'absolute', top: scale(65), alignItems: 'center' }}>
        <WithSlideInX delay={300}>
          <WithFadeIn delay={300}>
            <AppText
              black
              style={{ fontSize: 20, textAlign: 'center', color: '#000000' }}>
              במה רגע יכולה לעזור לך?
            </AppText>
            <AppText
              style={{
                fontSize: 16,
                marginTop: 6,
                textAlign: 'center',
                color: '#000000',
              }}>
              אפשר לבחור עד 3 נושאים
            </AppText>
          </WithFadeIn>
        </WithSlideInX>
      </View>
      <View style={{ alignItems: 'center', width: '90%' }}>
        <FlatList
          scrollEnabled={false}
          style={{ marginTop: scale(15) }}
          columnWrapperStyle={{ justifyContent: 'center' }}
          numColumns={2}
          data={CATEGORIES}
          renderItem={({ item, index }) => {
            const containIndex = selectedItems.indexOf(CATEGORIES[index].key);
            const width = Dimensions.get('screen').width / 2 - scale(26);

            let imageSelector = <View />;
            switch (index) {
              case 0:
                imageSelector = (
                  <Image
                    source={image('ic_sleep')}
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: 0,
                      height: scale(130),
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                );
                break;
              case 1:
                imageSelector = (
                  <Image
                    source={image('ic_stress')}
                    style={{
                      position: 'absolute',
                      bottom: 5,
                      left: 0,
                      right: 0,
                      height: scale(130),
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                );
                break;
              case 2:
                imageSelector = (
                  <Image
                    source={image('ic_army')}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: scale(130),
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                );
                break;
              case 3:
                imageSelector = (
                  <Image
                    source={image('ic_mental')}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      height: scale(130),
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                );
                break;
              case 4:
                imageSelector = (
                  <Image
                    source={image('ic_exam')}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      left: 0,
                      height: scale(130),
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                );
                break;
              case 5:
                imageSelector = (
                  <Image
                    source={image('ic_sleep')}
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      height: scale(130),
                    }}
                    resizeMode="contain"
                    resizeMethod="resize"
                  />
                );
                break;
            }

            return (
              <WithSlideInY delay={300 + index * 150}>
                <WithFadeIn delay={300 + index * 150}>
                  <TouchableOpacity
                    onPress={() => {
                      const items = Object.assign([], selectedItems);
                      if (containIndex !== -1) {
                        items.splice(containIndex, 1);
                      } else if (selectedItems.length < 3) {
                        items.push(CATEGORIES[index].key);
                      }

                      setSelectedItems(items);
                    }}
                    style={{
                      backgroundColor:
                        containIndex !== -1 ? '#D66366' : 'white',
                      borderRadius: 6,
                      height: scale(130),
                      width,
                      justifyContent: 'center',
                      alignItems: 'center',
                      margin: scale(6),
                    }}>
                    {containIndex === -1 && imageSelector}
                    {containIndex !== -1 && (
                      <Image
                        style={{ position: 'absolute', top: 6, left: 6 }}
                        source={image('check')}
                      />
                    )}
                    <Title
                      k={CATEGORIES[index].intro}
                      style={{
                        textAlign: 'center',
                        paddingHorizontal: 20,
                        color: containIndex !== -1 ? 'white' : 'black',
                        fontSize: 20,
                      }}
                    />
                  </TouchableOpacity>
                </WithFadeIn>
              </WithSlideInY>
            );
          }}
          onScrollToIndexFailed={info => {
            captureMessage(
              `scrollToIndex failed in Intro. index=${info.index}`,
            );
          }}
        />
      </View>
      <View
        style={{
          width: '80%',
          bottom: scale(90),
          position: 'absolute',
          height: 20,
          transform: [{ rotateY: Platform.OS === 'ios' ? '0deg' : '180deg' }],
        }}>
        <ProgressView
          progressViewStyle="default"
          progressTintColor="black"
          trackTintColor="gray"
          progress={0.75}
        />
      </View>
      <View
        className="w-full"
        style={{ position: 'absolute', bottom: 0, padding: scale(40) }}>
        <AppButton onPress={() => onContinue()}>המשך</AppButton>
      </View>
    </View>
  );
};

export default Intro;
