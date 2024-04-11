type SessionType = 'meditation' | 'music';

export interface Session {
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
  type?: SessionType;
}

export type EnrichedSession = Session & {
  // extend
  isNew?: boolean;
};

export type PracticedMeditation = {
  id: string;
  timestamp: string;
};
