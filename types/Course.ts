type Meditation = {
  animation?: any;
  categoryName: string;
  categoryTitle: string;
  count: number;
  createdAt: string;
  duration: number;
  id: string;
  isCategoryLocked: boolean;
  name: string;
  premium?: any;
  thumbnail?: any;
  url: string;
};

export type Course = {
  id: string;
  info: string;
  isCategoryLocked: boolean;
  meditations: Meditation[];
  name: string;
  subTitle: string;
  title: string;
};
