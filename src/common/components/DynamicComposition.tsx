import { getRandomElements } from '@utils/rand';
import React, { PropsWithChildren } from 'react';

const DynamicComposition: React.FC<PropsWithChildren> = ({ children }) => {
  const shuffledChildren = React.Children.toArray(children);

  return <>{getRandomElements(shuffledChildren, shuffledChildren.length)}</>;
};

export default DynamicComposition;
