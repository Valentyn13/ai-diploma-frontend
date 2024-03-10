import { ABSTRACT_VIDEOS, VIDEOS } from '@common/constants';

export const getVideoName = (name: string, animation: string) => {
  if (animation && VIDEOS[animation]) {
    return VIDEOS[animation];
  } else if (!!name && VIDEOS[name.toLowerCase()]) {
    return VIDEOS[name.toLowerCase()];
  }
  return ABSTRACT_VIDEOS[
    Math.floor(Math.random() * Object.keys(ABSTRACT_VIDEOS).length)
  ];
};
