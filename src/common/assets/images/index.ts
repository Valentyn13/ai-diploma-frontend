const images: Record<string, any> = {
  pdf1: require('./pdf1.png'),
  pdf_find: require('./pdf-find.png'),

  home_back_clouds: require('./home_back_clouds.png'),
  home_birds: require('./home_birds.png'),
  home_night_stars: require('./home_night_stars.png'),
  home_cloud_2: require('./home_cloud_2.png'),
  home_cloud_3: require('./home_cloud_3.png'),
  home_cloud_1: require('./home_cloud_1.png'),
  home_cloud_1_1: require('./home_cloud_1_1.png'),
  home_sun: require('./home_sun.png'),
  home_moon: require('./home_moon.png'),

  home_card_cloud: require('./home_card_cloud.png'),
  lock_agreement: require('./lock_agreement.png'),
  stars_agreement: require('./stars_agreement.png'),
  notes_agreement: require('./notes_agreement.png'),
  questionnaire: require('./questionnaire.png'),

  michael_home: require('./michael_home.png'),
  home_stars: require('./home_stars.png'),
  michael_chat: require('./michael_chat.png'),

  male: require('./male.png'),
  female: require('./female.png'),

  bg_2: require('./new/bg_2.png'),
  bg_3: require('./new/bg_3.png'),
  michael: require('./new/michael.png'),
  plant: require('./new/plant.png'),
  gender_bg: require('./new/gender_bg.png'),
  plants_bg: require('./new/plants_bg.png'),
  lock: require('./new/lock.png'),
  email: require('./new/email.png'),
  email2: require('./new/email2.png'),
  profile: require('./new/profile.png'),
  user: require('./new/user.png'),
  logo: require('./logo.png'),
};

const image = name => images[name];


export default image;
