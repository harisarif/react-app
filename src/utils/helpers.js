import { baseurl } from './axios';
import user1 from '../assets/images/user/1.jpg';

export const getProfileImageUrl = (user) => {
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  if (!user || !user.profile_image) return user1;
  
  return user.profile_image.startsWith('http') 
    ? user.profile_image 
    : `${baseurl}/images/${user.profile_image}`;
};

export const getBackgroundProfileImageUrl = (user) => {
  const baseurl = process.env.REACT_APP_BACKEND_BASE_URL;
  if (!user || !user.background_image) return user1;
  
  return user.background_image.startsWith('http') 
    ? user.background_image 
    : `${baseurl}/images/backgroundprofilepic/${user.background_image}`;
};
