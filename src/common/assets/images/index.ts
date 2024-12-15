import { BGS_ASSETS_URL } from '@common/constants';

const BGS: Record<string, string[]> = {
  advanceBGs: [
    'advance_1.png',
    'advance_2.png',
    'advance_3.png',
    'advance_4.png',
    'advance_5.png',
  ],
  sleepBGs: [
    'sleep_thumb0.png',
    'sleep_thumb1.png',
    'sleep_thumb2.png',
    'sleep_thumb3.png',
    'sleep_thumb4.png',
    'sleep_thumb5.png',
  ],
  workBGs: ['work1.jpg', 'work2.jpg', 'work3.jpg', 'work4.jpg', 'work5.jpg'],
  stressBGs: [
    'stress_1.png',
    'stress_2.png',
    'stress_3.png',
    'stress_4.png',
    'stress_5.png',
  ],
  armyBGs: [
    'army_1.png',
    'army_2.png',
    'army_3.png',
    'army_4.png',
    'army_5.png',
    'army_6.png',
  ],
  ontheroadBGs: ['way_1.png', 'way_2.png', 'way_3.png', 'way_4.png'],
  pocketmeditationBGs: [
    'daily1.png',
    'daily2.png',
    'daily3.png',
    'daily4.png',
    'daily5.png',
    'daily6.png',
  ],
  southBGs: [
    'start_1.png',
    'start_2.png',
    'start_3.png',
    'start_4.png',
    'start_5.png',
    'start_6.png',
  ],
  emergencyBGs: [
    'emergency_1.png',
    'emergency_2.png',
    'emergency_3.png',
    'emergency_4.png',
    'emergency_5.png',
  ],
  visualBGs: ['visual1.png', 'visual2.png', 'visual3.png', 'visual4.png'],
  empowerBGs: [
    'empower1.png',
    'empower2.png',
    'empower3.png',
    'empower4.png',
    'empower5.png',
    'empower6.png',
  ],
  starthereBGs: [
    'starter.gif',
    'start_2.png',
    'start_3.png',
    'start_4.png',
    'start_5.png',
    'start_6.png',
  ],
};

const images: Record<string, any> = {
  lock_agreement: require('./lock_agreement.png'),
  stars_agreement: require('./stars_agreement.png'),
  notes_agreement: require('./notes_agreement.png'),
  questionnaire: require('./questionnaire.png'),
  michael_2: require('./michael.png'),
  michael_chat: require('./michael_chat.png'),
  homeOn: require('./homeOn.png'),
  homeOff: require('./homeOff.png'),
  meditationsOn: require('./meditationsOn.png'),
  meditationsOff: require('./meditationsOff.png'),
  coursesOn: require('./coursesOn.png'),
  coursesOff: require('./coursesOff.png'),
  profileOn: require('./profileOn.png'),
  profileOff: require('./profileOff.png'),
  chatOn: require('./chatOn.png'),
  chatOff: require('./chatOff.png'),
  download: require('./download.png'),
  heart: require('./heart.png'),
  heartSelected: require('./heartSelected.png'),
  music: require('./music.png'),
  down: require('./down.png'),
  tempBg: require('./tempBg.png'),
  logo: require('./logo.png'),
  badge: require('./badge.png'),
  close: require('./close.png'),
  info: require('./info.png'),
  intro1: require('./intro1.png'),
  intro2: require('./intro2.png'),
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

  bg_2: require('./new/bg_2.png'),
  bg_3: require('./new/bg_3.png'),
  michael: require('./new/michael.png'),
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
};

const image = name => images[name];

const categoryBGs = category => `${category?.toLowerCase()}BGs`;

const findCustomThumbnail = thumbnail => {
  const arr = thumbnail.split('.');
  if (arr.length > 1) {
    const [customCategory, customIndex] = arr;
    const customKey = categoryBGs(customCategory);
    if (BGS[customKey]) {
      const customImages = BGS[customKey];

      if (customIndex < customImages.length) {
        return customImages[customIndex];
      }
    }
  }
  return null;
};

export const getCategoryImgName = (
  category: string,
  index: number,
  thumbnail?: string,
) => {
  const key = categoryBGs(category);
  try {
    if (!BGS[key]) {
      // custom category
      if (thumbnail) {
        // custom thumbnail
        const customThumbnail = findCustomThumbnail(thumbnail);

        if (customThumbnail) {
          return customThumbnail;
        }
      }
      // default image - in case category was not found and there's no thumbnail
      return BGS.sleepBGs[0];
    }
    const categoryImages = BGS[key];
    const imageIdx = index % categoryImages?.length;
    return categoryImages[imageIdx];
  } catch (e) {
    return BGS.sleepBGs[0];
  }
};

export const getCategoryImg = (
  category: string,
  index: number,
  thumbnail?: string,
) => `${BGS_ASSETS_URL}${getCategoryImgName(category, index, thumbnail)}`;

export default image;
