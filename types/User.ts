export interface User {
  id: string;
  fbId: string;
  email: string;
  name: string;
  accessToken: string;
  refreshToken: string;
  sex: 'M' | 'F';
  loader: boolean;
  updateloader: boolean;
  isNotification: boolean;
  notificationTime: string | null;
  hasPassedStarterChat: boolean;
}
