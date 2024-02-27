import image from '@common/assets/images';
import { SubTitle, TouchableIcon } from '@common/components/Styled';
import { AMPLITUDE_EVENTS, useAmplitude } from '@services/hooks/useAmplitude';
import useCache from '@services/hooks/useCache';
import { INTRO_METADATA_KEY, IntroMetadata } from '@services/hooks/useIntro';
import { chooseSex } from '@store/actions';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import PageTitle from '../PageTitle';

export const BgImage = styled.ImageBackground.attrs(({ name, isFirst }) => ({
  resizeMode: isFirst ? 'cover' : 'contain',
  source: image(name),
}))`
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  padding-left: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-right: ${({ theme: { dimens } }) => dimens.margin}px;
  padding-bottom: 30px;
`;

const SexChooserContainer = styled.View`
  flex-direction: column;
  align-items: center;
`;

const SexTitle = styled(SubTitle)`
  margin-top: 10px;
`;

const SexChooser = ({ sex, onPress }) => (
  <SexChooserContainer>
    <TouchableIcon name={sex} size={44} {...{ onPress }} />
    <SexTitle k={sex} />
  </SexChooserContainer>
);

const ChooseSex = () => {
  const dispatch = useDispatch();
  const [sex, setSex] = useState<'M' | 'F'>();
  const [value, setValue] = useCache<IntroMetadata>(INTRO_METADATA_KEY, {
    categories: [],
  });

  const { logEvent, uploadEvents } = useAmplitude();

  useEffect(() => {
    logEvent(AMPLITUDE_EVENTS.ONBOARDING_SCREEN_VIEW, { screen: 'gender' });
    uploadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const selectGender = (gender: 'M' | 'F') => {
    setSex(gender);
    dispatch(chooseSex({ sex: gender }));
    setValue({
      ...value,
      sex,
    });
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <PageTitle title="הכירו את מיכאל" subTitle="מטפל AI הראשון בישראל" />

      <View className="flex-1 mt-36 px-5">
        <Text className="text-center leading-4">
          מבוסס על מודל הAI המתקדם ביותר בעברית. מיכאל שונה מכל צ'אטבוט שנתקלתם
          בו - הוא אומן על אלפי שיחות טיפול שנוהלו על ידי מטפלים, ואנשי מקצוע.
        </Text>
        <Text className="text-center leading-4 mt-2">
          בשיחה עם מיכאל, תוכלו לשתף את התחושות שלכם, ולקבל מענה, הכוונה וייעוץ
          על תרגילים שיעזרו לכם להרגיש יותר בטוב ברגע, בהתאם למצב הנוכחי שלכם.
        </Text>
        <View className="relative flex-1 -z-20">
          <View className="top-0 right-0 absolute w-10/12 flex flex-col">
            <View className="bg-white rounded-3xl w-10/12 mt-10 opacity-80 p-4 mr-auto">
              <Text className="text-xs text-left">{`היי 👋 אני מיכאל, כאן כדי לעזור לך.

אני יודע שלחץ וחרדה יכולים להיות קשים, אך אני כאן לתמוך בך- נלמד טכניקות מיינדפולנס, נתמודד עם מחשבות ורגשות ונמצא מדיטציות מותאמות אישית לעזור לך להרגע ולהרגיש בשליטה.

איך את/ה מרגיש/ה היום?`}</Text>
            </View>
            <View className="w-10/12 bg-white rounded-3xl mt-2 opacity-80 p-4 ml-auto">
              <Text className="text-xs text-left">{`בן הזוג שלי נפרד ממני היום, אני לא מצליחה לתפקד :(`}</Text>
            </View>
            <View className="w-10/12 bg-white rounded-3xl mt-2 opacity-80 p-4">
              <Text className="text-xs text-left">{`אני ממש מצטער לשמוע על הפרידה, זה באמת קשה לעבור דבר כזה. חשוב שתדעי שזה בסדר גמור שאת מרגישה ככה, זה חלק מהתהליך. הדבר הכי טוב לעכשיו`}</Text>
            </View>
          </View>
        </View>
      </View>

      <View className="absolute -bottom-[20%] -left-[50%] -z-10 overflow-hidden">
        <Image
          source={image('michael')}
          resizeMethod="resize"
          resizeMode="contain"
        />
      </View>
    </View>
  );
};

SexChooser.propTypes = {
  sex: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
};

export default ChooseSex;
