const videos = {
  sleep: 'sleep.mp4',
  stress: 'stress.mp4',
  army: 'army.mp4',
  ontheroad: 'way.mp4',
  pocketmeditation: 'pocketmeditation.mp4',
  south: 'beterSelf.mp4',
  starthere: 'starter.mp4',
  emergency: 'emergency.mp4',
  work: 'work.mp4',
  advance: 'advance.mp4',
  breath478: 'breathe-4-7-8.mp4',
  breathbox: 'breathe-box.mp4',
  circlebreating: 'circle-breathing.mp4',
  empower: 'empower.mp4',
  noseBreath: 'nose-breath.mp4',
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
