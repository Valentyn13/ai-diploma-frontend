export interface Meditation {
  categoryName: string;
  categoryTitle: string;
  count: number;
  createdAt: Date;
  duration: number;
  id: string;
  animation: string;
  isCategoryLocked: boolean;
  name: string;
  thumbnail: string;
  url: string;
  image?: string;
  description?: string;
}

export type EnrichedSession = Meditation & {
  // extend
  isNew?: boolean;
};
