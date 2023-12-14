const videos = {
  sleep: require('./sleep.mp4'),
  stress: require('./stress.mp4'),
  army: require('./army.mp4'),
  ontheroad: require('./way.mp4'),
  pocketmeditation: require('./pocketmeditation.mp4'),
  south: require('./beterSelf.mp4'),
  starthere: require('./starter.mp4'),
  emergency: require('./emergency.mp4'),
  work: require('./work.mp4'),
  advance: require('./advance.mp4'),
  breath478: require('./breathe-4-7-8.mp4'),
  breathbox: require('./breathe-box.mp4'),
  circlebreating: require('./circle-breathing.mp4'),
  empower: require('./empower.mp4'),
  circleAd1: require('./circle-breath-ad1.mp4'),
  circleAd2: require('./circle-breath-ad2.mp4'),
  noseBreath: require('./nose-breath.mp4'),
};

const categoryVideo = (name, animation) => {
  if (animation && videos[animation]) {
    return videos[animation];
  }
  if (videos[name.toLowerCase()]) {
    return videos[name.toLowerCase()];
  }
  return videos[Object.keys(videos)[0]];
};

export default categoryVideo;
