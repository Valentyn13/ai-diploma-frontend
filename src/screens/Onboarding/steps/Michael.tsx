import image from '@common/assets/images';
import { SubTitle, TouchableIcon } from '@common/components/Styled';
import Theme from '@common/theme';
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
        backgroundColor: Theme.colors.bgColor,
      }}>
      <PageTitle
        title="Зустрічайте Майкла"
        subTitle="Перший ШІ-терапевт в Україні"
      />

      <View className="flex-1 mt-36 px-5">
        <Text className="text-center leading-4 text-black">
          На основі найдосконалішої моделі ШІ. Майкл відрізняється від
          будь-якого чат-бота, з яким ви стикалися Бо - він є наставником у
          тисячах лікувальних бесід, проведених терапевтами та професіоналами.
        </Text>
        <Text className="text-center leading-4 mt-2 text-black">
          У розмові з Майклом ви можете поділитися своїми почуттями, отримати
          відповіді, вказівки та поради Про вправи, які допоможуть вам
          почуватись краще в даний момент, залежно від вашої поточної ситуації.
        </Text>
        <View className="relative flex-1 -z-20">
          <View className="top-0 right-0 absolute w-10/12 flex flex-col">
            <View className="bg-white rounded-3xl w-10/12 mt-10 opacity-80 p-4 mr-auto">
              <Text className="text-xs text-left text-black">{`
              Привіт, я Майкл 👋

Я тут, щоб вислухати, підтримати та запропонувати нові перспективи – як хороший друг. Але важливо пам'ятати:
– Я заміню не професійне лікування, а інструменти.
- Ми можемо обмінюватися до 40 повідомленнями в кожній розмові. Якщо ми хочемо продовжити розмову, просто відкрийте нову розмову!
– Чим більше ви ділитеся зі мною, тим більше корисної інформації я зможу вам дати!

Тож давайте почнемо – яка тема вас зараз найбільше хвилює?
              `}</Text>
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
