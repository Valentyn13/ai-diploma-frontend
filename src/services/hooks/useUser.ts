import { useSelector } from 'react-redux';
import { User } from 'types/User';

export const useUser = () => {
  const user = useSelector(state => state.userDetails) as User;

  return { user };
};
