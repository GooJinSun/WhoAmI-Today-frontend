import { MyProfile } from './api/user';
import { CheckInBase } from './checkIn';

export interface User {
  id: number;
  profile_image: string | null;
  profile_pic: string;
  url: string;
  username: string;
  bio: string;
  pronouns: string;
}

export interface UserProfile extends User {
  are_friends: boolean;
  received_friend_request_from: boolean;
  sent_friend_request_to: boolean;
  check_in: CheckInBase;
  mutuals: User[];
  is_favorite: boolean;
}

export const areFriends = (user: User | UserProfile): user is UserProfile =>
  (user as UserProfile).are_friends === true;

export const sentFriendRequest = (user: User | UserProfile) =>
  (user as UserProfile).sent_friend_request_to === true;

export const receivedFriendRequest = (user: User | UserProfile) =>
  (user as UserProfile).received_friend_request_from === true;

export const isMyProfile = (profile: MyProfile | UserProfile): profile is MyProfile =>
  (profile as UserProfile).are_friends === undefined;
