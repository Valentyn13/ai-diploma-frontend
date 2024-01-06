import { VIDEOS } from '@common/constants';

export const getVideoName = (name: string, animation: string) => {
  if (animation && VIDEOS[animation]) {
    return VIDEOS[animation];
  }
  if (VIDEOS[name.toLowerCase()]) {
    return VIDEOS[name.toLowerCase()];
  }
  return VIDEOS[Object.keys(VIDEOS)[0]];
};
