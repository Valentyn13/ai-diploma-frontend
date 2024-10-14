import { baseURL } from '@common/config';

export const getChallengeProgress = async () => {
  const response = await fetch(`${baseURL}challenge`);
  const data = await response.json();
  return data.progress as number;
};
