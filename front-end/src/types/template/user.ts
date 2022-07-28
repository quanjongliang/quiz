import { GenericCardProps } from 'types';
import { PostDataType, UserProfile, Profile } from 'types/template/user-profile';
import { PaginationMeta } from '../query/pagination';
import { UserKechoProfile } from '../user-kecho';

export interface FollowerCardProps {
    avatar: string;
    follow: number;
    location: string;
    name: string;
}

export interface FriendRequestCardProps extends Profile {
    mutual: number;
}

export interface FriendsCardProps {
    avatar: string;
    location: string;
    name: string;
}

export interface UserProfileCardProps extends UserProfile {
    profile: string;
}

export interface UserSimpleCardProps {
    avatar: string;
    name: string;
    status: string;
}

export interface UserStateProps {
    usersS1: UserProfile[];
    usersS2: UserProfileStyle2[];
    userKecho: UserKechoProfile[];
    userKechoMeta: PaginationMeta;
    currentUser: UserKechoProfile;
    followers: FollowerCardProps[];
    friendRequests: FriendRequestCardProps[];
    friends: FriendsCardProps[];
    gallery: GenericCardProps[];
    posts: PostDataType[];
    detailCards: UserProfile[];
    simpleCards: UserSimpleCardProps[];
    profileCards: UserProfileCardProps[];
    error: object | string | null;
}

export type UserProfileStyle2 = {
    image: string;
    name: string;
    designation: string;
    badgeStatus: string;
    subContent: string;
    email: string;
    phone: string;
    location: string;
    progressValue: string;
};
