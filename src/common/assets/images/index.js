/* eslint-disable max-lines */
/* eslint-disable global-require */

import {Platform} from 'react-native';

const images = {
  homeOn: require('./homeOn.png'),
  homeOff: require('./homeOff.png'),
  meditationsOn: require('./meditationsOn.png'),
  meditationsOff: require('./meditationsOff.png'),
  coursesOn: require('./coursesOn.png'),
  coursesOff: require('./coursesOff.png'),
  profileOn: require('./profileOn.png'),
  profileOff: require('./profileOff.png'),
  download: require('./download.png'),
  heart: require('./heart.png'),
  heartSelected: require('./heartSelected.png'),
  music: require('./music.png'),
  down: require('./down.png'),
  bg: require('./bg.png'),
  tempBg: require('./tempBg.png'),
  logo: require('./logo.png'),
  badge: require('./badge.png'),
  close: require('./close.png'),
  playerBg: require('./playerBg.png'),
  info: require('./info.png'),
  intro1: require('./intro1.png'),
  intro2: require('./intro2.png'),
  onboardStudy: require('./onboard_study.png'),
  onboardSleep: require('./onboard_sleep.png'),
  onboardRelax: require('./onboard_relax.png'),
  male: require('./male.png'),
  female: require('./female.png'),

  // experience
  expBeginner: require('./exp_beginner.png'),
  expIntermediate: require('./exp_intermediate.png'),
  expExpert: require('./exp_expert.png'),

  // categories
  categoryIcons: [
    require('./020-sleeping.png'),
    require('./009-negative-thinking.png'),
    require('./007-foggy.png'),
    require('./006-meditation.png'),
    require('./031-job.png'),
    require('./010-lotus.png'),
  ],

  // badges
  pot: require('./pot.png'),
  stones: require('./stones.png'),
  hands: require('./hands.png'),
  hand1: require('./hand1.png'),
  meditationsHistory: require('./meditationsHistory.png'),

  consecutiveWeekPracticed: require('./flower.png'),
  firstCourseCompleted: require('./hands.png'),
  firstMeditation: require('./hands1.png'),
  categoryCompleted: require('./flower.png'),
  practiced50Min: require('./flower1.png'),
  practiced100Min: require('./cup.png'),
  practiced150Min: require('./candle.png'),
  practiced5Meditations: require('./insight.png'),
  practiced15Meditations: require('./lotus.png'),
  practiced25Meditations: require('./lotus1.png'),

  army: require('./army_bg.png'),
  sleep: require('./sleep_bg.png'),

  starterGif: require('./bgs/starter.gif'),

  advanceBGs: [
    require('./bgs/advance_1.png'),
    require('./bgs/advance_2.png'),
    require('./bgs/advance_3.png'),
    require('./bgs/advance_4.png'),
    require('./bgs/advance_5.png'),
  ],
  sleepBGs: [
    require('./bgs/sleep_thumb0.png'),
    require('./bgs/sleep_thumb1.png'),
    require('./bgs/sleep_thumb2.png'),
    require('./bgs/sleep_thumb3.png'),
    require('./bgs/sleep_thumb4.png'),
    require('./bgs/sleep_thumb5.png'),
  ],

  workBGs: [
    require('./bgs/work1.jpg'),
    require('./bgs/work2.jpg'),
    require('./bgs/work3.jpg'),
    require('./bgs/work4.jpg'),
    require('./bgs/work5.jpg'),
  ],

  stressBGs: [
    require('./bgs/stress_1.png'),
    require('./bgs/stress_2.png'),
    require('./bgs/stress_3.png'),
    require('./bgs/stress_4.png'),
    require('./bgs/stress_5.png'),
  ],

  armyBGs: [
    require('./bgs/army_1.png'),
    require('./bgs/army_2.png'),
    require('./bgs/army_3.png'),
    require('./bgs/army_4.png'),
    require('./bgs/army_5.png'),
    require('./bgs/army_6.png'),
  ],

  ontheroadBGs: [
    require('./bgs/way_1.png'),
    require('./bgs/way_2.png'),
    require('./bgs/way_3.png'),
    require('./bgs/way_4.png'),
  ],

  pocketmeditationBGs: [
    require('./bgs/daily1.png'),
    require('./bgs/daily2.png'),
    require('./bgs/daily3.png'),
    require('./bgs/daily4.png'),
    require('./bgs/daily5.png'),
    require('./bgs/daily6.png'),
  ],

  southBGs: [
    require('./bgs/start_1.png'),
    require('./bgs/start_2.png'),
    require('./bgs/start_3.png'),
    require('./bgs/start_4.png'),
    require('./bgs/start_5.png'),
    require('./bgs/start_6.png'),
  ],

  emergencyBGs: [
    require('./bgs/emergency_1.png'),
    require('./bgs/emergency_2.png'),
    require('./bgs/emergency_3.png'),
    require('./bgs/emergency_4.png'),
    require('./bgs/emergency_5.png'),
  ],

  visualBGs: [
    require('./bgs/visual1.png'),
    require('./bgs/visual2.png'),
    require('./bgs/visual3.png'),
    require('./bgs/visual4.png'),
  ],

  empowerBGs: [
    require('./bgs/empower1.png'),
    require('./bgs/empower2.png'),
    require('./bgs/empower3.png'),
    require('./bgs/empower4.png'),
    require('./bgs/empower5.png'),
    require('./bgs/empower6.png'),
  ],

  // workaround for android rtl issue with carousel
  // switch between first 2 items in courses coursel
  // notice this will NOT work when adding more courses !
  starthereBGs: Platform.select({
    android: [
      require('./bgs/start_2.png'),
      require('./bgs/starter.gif'),
      require('./bgs/start_3.png'),
      require('./bgs/start_4.png'),
      require('./bgs/start_5.png'),
      require('./bgs/start_6.png'),
    ],
    ios: [
      require('./bgs/starter.gif'),
      require('./bgs/start_2.png'),
      require('./bgs/start_3.png'),
      require('./bgs/start_4.png'),
      require('./bgs/start_5.png'),
      require('./bgs/start_6.png'),
    ],
  }),

  // new
  bg_1: require('./new/bg_1.png'),
  bg_2: require('./new/bg_2.png'),
  bg_3: require('./new/bg_3.png'),
  ellipse: require('./new/ellipse.png'),
  plant: require('./new/plant.png'),
  gender_bg: require('./new/gender_bg.png'),
  plants_bg: require('./new/plants_bg.png'),
  ellipse_pink: require('./new/ellipse_pink.png'),
  bg_purpose_1: require('./new/bg_purpose_1.png'),
  bg_purpose_2: require('./new/bg_purpose_2.png'),
  bg_purpose_3: require('./new/bg_purpose_3.png'),
  bg_purpose_4: require('./new/bg_purpose_4.png'),
  bg_purpose_5: require('./new/bg_purpose_5.png'),
  bg_purpose_6: require('./new/bg_purpose_6.png'),
  check: require('./new/check.png'),
  login_bg: require('./new/login_bg.png'),
  fb: require('./new/fb.png'),
  ap: require('./new/ap.png'),
  email: require('./new/email.png'),
  email2: require('./new/email2.png'),
  lock: require('./new/lock.png'),
  profile: require('./new/profile.png'),
  time: require('./new/time.png'),
  user: require('./new/user.png'),
  ic_car: require('./new/ic_car.png'),
  ic_stress: require('./new/ic_stress.png'),
  ic_mental: require('./new/ic_mental.png'),
  ic_army: require('./new/ic_army.png'),
  ic_exam: require('./new/ic_exam.png'),
  ic_sleep: require('./new/ic_sleep.png'),
  apple_logo: require('./new/apple-logo.png'),
  placeHolder: require('./placeHoder.jpeg'),
  back_arrow: require('./arrow.png'),
};

const image = name => images[name];

const categoryBGs = category => `${category?.toLowerCase()}BGs`;

const findCustomThumbnail = thumbnail => {
  const arr = thumbnail.split('.');
  if (arr.length > 1) {
    const [customCategory, customIndex] = arr;
    const customKey = categoryBGs(customCategory);
    if (images[customKey]) {
      const customImages = images[customKey];
      // eslint-disable-next-line max-depth
      if (customIndex < customImages.length) {
        return customImages[customIndex];
      }
    }
  }
  return null;
};

export const categoryImage = (category, index, thumbnail) => {
  const key = categoryBGs(category);
  try {
    if (!images[key]) {
      // custom category
      if (thumbnail) {
        // custom thumbnail
        const customThumbnail = findCustomThumbnail(thumbnail);
        // eslint-disable-next-line max-depth
        if (customThumbnail) {
          return customThumbnail;
        }
      }
      // default image - in case category was not found and there's no thumbnail
      return images.sleepBGs[0];
    }
    const categoryImages = images[key];
    const imageIdx = index % categoryImages?.length;
    return categoryImages[imageIdx];
  } catch (e) {
    return images.sleepBGs[0];
  }
};

export default image;
