type WithCreatedAt = { createdAt: Date | string };

export const isRecent = (session: WithCreatedAt, days = 7) => {
  const createdAt = new Date(session.createdAt);
  const now = new Date();
  const diff = now.getTime() - createdAt.getTime();
  const diffDays = diff / (1000 * 3600 * 24);
  return diffDays < days;
};
